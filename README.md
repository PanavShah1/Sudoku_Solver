<h1>Sudoku Solver</h1>
Simply upload an image of a Sudoku--whether it's from a book, a website or any other source--and watch as it's automatically solved and displayed.

<h2>Running the Program</h2>
<ul>
  <li>Clone this repository</li>
  <li>Go to the website directory `cd website`</li>
  <li>Run the backend server `uvicorn api:app --reload</li>
  <li>Go to the frontend directory 'cd frontend`</li>
  <li>Run the React server `npm start`</li>
</ul>

<h2>How it works</h2>

<h3>Image Processing</h3>
I have utilized OpenCV for processing the input image. The process begins by creating contours to detect the outer boundary of the Sudoku grid. By identifying and collecting the coordinates of the four corner points, the image is then transformed and straightened into a square format. Then the sudoku is chopped down to 81 pieces, each for a cell of the Sudoku. Each cell image is then stripped off of any border lines and then passed through the classification model to detect the digit in the box. <br>
The code for this can be found in `process_image.py`.

<h3>Classification Model</h3>
I have used a simple CNN model to classify the various digits. This model uses 2D Convolution, ReLU, Maxpool, Flatten and Linear Layers. <br>
As for the dataset, I started off trying the MNIST dataset but that didn't work well with the typed digits included in Sudoku's. So I created my own dataset by using numbers from several fonts and augmenting it. <br>
Code can be found in the `Numbers` folder

