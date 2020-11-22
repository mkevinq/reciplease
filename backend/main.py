import base64
import json
import requests
import os
import urllib.parse
import numpy as np

from io import BytesIO
from flask import Flask, request, jsonify
# from getKey import rapidAPI, IEspoonacular

import tensorflow as tf
from tensorflow import keras
from keras.preprocessing import image
from keras.applications.inception_resnet_v2 import preprocess_input, decode_predictions
from PIL import Image

model = keras.models.load_model('model-training/inception')
with open("backend/class_names.json", "r") as file:
    class_names = json.loads(file.read())
app = Flask(__name__)

"""
process: user uploads pic or barcode --> those are scanned and the proper food is returned --> we detect ingredients --> based on those, find recipes --> get link and all ingredients
"""

@app.route("/api/barcodeLookup", methods=["GET"])
def barcode_lookup():
    url = "https://barcode-monster.p.rapidapi.com/" + request.args.get("barcode")
    headers = {
        'x-rapidapi-key': os.environ.get("RAPIDAPI_KEY"),
        'x-rapidapi-host': "barcode-monster.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 200:
        productInfo = response.json()
        return jsonify(ingredients=detect_ingredients(productInfo["description"]))
    else:
        return jsonify(message="Error", status=response.status_code)

@app.route("/api/findRecipes", methods=["GET"])
def find_recipes():
    payload = {
        "ingredients": request.args.get("ingredients"),
        "number": 9,
        "apiKey": os.environ.get("SPOONACULAR_API_KEY"),
        "ignorePantry": "true"
    }

    r = requests.get("https://api.spoonacular.com/recipes/findByIngredients", params=payload)

    recipes = []

    for recipe in r.json():
        recipes.append(get_recipe(recipe["id"]))

    return jsonify(recipes=recipes)

def detect_ingredients(productName):
    url = "https://api.spoonacular.com/food/detect"
    headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    payload = "text=" + urllib.parse.quote(productName.lower()) + "&apiKey=" + os.environ.get("SPOONACULAR_API_KEY")
    response = requests.request('POST', url, headers=headers, params=payload)

    if response.status_code == 200:
        responseJSON = response.json()
        annotations = responseJSON['annotations']
        ingredients = []
        for a in annotations:
            if (a['tag'] == 'ingredient' or a['tag'] == 'dish'):
                ingredients.append(a['annotation'])
        return ingredients
    else:
        print(response.status_code)
        return 'Unable to detect ingredient type'

@app.route("/api/detectIngredientsInImage", methods=["POST"])
def detect_ingredients_in_image():
    img = Image.open(BytesIO(base64.b64decode(request.form["imgb64"])))
    img = img.convert("RGB")
    img = img.resize((200, 200), Image.NEAREST)
    img = image.img_to_array(img)
    img = tf.expand_dims(img, 0)
    img = preprocess_input(img)

    predictions = model.predict(img)
    predictions = decode_predictions(predictions)

    pred_processed = []

    for prediction in predictions:
        items = []
        for item in prediction:
            item = [x for x in item]
            item[2] = float(item[2])
            items.append(item)
        pred_processed.append(items)

    return jsonify(predictions=pred_processed)
    
def get_recipe(r_id):
    url = 'https://api.spoonacular.com/recipes/' + str(r_id) + '/information/?includeNutrition=false&apiKey=' + os.environ.get("SPOONACULAR_API_KEY")
    response = requests.request("GET", url)
    if response.status_code == 200:
        return response.json()
    else:
        return 'No link'

if __name__ == "__main__":
    # for testing purposes
    """ingredients = detect_ingredients('Goldfish Baked Crackers')
    print(ingredients)
    info = get_recipe(1)
    print(info)
    recipes = find_recipes("granny smith apple")
    print(recipes)"""
