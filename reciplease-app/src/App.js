import logo from './logo.svg';
import './App.css';

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
  <form>
    <div class="input-field">
        <label for="isbn_input">EAN:</label>
        <input id="isbn_input" class="isbn" type="text" />
        <button type="button" class="icon-barcode button scan">&nbsp;</button>
        <input type="file" id="file" capture/>
    </div>
</form>
}

export default App;