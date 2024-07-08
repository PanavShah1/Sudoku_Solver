import React from "react";
import Context from "./Context";

const ImageInput = () => {
    const [image, setImage] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const {sudokuMatrix, setSudokuMatrix} = React.useContext(Context)

    function handleChangeImage(event) {
        const file = event.target.files[0]
        if (file){
            const imageURL = URL.createObjectURL(file)
            console.log(imageURL)
            console.log(file)
            setImage(imageURL)
            setFile(file)
        }
    }

    async function handleUpload(){
        if (file) {
            console.log(image)
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("http://localhost:8000/upload-image", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()
            setSudokuMatrix(JSON.parse(result))
            console.log(JSON.parse(result))
        }
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleChangeImage}/>
            <br></br>
            {image && <img className="sudoku-input-image" src={image} alt="Preview" />}
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    )
}

export default ImageInput