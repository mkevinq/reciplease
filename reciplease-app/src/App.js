import React, { useState } from 'react';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
import './App.css';
import logo from './assets/reciplease-logo.png';
import reciplease from "./recipleaseBackend.js";

// need to create a display recipes function to make a <Recipe> card for each recipe

function App() {
  const [ingredients, setIngredients] = useState([]);

  function barcodeLookup(code) {
    reciplease.barcodeLookup(code)
      .then((response) => {
        setIngredients(ingredients.concat(response.data.ingredients))
      })
      .catch((error) => {
        console.log("lmao1");
      })
  }

  return (
    <div className="App">
      <div className="content">
        <div className="description">
          <h1>Welcome to Reciplease!</h1>
        </div>

        {/*The top collection of items (video and everything to the left of it)*/}
        <div class="topCollection">
          <div class="leftCollection">
            <p>Welcome to <i>reciplease</i>. Start finding awesome recipes today!</p>
            <div class="buttonCollection">
              <button>Number 1</button>
              <button>Number 2</button>
              <button>Number 3</button>
            </div>
            <form method="get" action="/api/findRecipes">
              <textarea name="ingredients">
              </textarea>
              <button type="submit">Get recipes!</button>
            </form>
          </div>
          <LiveCamera onBarcodeDetection={barcodeLookup} />
        </div>

        {/*Everything below the 'top collection'*/}
        <UploadBarcode onButtonClick={barcodeLookup} />
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