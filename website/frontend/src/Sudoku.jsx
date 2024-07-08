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
            for (let j = 0; j < 9; j++) {
                cells.push(<SudokuCell row={i} col={j} />)
            }
        }

        setDisplaySudoku(cells)
    }, [sudokuMatrix])

    return (
        <div>
            {sudoku}
            {/* {displaySudoku} */}
        </div>
    )
}

export default Sudoku