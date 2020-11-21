import React, { useRef } from 'react';
import './LiveCamera.css';
import ScriptTag from 'react-script-tag'; //remove from npm
import Quagga from 'quagga'; // ES6

function LiveCamera(props) {
    return (
        <div id="interactive" class="viewport" onLoad={StartCamera}>
        </div>
    );
}

function StartCamera() {
    console.log('Starting camera.');
    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : ["code_128_reader"]
        }
        }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
    });
    
    Quagga.onDetected((data) => {
        console.log('Code: ' + data.codeResult.code);
    });
}

export default LiveCamera;