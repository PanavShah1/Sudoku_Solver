<h1>Sudoku Solver</h1>
<p>Simply upload an image of a Sudoku—whether it's from a book, a website, or any other source—and watch as it's automatically solved and displayed.</p>

<h2>Running the Program</h2>
<ul>
  <li>Clone this repository</li>
  <li>Go to the website directory <code>cd website</code></li>
  <li>Run the backend server <code>uvicorn api:app --reload</code></li>
  <li>Go to the frontend directory <code>cd frontend</code></li>
  <li>Run the React server <code>npm start</code></li>
</ul>

<h2>How it works</h2>

<h3>Image Processing</h3>
<p>I have utilized OpenCV for processing the input image. The process begins by creating contours to detect the outer boundary of the Sudoku grid. By identifying and collecting the coordinates of the four corner points, the image is then transformed and straightened into a square format. Then the Sudoku is chopped down to 81 pieces, each representing a cell of the Sudoku. Each cell image is then stripped of any border lines and passed through the classification model to detect the digit in the box.</p>
<p>The code for this can be found in <code>process_image.py</code>.</p>

<h3>Classification Model</h3>
<p>I have used a simple CNN model to classify the various digits. This model uses 2D Convolution, ReLU, Maxpool, Flatten, and Linear Layers.</p>
<p>As for the dataset, I started off trying the MNIST dataset, but it didn't work well with the typed digits included in Sudoku. So, I created my own dataset by using numbers from several fonts and augmenting it.</p>
<p>The code can be found in the <code>Numbers</code> folder.</p>
