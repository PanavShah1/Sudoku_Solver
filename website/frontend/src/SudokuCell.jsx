import React, { useContext, useState } from "react";
import Context from "./Context";

const SudokuCell = ({ row, col }) => {
    const { sudokuMatrix, setSudokuMatrix } = useContext(Context);
    const [edit, setEdit] = useState(false);
    const [newValue, setNewValue] = useState("");

    // const handleClick = () => {
    //     setEdit(!edit);
    //     setNewValue(sudokuMatrix["sudoku_matrix"][row][col]);

    // }

    const handleChange = (event) => {
        setNewValue(event.target.value);
        const updatedMatrix = sudokuMatrix
    
        // Update the specific cell value
        updatedMatrix.sudoku_matrix[row][col] = parseInt(newValue);
    
        // Update the state with the new matrix
        setSudokuMatrix(updatedMatrix);
    }
    
    

    React.useEffect(() => {
        

        console.log("printing values")
        console.log(sudokuMatrix["sudoku_matrix"]);
        console.log(Object.keys(sudokuMatrix));
        console.log("edit", edit)
        console.log("newValue", newValue)
        
    }, [newValue]);

    return (
        <div className="sudoku-cell">

            <textarea
                className="sudoku-input"
                value={newValue}
                onChange={handleChange}
                placeholder={sudokuMatrix["sudoku_matrix"][row][col]}
            />
            {/* <h2>{sudokuMatrix["sudoku_matrix"][row][col]}</h2> */}
            <p>{Math.round(sudokuMatrix["prob_matrix"][row][col]*1000)/10}</p>
            {/* <button onClick={handleClick}>Edit</button> */}

            
        </div>
    );
};

export default SudokuCell;
