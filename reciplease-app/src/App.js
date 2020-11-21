import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
import ImageSubmit from './components/ImageSubmit';
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

      <ImageSubmit/>
      <LiveCamera/>
      <UploadBarcode></UploadBarcode>

    </div>
  );
}

export default App;