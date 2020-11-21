import logo from './logo.svg';
import './App.css';
import Quagga from 'quagga'; // ES6
const Quagga = require('quagga').default; // Common JS (important: default)

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
      </header>
    </div>
  );
}

export default App;
