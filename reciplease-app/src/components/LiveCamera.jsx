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
            numOfWorkers: 4,
            locate: true,
            frequency: 10,
            inputStream : {
                name : "Live",
                type : "LiveStream",
                target: document.querySelector('#yourElement'),    // Or '#yourElement' (optional)
                size: 800
            },
            decoder : {
              readers : ["upc_reader"]
            }
            }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            
            //Use torch and zoom if necessary
            // var track = Quagga.CameraAccess.getActiveTrack();
            // var capabilities = {};
            // if (typeof(track.getCapabilities) === 'function') {
            //     capabilities = track.getCapabilities();
            // }
            // track.applyConstraints({
            //     advanced: [{torch: true}, {zoom: true}]
            // })
            // .catch(e => console.log(e));
            // console.log('Capabilities complete.');
            
            Quagga.start();
            console.log("Started.");
        });
        
        Quagga.onProcessed((data) => {
            console.log('Processed image.');
        });

        Quagga.onDetected((data) => {
            console.log('Code: ' + data.codeResult.code);
        });
    }
}

export default LiveCamera;