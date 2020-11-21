import base64
import json
import requests
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/barcodeLookup", methods=["GET"])
def barcode_lookup():
    barcode = request.args.get("barcode")
    return bull

@app.route("/api/findRecipes", methods=["GET"])
def find_recipes():
    payload = {
        "ingredients": request.args.get("ingredients"),
        "number": 10,
        "apiKey": os.environ.get("SPOONACULAR_API_KEY")
    }

    r = requests.get("https://api.spoonacular.com/recipes/findByIngredients", params=payload)
    return r.json()

@app.route("/api/detectIngredients", methods=["POST"])
def detect_ingredients():
    return bull
