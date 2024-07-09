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
                        key={10 * rowIndex + colIndex}
                        row={rowIndex}
                        col={colIndex}
                        value={value}
                    />
                ))
            );
            setDisplaySudoku(cells);
        }
    }, [sudokuMatrix]);

    return (
        <div>
            {displaySudoku.length > 0 &&
                displaySudoku.map((row, rowIndex) => (
                    <div key={rowIndex} className="sudoku-row">
                        {row}
                    </div>
                ))}
        </div>
    );
};

export default Sudoku;
