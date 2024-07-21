import React from "react";

const SolvedSudokuCell = ({ row, col, value, isThickBottom, isThickRight }) => {

    return (
        <div
            className={`sudoku-cell ${isThickBottom ? "thick-bottom-border" : ""} ${isThickRight ? "thick-right-border" : ""}`}
        >
            <p className="sudoku-input-solved">{value}</p>
        </div>
    );
};

export default SolvedSudokuCell;
