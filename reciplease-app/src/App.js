import React, { useState, useRef, useEffect } from 'react';
import LiveCamera from './components/LiveCamera';
import Recipe from './components/Recipe';
import './App.css';
import logo from './assets/reciplease-logo.png';
import reciplease from "./recipleaseBackend.js";
import Quagga from 'quagga';
import isIngredient from './IngredientChecker.js';


// need to create a display recipes function to make a <Recipe> card for each recipe

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const lastBarcode = useRef("");
  const ingredients_text = useRef(null);

  useEffect(() => {
    ingredients_text.current.value = ingredients.join();
  }, [ingredients])

  function findRecipes(event) {
    setProcessing(true);
    reciplease.findRecipes(ingredients)
      .then((response) => {
        setRecipes(response.data.recipes);
        setProcessing(false);
      })
      .catch((error) => {
        console.log("lmao3");
        setProcessing(false);
      })
  }

  function barcodeLookup(code) {
    if (code !== lastBarcode.current && code !== "") {
      setProcessing(true);
      lastBarcode.current = code;
      reciplease.barcodeLookup(code)
        .then((response) => {
          setIngredients(ingredients.concat(response.data.ingredients))
          setProcessing(false);
        })
        .catch((error) => {
          console.log("lmao1");
          setProcessing(false);
        })
    }
  }

  function getIngredientsInImg(b64) {
    setProcessing(true);
    reciplease.getIngredientsInImg(b64)
      .then((response) => {
        setIngredients((prevIngredients) => {
          console.log(response.data.predictions[0][0][2]);
          console.log(prevIngredients)
          if (response.data.predictions[0][0][2] > 0.99 && !prevIngredients.includes(response.data.predictions[0][0][1]) && isIngredient(response.data.predictions[0][0][1])) {
            return [...prevIngredients, response.data.predictions[0][0][1]]
          } else {
            return [...prevIngredients]
          }
        });
        setProcessing(false);
      })
      .catch((error) => {
        console.log("lmao2");
        setProcessing(false);
      })
  }

  //Submission form for images (returns the code)
  var hidden = 'hidden';
  function processImage(base64Img, barcode) {
    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: base64Img // or 'data:image/jpg;base64,' + data (the base64 image)
    }, function (result) {
      if (result && result.codeResult && barcode) { //The first result is always NULL (not sure why though)
        console.log("result", result.codeResult.code);
        barcodeLookup(result.codeResult.code);
      } else {
        console.log("not detected");
        getIngredientsInImg(base64Img.split(",")[1]);
      }
    });
  }

  //Coverts the given file to base-64
  function convertTo64(file, barcode) {
    var filename;
    if (FileReader && file) {
      var fr = new FileReader();
      fr.onloadend = function () {
        filename = fr.result;
        processImage(filename, barcode);
      }
      fr.readAsDataURL(file);
    }
  }

  return (
    <div className="App">
      <div className="content">

        {/*The top collection of items (video and everything to the left of it)*/}
        <div class="topCollection">
          <div class="leftCollection">
            <div className="description">
              <h1>Welcome to Reciplease!</h1>
              <p>Start finding awesome recipes today!</p>
            </div>
            <form>
              <div class="input-field">
                <label for="file" class="file-upload">
                  Upload
                    </label>
                    <input type="file" id="file" onChange={(event) => {
                      convertTo64(document.getElementById('file').files[0], true);
                    }}/>
                </div>
              </form>
              <textarea placeholder="Your ingredients will go here!" disabled name="ingredients" ref={ingredients_text}>
              </textarea>
              <button type="button" id="search" class="icon-barcode button scan" onClick={findRecipes}>&nbsp;Get recipes!</button>
          </div>
          <LiveCamera onScreenshot={processImage}/>
        </div>

        {/*Everything below the 'top collection'*/}

        { recipes.map((recipe) => (
          <div className="recipes">
            <Recipe key={recipe.title} image={recipe.image} title={recipe.title} link={recipe.sourceUrl} ingredients={recipe.extendedIngredients.map((ingredient) => ingredient.originalName).join(", ")} />
          </div>
        ))}

      </div>
      <div className="banner">
        <div className="logo-div">
          <img className="logo" src={logo} alt=""></img>
          <h1>Reciplease</h1>
        </div>
      </div>
    </div>
  );
}

export default App;