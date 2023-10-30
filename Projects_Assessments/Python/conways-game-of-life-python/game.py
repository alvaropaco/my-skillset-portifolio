class Game:
    """Conway's Game-of-life implementation
    Usage::
        >>> import game
        >>> game = Game(20, 20, [(2,1), (0, 1), (0, 2)])
        >>> print(game)
        >>> game.next_generation()
        >>> print(game)

    :param width: number of columns
    :param height: number of rows
    :param setup: initial cells population
    """

    def __init__(self, width, height, setup=[]):
        self.__ecosystem = Ecosystem(width, height, setup)

    def __str__(self):
        return str(self.__ecosystem)

    def next_generation(self):
        """Advance one generation"""
        self.__ecosystem.next_generation()


class Ecosystem:
    """Ecosystem
    Usage::
        >>> ecosystem = Ecosystem(20, 20, [(2,1), (0, 1), (0, 2)])
        >>> ecosystem.next_generation()

    :param width: number of columns
    :param height: number of rows
    :param life: initial cells population
    """
    def __init__(self, width, height, life):
        self.width, self.height = width, height
        self.__ecosystem = self.__setup(width, height, life)

    def __str__(self):
        return_str = ""
        for row in self.__ecosystem:
            ecosystem_row = "\n"
            for cell in row:
                ecosystem_row += " " + str(cell)
            return_str += ecosystem_row
        return return_str

    @staticmethod
    def __setup(width, height, cells):
        ecosystem = []
        for row in range(height):
            grid_row = []
            for column in range(width):
                if (row, column) in cells:
                    grid_row.append(Cell(row, column, True))
                else:
                    grid_row.append(Cell(row, column, False))
            ecosystem.append(grid_row)
        return ecosystem

    def __add_cell_to_ecosystem(self, cell):
        self.__ecosystem[cell.x][cell.y].setLife(True)

    def __remove_cell_from_ecosystem(self, cell):
        self.__ecosystem[cell.x][cell.y].setLife(False)

    def __kill_cells(self, cells):
        for cell in cells:
            self.__remove_cell_from_ecosystem(cell)

    def __reviveCells(self, cells):
        for cell in cells:
            self.__add_cell_to_ecosystem(cell)

    def ___fillLife(self):
        """Advance the board one step and return it."""
        new_board = []
        die = []
        live = []
        for row in self.__ecosystem:
            board_row = []
            for cell in row:
                cell_live_neighbors = cell.get_neighbors(
                    ecosystem=self.__ecosystem,
                    width=self.width, height=self.height)
                # Any live cell with less than two
                # neighbors die
                if cell.live:
                    if 2 > len(cell_live_neighbors) or len(cell_live_neighbors) > 3:
                        die.append(cell)
                if not cell.live and len(cell_live_neighbors) == 3:
                    live.append(cell)
                board_row.append(cell)
            new_board.append(board_row)
        self.__kill_cells(die)
        self.__reviveCells(live)
        self.__ecosystem = new_board

    def next_generation(self):
        """Advance one generation"""
        self.___fillLife()


class Cell:
    """Cell

    A Cell representation. This must return `*` if cell is alive or ` `
    if she's dead.

    :param x: horizontal position
    :param y: vertical position
    :param live:False: if cell is alive or not
    """

    def __init__(self, x, y, live=False):
        self.x = x
        self.y = y
        self.live = live

    def __str__(self):
        return '*' if self.live else ' '

    def get_point(self):
        return self.x, self.y

    def __neighbor_position(self, i, j, width, height):
        width, height = width - 1, height - 1

        point_x = self.x + i
        if point_x < 0:
            point_x = width
        elif point_x > width:
            point_x = 0

        point_y = self.y + j
        if point_y < 0:
            point_y = height
        elif point_y > height:
            point_y = 0

        return [point_x, point_y]

    def get_neighbors(self, ecosystem, width, height, distance=1):
        """Return the alive neighbors of cell."""
        r = range(0 - distance, 1 + distance)
        neighbors = []
        for i in r:
            for j in r:
                if not i == j == 0:
                    point_x, point_y = self.__neighbor_position(i, j, width, height)
                    neighbor = ecosystem[point_x][point_y]
                    if neighbor.live is True:
                        neighbors.append(neighbor)
        return neighbors

    def setLife(self, live):
        self.live = live
