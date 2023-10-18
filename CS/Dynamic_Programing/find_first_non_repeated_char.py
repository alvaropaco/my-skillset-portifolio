# Problem: Implement a function that finds the 
# first non-repeated character in a given string.

def first_non_repeated(s):
    char_count = {}
    
    # Populate char_count with frequency of each character in string s
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
        
    # Iterate over the string to find the first non-repeated character
    for char in s:
        if char_count[char] == 1:
            return char
    return None

# print(first_non_repeated("teststring"))  # Outputs: "e"
# print(first_non_repeated("abcdbca"))     # Outputs: "d"
