import React, { Component, useRef } from 'react';
import './LiveCamera.css';
import Quagga from 'quagga'; // ES6

class LiveCamera extends Component {
    render() {
        return (
            <div id="interactive" class="viewport">
            </div>
        );
    }
    
    componentDidMount() {
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
}

export default LiveCamera;