import React from "react";
import "./style.css"
import ImageInput from "./ImageInput";
import Context from "./Context";
import Sudoku from "./Sudoku";

const App = () => {
    const [sudokuMatrix, setSudokuMatrix] = React.useState(null)
    return (
        <div>
            <Context.Provider value={{sudokuMatrix, setSudokuMatrix}}>
                <ImageInput />
                <Sudoku />
            </Context.Provider>
        </div>
    )
}

export default App