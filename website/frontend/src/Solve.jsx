import React, { useContext } from "react";
import Context from "./Context";
import SolvedSudoku from "./SolvedSudoku";

const Solve = () => {
    const { sudokuMatrix, setSudokuMatrix } = useContext(Context);
    const [solvedSudoku, setSolvedSudoku] = React.useState({solved: false, solution: []});
    const [called, setCalled] = React.useState(false);

    const solveSudoku = async () => {
        try {
            const requestBody = {
                sudoku_board: sudokuMatrix["sudoku_matrix"]
            };

            console.log("Sending:", JSON.stringify(requestBody));
            const response = await fetch("http://localhost:8000/solve-sudoku", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody), // Send as native JSON object
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            setSolvedSudoku(result);
            console.log("Result:", result);

        } catch (error) {
            console.error("Error solving Sudoku:", error);
        }
        setCalled(true)
    };

    React.useEffect(() => {
        console.log("Solved Sudoku Matrix:", solvedSudoku);
    }, [solvedSudoku]);

    React.useEffect(() => {
        solveSudoku()
    }, [])

    return (
        <div className="main">
            {solvedSudoku.solved || <button className="solve-button" onClick={solveSudoku}>Solve</button>}
            {solvedSudoku.solved ? <SolvedSudoku solvedSudoku={solvedSudoku.solution} /> : called ? <div>Invalid Sudoku. Please manually check the numbers</div> : <></>}
        </div>
    );
};

export default Solve;
