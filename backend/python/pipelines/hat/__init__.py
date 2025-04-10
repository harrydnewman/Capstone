from hat_or_not import get_hat_or_not
from hat_type import get_hat_type

def get_hat(img_path):
    hat_or_not = get_hat_or_not(img_path)
    if hat_or_not:
        hat_type = get_hat_type(img_path)
        print(hat_type)
        return(hat_type)
    else: 
        print("No Hat")
        return "No Hat"


get_hat("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/hat1.webp")
get_hat("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/hat2.webp")
get_hat("/Users/harrisonnewman/Documents/NYU/Spring2025/Capstone/Code/MainProject/backend/python/test/bald.jpg")