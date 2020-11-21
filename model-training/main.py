import time
import matplotlib.pyplot as plt
import numpy as np
import PIL
import os
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

import pathlib

batch_size = 32
img_height = 200
img_width = 200

train_dir = pathlib.Path('./data/train')
val_dir = pathlib.Path('./data/validation')
test_dir = pathlib.Path('./data/test')

train_ds = tf.keras.preprocessing.image_dataset_from_directory(train_dir, seed=420, image_size=(img_width, img_height), batch_size=32)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(val_dir, seed=420, image_size=(img_width, img_height), batch_size=32)
test_ds = tf.keras.preprocessing.image_dataset_from_directory(test_dir, seed=420, image_size=(img_width, img_height), batch_size=32)
print(train_ds.class_names)

num_classes = 36

model = Sequential([
    layers.experimental.preprocessing.Rescaling(1./255, input_shape=(img_height, img_width, 3)),
    layers.Conv2D(16, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(num_classes)
])

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

start_time = time.time()

history = model.fit(train_ds,validation_data=val_ds,epochs=20)

model.save("saved_model")

print("Training time: " + str(time.time() - start_time) + " seconds")


