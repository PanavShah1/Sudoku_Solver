import React from "react";
import Context from "./Context";

const SudokuCell = ({row, col}) => {
    const {sudokuMatrix, setSudokuMatrix} = React.useContext(Context)

    return (
        <div className="sudoku-cell">
            <h2>{sudokuMatrix["sudoku_matrix"][row][col]}</h2>
            <h3>{sudokuMatrix["prob_matrix"][row][col]}</h3>
        </div>
    )
}

export default SudokuCell