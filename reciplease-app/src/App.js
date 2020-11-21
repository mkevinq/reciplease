import logo from './logo.svg';
import './App.css';
import Quagga from 'quagga';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to RECIPLEASE
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          REACT PAGE
        </a>
        <ImageSubmit/>
      </header>
    </div>
  );
}

//Submission form for images (returns the code)
function ImageSubmit() {
  function processImage(event) {
    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: 'data:image/jpg;base64,ojwoefjowiejf' // or 'data:image/jpg;base64,' + data
    }, function(result){
      if(result.codeResult) {
        console.log("result", result.codeResult.code);
      } else {
        console.log("not detected");
      }
    });
  }
  return (
    <form>
      <div class="input-field">
          <label for="isbn_input">EAN:</label>
          <input id="isbn_input" class="isbn" type="text" />
          <button type="button" class="icon-barcode button scan" onClick={processImage}>&nbsp;</button>
          <input type="file" id="file" capture/>
      </div>
    </form>
  );
}

export default App;