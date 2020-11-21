import logo from './logo.svg';
import './App.css';
import Quagga from 'quagga';
import LiveCamera from './components/LiveCamera.jsx';

function App() {
  return (
    <div className="App">
      <div className="banner">
        Reciplease
      </div>

      <div className="description">
        <h1>Welcome to Reciplease!</h1>
      </div>

      <ImageSubmit/>
      <LiveCamera/>
    </div>
  );
}

//Submission form for images (returns the code)
function ImageSubmit() {
  function processImage(base64Img) {
    Quagga.decodeSingle({
      decoder: {
        readers: ["ean_reader"] // List of active readers
      },
      locate: true, // try to locate the barcode in the image
      src: base64Img // or 'data:image/jpg;base64,' + data (the base64 image)
    }, function(result){
      if(result.codeResult) {
        console.log("result", result.codeResult.code);
      } else {
        console.log("not detected");
      }
    });
  }

  //Coverts the selected file to base-64
  function convertTo64(event) {
    const file = document.getElementById('file').files[0];
    var filename;
    console.log('Test: ' + file);
    if (FileReader && file) {
      var fr = new FileReader();
      console.log('Before onload');
      fr.onloadend = function () {
          filename = fr.result;
          console.log('Test sequel: ' + filename);
          processImage(filename);
      }
      fr.readAsDataURL(file);
    }
  }

  return (
    <form>
      <div class="input-field">
          <button type="button">Upload Barcode</button>
          <button type="button" class="icon-barcode button scan" onClick={convertTo64}>&nbsp;Search</button>
          <input type="file" id="file" capture/>
      </div>
    </form>
  );
}

export default App;