import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
import ImageSubmit from './components/ImageSubmit';
import './App.css';
import logo from './assets/reciplease-logo.png';

// need to create a display recipes function to make a <Recipe> card for each recipe

function App() {
  return (
    <div className="App">

      <div className="content">
      <div className="description">
        <h1>Welcome to Reciplease!</h1>
      </div>

      <ImageSubmit/>
      <LiveCamera/>
      <UploadBarcode></UploadBarcode>
      </div>
      
      <div className="banner">
        <div className="logo-div">
        <img className="logo" src={logo}></img>
        </div>
        Reciplease
      </div>

    </div>
  );
}

export default App;