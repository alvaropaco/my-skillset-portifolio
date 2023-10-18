import unittest
from CS.Dynamic_Programing.subsequence_sum import sub_sequence_sum

class Testsub_sequence_sum(unittest.TestCase):
    def test_example_case(self):
        self.assertEqual(sub_sequence_sum([4, 3, 20, 5, 9, 6, 2, 8], 34), [20, 5, 9])

    def test_empty_list(self):
        self.assertEqual(sub_sequence_sum([], 34), [])

    def test_no_matching_subsequence(self):
        self.assertEqual(sub_sequence_sum([1, 2, 3, 4, 5], 100), [])

    def test_multiple_matching_subsequences(self):
        # [2,3,4] and [4,5] both sum up to 9 but [4,5] is the shortest
        self.assertEqual(sub_sequence_sum([2, 3, 4, 5], 9), [4, 5])

    def test_full_list_as_subsequence(self):
        self.assertEqual(sub_sequence_sum([5, 5, 5, 5, 5], 25), [5, 5, 5, 5, 5])

    def test_multiple_equal_length_subsequences(self):
        # [2, 3, 4] and [4, 5] both sum up to 9 but the function
        # should return the smallest encountered
        self.assertEqual(sub_sequence_sum([2, 3, 4, 5], 9), [4, 5])

    def test_single_element_subsequence(self):
        self.assertEqual(sub_sequence_sum([1, 2, 3, 4, 5], 3), [3])


if __name__ == "__main__":
    unittest.main()