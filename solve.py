import os
import numpy as np
import requests
import json
from sudoku import Sudoku

with (open('sudoku_matrix.txt', 'r')) as f:
    sudoku_matrix_string = f.read()

sudoku_matrix_dict = json.loads(sudoku_matrix_string)
sudoku_matrix = sudoku_matrix_dict['sudoku_matrix']


board = [[9, 1, 3, 4, 2, 7, 5, 8, 6], [6, 8, 7, 9, 1, 5, 3, 2, 4], [2, 5, 4, 6, 8, 3, 1, 7, 9], [4, 7, 9, 1, 3, 2, 6, 5, 8], [1, 6, 2, 5, 9, 8, 7, 4, 3], [5, 3, 8, 7, 6, 4, 2, 9, 1], [3, 4, 5, 8, 7, 1, 9, 6, 2], [7, 2, 6, 3, 4, 9, 8, 1, 5], [8, 9, 1, 2, 5, 6, 4, 3, 7]]
sudoku = Sudoku(3, 3, board=board)
print(sudoku.solve())
