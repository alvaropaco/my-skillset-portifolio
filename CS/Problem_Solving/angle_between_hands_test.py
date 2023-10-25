import unittest
from CS.Problem_Solving.angle_between_hands import angle_between_hands

class Testsub_angle_between_hands(unittest.TestCase):
    def test_angle_between_hands(self):
        assert angle_between_hands(3, 0) == 90
        assert angle_between_hands(6, 0) == 180
        assert angle_between_hands(9, 0) == 90
        assert angle_between_hands(0, 0) == 0
        assert angle_between_hands(3, 30) == 75


if __name__ == "__main__":
    unittest.main()