import React from "react";
import Context from "./Context";
import Sudoku from "./Sudoku";

const ImageInput = () => {
    const [image, setImage] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const { sudokuMatrix, setSudokuMatrix } = React.useContext(Context);

    function handleChangeImage(event) {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            console.log(imageURL);
            console.log(file);
            setImage(imageURL);
            setFile(file);
        }
    }

    async function handleUpload() {
        if (file) {
            console.log(image);
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch("http://localhost:8000/upload-image", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setSudokuMatrix(JSON.parse(JSON.parse(result)));

                console.log("result", JSON.parse(result));
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    }

    React.useEffect(() => {
        console.log("printing values")
        console.log(sudokuMatrix['0']); 
        console.log(sudokuMatrix["sudoku_matrix"]);
        console.log(Object.keys(sudokuMatrix));
    }, [sudokuMatrix]);



    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChangeImage} />
            <br></br>
            {image && <img className="sudoku-input-image" src={image} alt="Preview" />}
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default ImageInput;
