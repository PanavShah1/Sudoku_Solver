from PIL import Image, ImageDraw, ImageFont
import os
from tqdm import tqdm
def generate_digit_images(output_dir, fonts, image_size=(28, 28), num_images=1000):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for digit in range(10):
        digit_dir = os.path.join(output_dir, str(digit))
        if not os.path.exists(digit_dir):
            os.makedirs(digit_dir)

        for i in tqdm(range(num_images)):
            img = Image.new('L', image_size, color=255)  # Create a white image
            draw = ImageDraw.Draw(img)
            font = ImageFont.truetype(fonts[i % len(fonts)], size=image_size[1] - 4)

            # Calculate the bounding box of the text
            bbox = draw.textbbox((0, 0), str(digit), font=font)
            w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]

            # Calculate position to center the text
            x = (image_size[0] - w) / 2
            y = (image_size[1] - h) / 2

            # Manually adjust the vertical position
            manual_adjustment = -5  # Adjust this value to move the text up or down
            y += manual_adjustment

            # Draw text
            draw.text((x, y), str(digit), fill=0, font=font)
            img.save(os.path.join(digit_dir, f'{digit}_{i}.png'))
# List of default font paths
fonts = [
    "/Library/Fonts/Arial.ttf",
    "/Library/Fonts/Verdana.ttf",
    "/Library/Fonts/Times New Roman.ttf",
    "/Library/Fonts/Georgia.ttf",
    "/Library/Fonts/Courier New.ttf"
]

output_dir = "synthetic_digits_dataset"
generate_digit_images(output_dir, fonts)
