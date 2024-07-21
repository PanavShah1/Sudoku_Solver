import React, { useEffect, useState, useContext } from "react";
import Context from "./Context";
import SudokuCell from "./SudokuCell";

const Sudoku = () => {
    const { sudokuMatrix } = useContext(Context);
    const [displaySudoku, setDisplaySudoku] = useState([]);

    useEffect(() => {
        if (sudokuMatrix) {
            const cells = sudokuMatrix.sudoku_matrix.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <SudokuCell
                        key={rowIndex * 9 + colIndex} // Ensure unique key
                        row={rowIndex}
                        col={colIndex}
                        value={value} // Pass value directly
                        prob={sudokuMatrix.prob_matrix[rowIndex][colIndex]} // Pass probability directly
                        isThickBottom={rowIndex === 2 || rowIndex === 5}
                        isThickRight={colIndex === 2 || colIndex === 5}
                    />
                ))
            );
            setDisplaySudoku(cells);
        }
    }, [sudokuMatrix]);

    return (
        <div className="main">
            <div className="sudoku-container">
                {displaySudoku.length > 0 &&
                    displaySudoku.map((row, rowIndex) => (
                        <div key={rowIndex} className="sudoku-row">
                            {row}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Sudoku;
