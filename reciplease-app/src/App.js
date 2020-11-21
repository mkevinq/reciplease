import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="banner">
        Reciplease
      </div>

      <div className="description">
        <h1>Welcome to Reciplease!</h1>
      </div>

      <UploadBarcode></UploadBarcode>

    </div>
  );
}



export default App;