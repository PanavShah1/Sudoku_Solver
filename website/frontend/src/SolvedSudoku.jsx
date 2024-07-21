import React from "react";
import SolvedSudokuCell from "./SolvedSudokuCell";

const SolvedSudoku = ({ solvedSudoku, probMatrix }) => {
    if (!solvedSudoku || solvedSudoku.length === 0) {
        return <div>No Sudoku to display</div>;
    }

    return (
        <div className="sudoku-container">
            {solvedSudoku.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((value, colIndex) => (
                        <SolvedSudokuCell
                            key={rowIndex * 9 + colIndex} 
                            row={rowIndex}
                            col={colIndex}
                            value={value}
                            isThickBottom={rowIndex === 2 || rowIndex === 5}
                            isThickRight={colIndex === 2 || colIndex === 5}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default SolvedSudoku;
