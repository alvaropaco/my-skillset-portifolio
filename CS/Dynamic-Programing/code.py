import unittest

# Find the smallest subsequence of a list
# where the sum is equal to a defined integer

def subSequenceSum(lst, sumNumber):
    result = []
    endIndex = len(lst)
    while endIndex > 0:
        for index, value in enumerate(lst):
            subSeq = lst[index:endIndex]
            total = sum(lst[index:endIndex])
            if total == sumNumber:
                if len(result) == 0 or len(result) > len(subSeq):
                    result = subSeq
        endIndex -= 1
            
    return result

print(subSequenceSum([4,3,20,5,9,6,2,8], 34))

class TestSubSequenceSum(unittest.TestCase):

    def test_example_case(self):
        self.assertEqual(subSequenceSum([4,3,20,5,9,6,2,8], 34), [20, 5, 9])

    def test_empty_list(self):
        self.assertEqual(subSequenceSum([], 34), [])

    def test_no_matching_subsequence(self):
        self.assertEqual(subSequenceSum([1, 2, 3, 4, 5], 100), [])

    def test_multiple_matching_subsequences(self):
        # [2,3,4] and [4,5] both sum up to 9 but [4,5] is the shortest
        self.assertEqual(subSequenceSum([2, 3, 4, 5], 9), [4,5])

    def test_full_list_as_subsequence(self):
        self.assertEqual(subSequenceSum([5, 5, 5, 5, 5], 25), [5, 5, 5, 5, 5])

    def test_multiple_equal_length_subsequences(self):
        # [2, 3, 4] and [4, 5] both sum up to 9 but the function should return the smallest encountered
        self.assertEqual(subSequenceSum([2, 3, 4, 5], 9), [4, 5])

    def test_single_element_subsequence(self):
        self.assertEqual(subSequenceSum([1, 2, 3, 4, 5], 3), [3])

if __name__ == '__main__':
    unittest.main()
