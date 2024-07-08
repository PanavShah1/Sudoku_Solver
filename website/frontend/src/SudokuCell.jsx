import React from "react";
import Context from "./Context";

const SudokuCell = ({row, col}) => {
    const {sudokuMatrix, setSudokuMatrix} = React.useContext(Context);

    // Check if sudokuMatrix or its properties are undefined before accessing them
    if (!sudokuMatrix || !sudokuMatrix["sudoku_matrix"] || !sudokuMatrix["prob_matrix"]) {
        console.error("Sudoku matrix or its properties are undefined", !sudokuMatrix, !sudokuMatrix["sudoku_matrix"], !sudokuMatrix["prob_matrix"]);
        return null; // Or handle loading state or error state as appropriate
    }

    return (
        <div className="sudoku-cell">
            <h2>{sudokuMatrix["sudoku_matrix"][row][col]}</h2>
            <h3>{Math.round(sudokuMatrix["prob_matrix"][row][col] * 10000) / 100}</h3>
        </div>
    );
};

export default SudokuCell;
