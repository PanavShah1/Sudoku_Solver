import cv2
import os
import numpy as np
from paths import program_cell_dir, sudoku_dir, image_dir
import matplotlib.pyplot as plt

# image_dir = "/Users/panavshah/Desktop/Desktop - Panav’s MacBook Pro/coding_stuff/projects/sudoku_image_solver/images/sudoku_6.png"

image = cv2.imread(image_dir, cv2.IMREAD_GRAYSCALE)

def preprocess(image):
    blur = cv2.GaussianBlur(image, (3,3),6) 
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 199, 5)
    return thresh

thresh_image = preprocess(image)

edged = cv2.Canny(thresh_image, 30, 200) 
contours, heirarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

largest_contour = max(contours, key=cv2.contourArea)

print(image.shape, largest_contour.shape)


# top-left, top-right, bottom-right, bottom-left
def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect



if largest_contour.shape[0] < image.shape[0] or largest_contour.shape[0] < image.shape[1]:
    print("The largest contour is smaller than the image.")
    cv2.imwrite(sudoku_dir, cv2.resize(image, (900, 900), interpolation = cv2.INTER_LINEAR))

else:
    epsilon = 0.02 * cv2.arcLength(largest_contour, True)
    approx = cv2.approxPolyDP(largest_contour, epsilon, True)

    try:
        if len(approx) == 4:
            box = approx.reshape(4, 2)
        else:
            raise("The largest contour does not have four corners.")
        ordered_box = order_points(box)

        dst = np.float32([[0, 0], [900, 0], [900, 900], [0, 900]])
        matrix = cv2.getPerspectiveTransform(ordered_box, dst)
        result = cv2.warpPerspective(image, matrix, (900, 900))
        # result = preprocess(result)
        cv2.imwrite(sudoku_dir, result)
    except:
        cv2.imwrite(sudoku_dir, cv2.resize(image, (900, 900), interpolation = cv2.INTER_LINEAR))










saved_sudoku_image = cv2.imread(sudoku_dir)
print(saved_sudoku_image.shape)

for i in range(9):
    for j in range(9):
        cell = saved_sudoku_image[i*100:(i+1)*100, j*100:(j+1)*100]
        cv2.imwrite(f'{program_cell_dir}cell_{i}{j}.png', cell)


