import Ingredients from './components/Ingredients';
import ScanBarcode from './components/ScanBarcode';
import ScanFood from './components/ScanFood';
import UploadBarcode from './components/UploadBarcode';
import LiveCamera from './components/LiveCamera';
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
        
        {/*The top collection of items (video and everything to the left of it)*/}
        <div class="topCollection">
            <div class="leftCollection">
                <p>Welcome to <i>reciplease</i>. Start finding aweseome recipes today!</p>
                <div class="buttonCollection">
                    <button>Number 1</button>
                    <button>Number 2</button>
                    <button>Number 3</button>
                </div>
                <textarea>
                </textarea>
            </div>
            <LiveCamera/>
        </div>

        {/*Everything below the 'top collection'*/}
        <UploadBarcode/>
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