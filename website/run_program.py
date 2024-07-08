import subprocess
import os

def run_program():
    homepath = "/Users/panavshah/Desktop/Desktop - Panav’s MacBook Pro/coding_stuff/projects/sudoku_image_solver/"
    subprocess.run(["python3", os.path.join(homepath, "process_image.py")])
    subprocess.run(["python3", os.path.join(homepath, "sudoku_to_matrix.py")])

    print("done running run_program()")

    