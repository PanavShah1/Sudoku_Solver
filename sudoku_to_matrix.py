import os
import numpy as np
from predict import predict_number, check_empty, remove_border
from tqdm.auto import tqdm
import json
from paths import homepath

sudoku_matrix = [[0 for j in range(9)] for i in range(9)]
prob_matrix = [[0 for j in range(9)] for i in range(9)]

for i in tqdm(range(9)):
    for j in tqdm(range(9)):
        cell_num = f"{i}{j}"
        if check_empty(cell_num):
            sudoku_matrix[i][j] = 0
        else:
            n, prob = predict_number(cell_num)
            n = int(n)
            prob = float(prob)
            sudoku_matrix[i][j] = n
            prob_matrix[i][j] = prob

sudoku_dict = {"sudoku_matrix": sudoku_matrix, "prob_matrix": prob_matrix}
with open(os.path.join(homepath, 'sudoku_matrix.txt'), 'w') as f:
    f.write(json.dumps(sudoku_dict))


for i in range(9):
    for j in range(9):
        print(sudoku_matrix[i][j], end=' ')
    print()

print()

for i in range(9):
    for j in range(9):
        print(prob_matrix[i][j], end=' ')
    print()
            