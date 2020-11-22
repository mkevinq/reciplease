from keras.applications.inception_resnet_v2 import InceptionResNetV2
from keras.layers import Input

inception_model = InceptionResNetV2(weights='imagenet', input_tensor=Input(shape=(200, 200, 3)))
inception_model.save('inception')