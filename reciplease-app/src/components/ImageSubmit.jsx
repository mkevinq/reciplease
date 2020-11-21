import React, { useRef } from 'react';
import './ImageSubmit.css';
import Quagga from 'quagga';

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
        if(result && result.codeResult) {
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
      if (FileReader && file) {
        var fr = new FileReader();
        fr.onloadend = function () {
            filename = fr.result;
            processImage(filename);
        }
        fr.readAsDataURL(file);
      }
    }
  
    return (
      <form>
        <div class="input-field">
            <label for="isbn_input">EAN:</label>
            <input id="isbn_input" class="isbn" type="text" />
            <button type="button" class="icon-barcode button scan" onClick={convertTo64}>&nbsp;</button>
            <input type="file" id="file" capture/>
        </div>
      </form>
    );
  }

export default ImageSubmit;