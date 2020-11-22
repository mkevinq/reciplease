const axios = require("axios");

var baseUrl = "http://localhost"

function getRequest(path, options) {
    return axios.get(baseUrl + path, { params: options })
}

function postRequest(path, body) {
    return axios.post(baseUrl + path, body)
}

function getIngredientsInImg(imgb64) {
    var body = {
        imgb64: imgb64
    }

    return postRequest("/api/getIngredientsInImage", body)
}

function barcodeLookup(barcode) {
    var options = {
        barcode: barcode
    }

    return getRequest("/api/barcodeLookup", options)
}

function findRecipes(ingredients) {
    var options = {
        ingredients: ingredients.join()
    }

    return getRequest("/api/findRecipes", options)
}

