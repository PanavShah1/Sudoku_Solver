import React, { useEffect, useState, useContext } from "react";
import Context from "./Context";

const ImageInput = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [tempMatrix, setTempMatrix] = useState(null); // Temporary state for matrix data
    const { sudokuMatrix, setSudokuMatrix } = useContext(Context);

    function handleChangeImage(event) {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setFile(file);
        }
    }

    function handleUpload() {
        if (file) {
            // Simulate processing the image and getting the matrix data
            console.log("Processing image...");

            // Example data you might have obtained from processing the image
            const exampleMatrixData = {
                sudoku_matrix: [
                    [9, 7, 3, 0, 0, 0, 5, 0, 0],
                    [6, 0, 7, 0, 0, 0, 0, 2, 4],
                    [0, 5, 0, 0, 8, 0, 0, 7, 0],
                    [0, 7, 9, 0, 0, 0, 0, 0, 0],
                    [0, 0, 2, 0, 9, 0, 0, 4, 3],
                    [0, 0, 0, 0, 0, 4, 0, 9, 0],
                    [0, 4, 0, 0, 0, 1, 9, 0, 0],
                    [7, 0, 6, 0, 0, 9, 0, 0, 5],
                    [0, 0, 1, 0, 0, 6, 4, 0, 7]
                ],
                prob_matrix: [
                    [0.912, 0.958, 1.000, 0, 0, 0, 1.000, 0, 0],
                    [1.000, 0, 1.000, 0, 0, 0, 0, 1.000, 0.991],
                    [0, 0.996, 0, 0, 1.000, 0, 0, 0.999, 0],
                    [0, 0.998, 0.998, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1.000, 0, 0.996, 0, 0, 0.998, 1.000],
                    [0, 0, 0, 0, 0, 0.998, 0, 0.998, 0],
                    [0, 0.997, 0, 0, 0, 0.999, 0.999, 0, 0],
                    [0.804, 0, 0.792, 0, 0, 0.986, 0, 0, 0.963],
                    [0, 0, 0.663, 0, 0, 1.000, 0.957, 0, 0.999]
                ]
            };
            setTempMatrix(exampleMatrixData); // Set temporary matrix data
        }
    }

    useEffect(() => {
        const handlePaste = (event) => {
            const items = event.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const blob = items[i].getAsFile();
                    const imageURL = URL.createObjectURL(blob);
                    setImage(imageURL);
                    setFile(blob);
                    break;
                }
            }
        };

        window.addEventListener("paste", handlePaste);
        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, []);

    useEffect(() => {
        if (tempMatrix) {
            // Update the context with the temporary matrix data
            setSudokuMatrix(tempMatrix);
        }
    }, [tempMatrix, setSudokuMatrix]);

    return (
        <div className="main">
            <br />
            <div className="image-cont">
                <div className="upload-img-cont">
                    {image && <img className="sudoku-input-image" src={image} alt="Preview" />}
                    <input className="upload-img" type="file" accept="image/*" onChange={handleChangeImage} />
                </div>
            </div>
            <button className="upload-img-button" onClick={handleUpload}>Process Image</button>
        </div>
    );
};

export default ImageInput;
