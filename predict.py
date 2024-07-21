from MNIST.model import MNISTModelV0
import torch 
import os
from PIL import Image
import torchvision.transforms as transforms
import cv2
import numpy as np
import matplotlib.pyplot as plt
from paths import program_cell_dir, MNIST_dir, Number_dir


def remove_border(cell_num):
    image = cv2.imread(f'{program_cell_dir}/cell_{cell_num}.png', cv2.IMREAD_GRAYSCALE)
    blur = cv2.GaussianBlur(image, (3,3),6)
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 199, 5)

    line_list_1 = []
    for i in range(100):
        ctr = 0
        for j in range(100):
            if thresh[i][j] == 255:
                ctr+=1
        line_list_1.append(ctr)
    
    start_1 = 0
    end_1 = 99
    for i in range(20):
        if line_list_1[i] < 5:
            start_1 = i
    for i in range(99, 80, -1):
        if line_list_1[i] < 5:
            end_1 = i
    # print(line_list_1)
    # print(start_1, end_1)


    line_list_2 = []
    for i in range(100):
        ctr = 0
        for j in range(100):
            if thresh[j][i] == 255:
                ctr+=1
        line_list_2.append(ctr)
    
    start_2 = 0
    end_2 = 99
    for i in range(20):
        if line_list_2[i] < 5:
            start_2 = i
    for i in range(99, 80, -1):
        if line_list_2[i] < 5:
            end_2 = i
    # print(line_list_2)
    # print(start_2, end_2)

    return(image[start_1:end_1, start_2:end_2])



def check_empty(cell_num):

    image = remove_border(cell_num)
    image = image[10:90, 10:90]
    # blur = cv2.GaussianBlur(image, (3,3),6) 
    thresh = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 199, 5)
    mean = np.mean(thresh)
    print(f"mean : {mean}")

    # plt.imshow(thresh, cmap='gray')
    # plt.show()

    if mean > 235:
        return True
    else:
        return False




def predict_number(cell_num):
    cell_num = f"{cell_num}"
    img = Image.open(f'{program_cell_dir}/cell_{cell_num}.png')

    img = remove_border(cell_num)


    thresh = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 199, 5)


    img = thresh
    # img = img * 1.5  # Adjust the factor as needed
    print("max : ", np.max(img))


    img = transforms.ToTensor()(img)
    # img = img[:, 10:, :90]
    img = transforms.Resize((28, 28))(img)

    img_np = img.numpy()
    # plt.imshow(img_np[0], cmap='gray')
    # plt.show()


    model_pred = MNISTModelV0(input_shape=1, hidden_layers=10, output_shape=10)

    model_pred.load_state_dict(torch.load(os.path.join(Number_dir, 'model_3.pth')))

    img = img.unsqueeze(0)
    model_pred.eval()
    with torch.inference_mode():
        pred = model_pred(img)
        print(pred)
        pred_prob = torch.nn.functional.softmax(pred, dim=1)
        print(pred_prob)
        pred_class = torch.argmax(pred_prob)
        print(f"number : {pred_class}")
        print(f"probability : {pred_prob[0][int(pred_class)]}")
    
    return pred_class, pred_prob[0][int(pred_class)]

if __name__ == "__main__":
    print(check_empty("78"))
    print(predict_number("78"))