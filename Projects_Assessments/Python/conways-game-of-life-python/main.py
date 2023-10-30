from game import Game

ECOSYSTEM = {
    (2, 2),
    (1, 2),
    (0, 2),
    (2, 1),
}


def main():
    game = Game(20, 20, ECOSYSTEM)
    print(game)
    game.next_generation()
    print(game)

if __name__ == '__main__':
    main()