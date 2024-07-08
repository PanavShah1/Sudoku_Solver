import React from "react";
import Context from "./Context";
import SudokuCell from "./SudokuCell";

const Sudoku = () => {
    const {sudokuMatrix, setSudokuMatrix} = React.useContext(Context)
    const [sudoku, setSudoku] = React.useState(null)
    const [displaySudoku, setDisplaySudoku] = React.useState(null)

    React.useEffect(() => {
        setSudoku(sudokuMatrix)
        let cells = []
        for (let i = 0; i < 9; i++) {
            cells.push([])
            for (let j = 0; j < 9; j++) {
                cells[i].push(<SudokuCell key={10*i+j} row={i} col={j} />)
            }
        }

        setDisplaySudoku(cells)
    }, [sudokuMatrix])

    React.useEffect(() => {
        console.log("sudoku", sudoku)
        console.log(displaySudoku)
    }, [displaySudoku])

    return (
        <div>
            {displaySudoku && displaySudoku.map((row, rowIndex) => (
                <div key={rowIndex} className="sudoku-row">
                    {row.map((cell, colIndex) => (
                        <React.Fragment key={colIndex}>
                            {cell}
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Sudoku