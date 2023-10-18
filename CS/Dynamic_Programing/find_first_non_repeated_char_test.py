import unittest
from CS.Dynamic_Programing.find_first_non_repeated_char import first_non_repeated

class Testsub_sequence_sum(unittest.TestCase):
    def test_first_non_repeated(self):
        # Test with examples given
        assert first_non_repeated("teststring") == "e"
        assert first_non_repeated("abcdbca") == "d"
        
        # Additional test cases
        assert first_non_repeated("aabbcc") == None  # No non-repeated character
        assert first_non_repeated("abcfdeedcba") == "f"  # "f" is the first non-repeated character
        assert first_non_repeated("") == None  # Empty string
        assert first_non_repeated("a") == "a"  # Single character string
        assert first_non_repeated("aabbccef") == "e"  # Multiple characters, "e" is first non-repeated

if __name__ == "__main__":
    unittest.main()
