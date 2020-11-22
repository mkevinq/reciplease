import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
import './App.css';
import logo from './assets/reciplease-logo.png';
import TopCollection from './components/TopCollection';

// need to create a display recipes function to make a <Recipe> card for each recipe

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="description">
          <h1>Welcome to Reciplease!</h1>
        </div>
        <TopCollection/>
        <UploadBarcode/>
      </div>

      <div className="banner">
        <div className="logo-div">
          <img className="logo" src={logo}></img>
          <h1>Reciplease</h1>
        </div>

      </div>
    </div>
  );
}

export default App;