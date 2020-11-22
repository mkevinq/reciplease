const axios = require("axios");

var baseUrl = ""

function getRequest(path, options) {
    return axios.get(baseUrl + path, { params: options })
}

function postRequest(path, body) {
    return axios.post(baseUrl + path, body)
}

exports.getIngredientsInImg = function(imgb64) {
    var body = {
        imgb64: imgb64
    }

    return postRequest("/api/getIngredientsInImage", body)
}

exports.barcodeLookup = function(barcode) {
    var options = {
        barcode: barcode
    }

    return getRequest("/api/barcodeLookup", options)
}

exports.findRecipes = function(ingredients) {
    var options = {
        ingredients: ingredients.join()
    }

    return getRequest("/api/findRecipes", options)
}

