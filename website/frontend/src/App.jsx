import React from "react";
import "./style.css";
import ImageInput from "./ImageInput";
import Context from "./Context";
import Sudoku from "./Sudoku";
import Solve from "./Solve";

// Define the empty Sudoku matrix
const emptySudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Utility function to check if two 2D arrays are equal
const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr1[i].every((val, j) => val === arr2[i][j])) return false;
    }
    return true;
};

const App = () => {
    const [sudokuMatrix, setSudokuMatrix] = React.useState({
        sudoku_matrix: emptySudoku, // Initialize with empty Sudoku
        prob_matrix: emptySudoku, // Initialize with empty probability matrix
    });

    return (
        <div>
            <Context.Provider value={{ sudokuMatrix, setSudokuMatrix }}>
                <ImageInput />
                {!arraysAreEqual(sudokuMatrix.sudoku_matrix, emptySudoku) && <Sudoku />}
                {!arraysAreEqual(sudokuMatrix.sudoku_matrix, emptySudoku) && <Solve />}
            </Context.Provider>
        </div>
    );
};

export default App;
