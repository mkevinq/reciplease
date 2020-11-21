import base64
import json
import requests
import os
import urllib.parse
from flask import Flask, request, jsonify
from getKey import rapidAPI, IEspoonacular

app = Flask(__name__)

"""
process: user uploads pic or barcode --> those are scanned and the proper food is returned --> we detect ingredients --> based on those, find recipes --> get link and all ingredients
"""

@app.route("/api/barcodeLookup/<barcode>", methods=["GET"])
def barcode_lookup(barcode):
    url = "https://barcode-monster.p.rapidapi.com/" + barcode
    headers = {
        'x-rapidapi-key': rapidAPI,
        'x-rapidapi-host': "barcode-monster.p.rapidapi.com"
    }
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 200:
        productInfo = response.json()
        return productInfo["description"]
    else:
        return "Not found"

@app.route("/api/findRecipes", methods=["GET"])
def find_recipes():
    payload = {
        "ingredients": request.args.get("ingredients"),
        "number": 10,
        "apiKey": IEspoonacular, #os.environ.get("SPOONACULAR_API_KEY"),
        "ignorePantry": "true"
    }

    r = requests.get("https://api.spoonacular.com/recipes/findByIngredients", params=payload)
    return r.json()

@app.route("/api/detectIngredients/<productName>", methods=["GET"])
def detect_ingredients(productName):
    url = "https://api.spoonacular.com/food/detect"
    headers = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    payload = "text=" + urllib.parse.quote(productName.lower()) + "&apiKey=" + IEspoonacular
    response = requests.request('POST', url, headers=headers, params=payload)

    if response.status_code == 200:
        responseJSON = response.json()
        annotations = responseJSON['annotations']
        ingredients = []
        for a in annotations:
            if a['tag'] == 'ingredient':
                ingredients.append(a['annotation'])
        return ingredients
    else:
        print(response.status_code)
        return 'Unable to detect ingredient type'

@app.route("/api/getRecipe/<id>", methods=["GET"])
def get_recipe(r_id):
    url = 'https://api.spoonacular.com/recipes/' + str(r_id) + '/information/?includeNutrition=false&apiKey=' + IEspoonacular
    print(url)
    response = requests.request("GET", url)
    if response.status_code == 200:
        recipeInfo = response.json()
        link = recipeInfo['sourceUrl']
        ingredients = []
        for ingredient in recipeInfo['extendedIngredients']:
            ingredients.append(ingredient['name'])
        return {'link': link, 'ingredients': ingredients}
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