from hat_or_not import get_hat_or_not
from hat_type import get_hat_type
import asyncio 

async def get_hat(img_path):
    hat_or_not = await get_hat_or_not(img_path)
    if hat_or_not:
        hat_type = await get_hat_type(img_path)
        print(hat_type)
        return(hat_type)
    else: 
        print("No Hat")
        return "No Hat"

