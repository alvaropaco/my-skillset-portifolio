# Find the smallest subsequence of a list
# where the sum is equal to a defined integer
def sub_sequence_sum(lst, sumNumber):
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


# print(sub_sequence_sum([4, 3, 20, 5, 9, 6, 2, 8], 34))
