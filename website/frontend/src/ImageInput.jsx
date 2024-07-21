import React, { useEffect, useState, useContext } from "react";
import Context from "./Context";

const ImageInput = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const { sudokuMatrix, setSudokuMatrix } = useContext(Context);

    function handleChangeImage(event) {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
            setFile(file);
        }
    }

    async function handleUpload() {
        if (file) {
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
            } catch (error) {
                console.error("Error uploading image:", error);
            }
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

    return (
        <div className="main">
            <br />
            <div className="image-cont">
                <div className="upload-img-cont">
                    {image && <img className="sudoku-input-image" src={image} alt="Preview" />}
                    <input className="upload-img" type="file" accept="image/*" onChange={handleChangeImage} />
                </div>
            </div>
            {file && <button className="upload-img-button" onClick={handleUpload}>Upload Image</button>}
        </div>
    );
};

export default ImageInput;
