from dotenv import load_dotenv
import os, asyncio, logging, time, requests
from huggingface_hub import InferenceClient

try:
    from huggingface_hub.utils import HfHubHTTPError
except ImportError:                    # fall back to plain Requests error
    from requests import HTTPError as HfHubHTTPError

load_dotenv()
client = InferenceClient(
    provider="hf-inference",
    api_key=os.getenv("INFERENCE_TOKEN"),
)

def _classify_with_retry(img_path, max_retries: int = 3, base_delay: float = 1.0):
    """
    Try the HF endpoint `max_retries` times.
    Exponential back-off: 1 s, 2 s, 4 s … then give up.
    On final failure we just return "unknown" so upstream code
    doesn’t explode and your websocket keeps humming.
    """
    for attempt in range(1, max_retries + 1):
        try:
            output = client.image_classification(
                img_path,
                model="dima806/hair_type_image_detection"
            )
            highest = max(output, key=lambda x: x.score)
            logging.info(f"[hair_type] ✅ success on attempt {attempt}: "
                         f"{highest.label} ({highest.score:.3f})")
            return highest.label          # you can swap in a dict if you prefer
        except (HfHubHTTPError, requests.HTTPError) as e:
            # Any non-HTTP rando exceptions will bubble up to
            # run_function_and_notify like they already do.
            if attempt == max_retries:
                logging.error(f"[hair_type] ❌ giving up after {max_retries} tries: {e}")
                return 
            delay = base_delay * 2 ** (attempt - 1)
            logging.warning(
                f"[hair_type] attempt {attempt}/{max_retries} failed ({e}); "
                f"retrying in {delay:.1f}s"
            )
            time.sleep(delay)

async def get_hair_type(img_path):
    return await asyncio.to_thread(_classify_with_retry, img_path)
