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
      src: 'data:image/jpg;base64,' + convertTo64(event) // or 'data:image/jpg;base64,' + data
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

/**
 * Converts an image to a dataURL
 * @param  {String}   src          The src of the image
 * @param  {Function} callback     
 * @param  {String}   outputFormat [outputFormat='image/png']
 * @url   https://gist.github.com/HaNdTriX/7704632/
 * @docs  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement#Methods
 * @author HaNdTriX
 * @example
 * 
 *   toDataUrl('http://goo.gl/AOxHAL', function(base64Img){
 *     console.log('IMAGE:',base64Img);
 *   })
 * 
 */
function toDataUrl(src, callback, outputFormat) {
  // Create an Image object
  var img = new Image();
  // Add CORS approval to prevent a tainted canvas
  img.crossOrigin = 'Anonymous';
  console.log('Test: toDataUrl 3rd line');
  img.onload = function() {
    console.log('Test: onload start');
    // Create an html canvas element
    var canvas = document.createElement('CANVAS');
    // Create a 2d context
    var ctx = canvas.getContext('2d');
    var dataURL;
    // Resize the canavas to the original image dimensions
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    // Draw the image to a canvas
    ctx.drawImage(this, 0, 0);
    // Convert the canvas to a data url
    dataURL = canvas.toDataURL(outputFormat);
    // Return the data url via callback
    callback(dataURL);
    // Mark the canvas to be ready for garbage 
    // collection
    canvas = null;
    console.log('Test: onload done');
  };
  // Load the image
  img.src = src;
  console.log('Test: image src assigned. src below');
  console.log(img.src)
  // make sure the load event fires for cached images too
  if (img.complete || img.complete === undefined) {
    // Flush cache
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    // Try again
    img.src = src;
  }
  console.log('Test: done');
}

function convertTo64(event) {
  const file = document.getElementById('file').files[0].name;
  var filename;
  console.log('Test: ' + file);
  if (FileReader && file) {
    var fr = new FileReader();
    fr.onload = function () {
        filename = fr.result;
    }
  }
  console.log('Test sequel: ' + filename);
  toDataUrl('http://goo.gl/AOxHAL'/*filename*/, function(base64Img){
    console.log('IMAGE:',base64Img);
    return base64Img;
  }, 'image/jpg'); //assume only one image
}

export default App;