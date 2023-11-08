# Task

Given a 2-dimensional grid of characters, and a dictionary, find all words in the grid that also appear in the dictionary. A word can be formed by traversing the grid by going either left, right, top, or down, but NOT diagonal. Also, a single grid position can not be used more than once in a word.
For instance, in the following 3x3 grid, with a dictionary of [ CAT, COPY, ASK, SOS, PUT ]
C A T
O S K
P Y U

return [ CAT, COPY, ASK ]

The first 3 words can be found in the grid, but not SOS, since one cannot use S twice.
