import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
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
      <UploadBarcode></UploadBarcode>

    </div>
  );
}


function ImageSubmit() {
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