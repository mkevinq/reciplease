import React, { useState } from 'react';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
import './App.css';
import logo from './assets/reciplease-logo.png';
import reciplease from "./recipleaseBackend.js";
import Quagga from 'quagga';

// need to create a display recipes function to make a <Recipe> card for each recipe

function App() {
  const [ingredients, setIngredients] = useState([]);
  var lastBarcode = "";

  function barcodeLookup(code) {
    if (code !== lastBarcode) {
      lastBarcode = code;
      reciplease.barcodeLookup(code)
      .then((response) => {
        setIngredients(ingredients.concat(response.data.ingredients))
      })
      .catch((error) => {
        console.log("lmao1");
      })
    }
  }

  //Submission form for images (returns the code)
  var hidden = 'hidden';
  function processImage(base64Img) {
    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: base64Img // or 'data:image/jpg;base64,' + data (the base64 image)
    }, function(result){
      if(result && result.codeResult) { //The first result is always NULL (not sure why though)
        console.log("result", result.codeResult.code);
        barcodeLookup(result.codeResult.code);
      } else {
        console.log("not detected");
      }
    });
  }

  //Coverts the selected file to base-64
  function convertTo64(event) {
    const file = document.getElementById('file').files[0];
    var filename;
    if (FileReader && file) {
      var fr = new FileReader();
      fr.onloadend = function () {
          filename = fr.result;
          processImage(filename);
      }
      fr.readAsDataURL(file);
    }
  }

  function search (){
      document.getElementById("search").style.visibility = "visible";
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
            <form>
                <div class="input-field">
                    <label for="file" class="file-upload">
                        Upload
                    </label>
                    <input type="file" id="file" onChange={search}/>
                </div>
              </form>
            <div class="buttonCollection">
              <button>Number 2</button>
              <button>Number 3</button>
            </div>
            <form method="get" action="/api/findRecipes">
              <textarea name="ingredients">
              </textarea>
              <button type="button" id="search" style={{visibility: "hidden"}}class="icon-barcode button scan" onClick={convertTo64}>&nbsp;Get recipes!</button>
            </form>
          </div>
          <LiveCamera onBarcodeDetection={barcodeLookup} />
        </div>

        {/*Everything below the 'top collection'*/}
        <div className="banner">
          <div className="logo-div">
            <img className="logo" src={logo} alt=""></img>
            <h1>Reciplease</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;