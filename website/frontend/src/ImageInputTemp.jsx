import React from "react";
import Context from "./Context";

const ImageInputTemp = () => {
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
            setSudokuMatrix({"sudoku_matrix": [[9, 7, 3, 0, 0, 0, 5, 0, 0], [6, 0, 7, 0, 0, 0, 0, 2, 4], [0, 5, 0, 0, 8, 0, 0, 7, 0], [0, 7, 9, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 9, 0, 0, 4, 3], [0, 0, 0, 0, 0, 4, 0, 9, 0], [0, 4, 0, 0, 0, 1, 9, 0, 0], [7, 0, 6, 0, 0, 9, 0, 0, 5], [0, 0, 1, 0, 0, 6, 4, 0, 7]], "prob_matrix": [[0.9122118353843689, 0.9584969282150269, 0.9999947547912598, 0, 0, 0, 0.9999892711639404, 0, 0], [0.9998294115066528, 0, 0.9999734163284302, 0, 0, 0, 0, 0.9999958276748657, 0.9907557368278503], [0, 0.995855987071991, 0, 0, 0.9995342493057251, 0, 0, 0.9999784231185913, 0], [0, 0.9984851479530334, 0.9982275366783142, 0, 0, 0, 0, 0, 0], [0, 0, 0.9999957084655762, 0, 0.9963716268539429, 0, 0, 0.998030960559845, 0.9999994039535522], [0, 0, 0, 0, 0, 0.9981608986854553, 0, 0.9984338879585266, 0], [0, 0.99664306640625, 0, 0, 0, 0.9998782873153687, 0.999119222164154, 0, 0], [0.8044832348823547, 0, 0.7915952205657959, 0, 0, 0.9861181378364563, 0, 0, 0.9625230431556702], [0, 0, 0.663441002368927, 0, 0, 0.9999459981918335, 0.9573721885681152, 0, 0.9994271993637085]]})
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

export default ImageInputTemp