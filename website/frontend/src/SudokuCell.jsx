import React, { useState, useContext } from "react";
import Context from "./Context"; // Ensure you have the correct path to your Context file

const SudokuCell = ({ row, col, value, prob, isThickBottom, isThickRight }) => {
    const { sudokuMatrix, setSudokuMatrix } = useContext(Context);
    const [cellValue, setCellValue] = useState(value);

    // Color coding based on probability
    let color_prob = "";
    if (prob === 0 || prob > 0.99) {
        color_prob = "green";
    } else if (prob > 0.9) {
        color_prob = "blue";
    } else if (prob > 0.7) {
        color_prob = "orange";
    } else {
        color_prob = "red";
    }

    // Handle changes in the cell value
    const handleChange = (event) => {
        const newValue = event.target.value;

        // Update local cell value state
        setCellValue(newValue);

        // Update sudokuMatrix in context
        setSudokuMatrix(prevMatrix => {
            const newMatrix = [...prevMatrix.sudoku_matrix];
            newMatrix[row][col] = parseInt(newValue) || 0; // Ensure value is a number
            return { ...prevMatrix, sudoku_matrix: newMatrix };
        });
    };

    return (
        <div
            className={`sudoku-cell ${isThickBottom ? "thick-bottom-border" : ""} ${isThickRight ? "thick-right-border" : ""}`}
        >
            <textarea
                className="sudoku-input"
                value={cellValue}
                onChange={handleChange} // Update value on change
                placeholder={value}
                rows={1}
                cols={1}
            />
            <p className="sudoku-prob" style={{ color: color_prob }}>
                {Math.round(prob * 1000) / 10}
            </p>
        </div>
    );
};

export default SudokuCell;
