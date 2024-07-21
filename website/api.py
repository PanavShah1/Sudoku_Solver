from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from run_program import run_program
import json
from sudoku import Sudoku
from pydantic import BaseModel
from typing import List



app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = 'uploads/'
homepath = "/Users/panavshah/Desktop/Desktop - Panav’s MacBook Pro/coding_stuff/projects/sudoku_image_solver/"


@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_FOLDER, "sudoku_input.png")
    with open(file_location, "wb") as file_object:
        file_object.write(file.file.read())
    run_program()
    with open(os.path.join(homepath, 'sudoku_matrix.txt'), 'r') as f:
        sudoku_matrix = f.read()
    return json.dumps(sudoku_matrix)


class SudokuBoard(BaseModel):
    sudoku_board: List[List[int]]

@app.post("/solve-sudoku/")
async def solve_sudoku(sudoku_board: SudokuBoard):
    board = sudoku_board.sudoku_board
    print("Received board:", board)
    sudoku = Sudoku(3, 3, board=board)
    solution = sudoku.solve()
    print("Solved board:", solution.board)
    solution_board = solution.board
    solved = True
    if solution_board == [[None for i in range(9)] for j in range(9)]:
        print("no solution")
        solved = False
    return {"solved": solved, "solution": solution.board}
