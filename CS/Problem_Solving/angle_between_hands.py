# Problem
# Calculate the angle between the hands of a manual
# Watch given an hour value (1-12) and minute (0-59)

def angle_between_hands(hour : int, minute: int) -> float:
    hour_hand_position = hour * 30 + (0.5 * minute)
    
    if hour_hand_position > 180:
        hour_hand_position = hour_hand_position - 180

    minute_hand_angle = minute * 6

    if minute_hand_angle > 180:
        minute_hand_angle = minute_hand_angle - 180

    angle = abs(hour_hand_position - minute_hand_angle)

    return min(angle, 360 - angle)


assert angle_between_hands(3, 0) == 90
assert angle_between_hands(6, 0) == 180
assert angle_between_hands(9, 0) == 90
assert angle_between_hands(0, 0) == 0
assert angle_between_hands(3, 30) == 75