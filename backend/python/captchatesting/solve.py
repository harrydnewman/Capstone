# https://github.com/2captcha/2captcha-python

import sys
import os
from twocaptcha import TwoCaptcha
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

api_key = os.getenv('TWOCAPTCHAKEY')



solver = TwoCaptcha(api_key)

try:
    result = solver.turnstile(
        sitekey='0x4AAAAAAA6kcejno0Qiz9et',
        url='https://pimeyes.com/en',
    )

except Exception as e:
    sys.exit(e)

else:
    sys.exit('solved: ' + str(result))