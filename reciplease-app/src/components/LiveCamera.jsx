import React, { useEffect, useRef } from 'react';
import './LiveCamera.css';
import Quagga from 'quagga'; // ES6
import makeQuagga from '../MakeQuagga.js';

function LiveCamera(props) {
    const video = useRef(null);
    const loaded = useRef(false);

    useEffect(() => {
        makeQuagga(props.onBarcodeDetection);
        if (video.current.children[0].srcObject !== null && loaded.current === false) {
            loaded.current = true;
            var media_track = video.current.children[0].srcObject.getVideoTracks()[0];
            var image_capture = new ImageCapture(media_track);
            setInterval(() => {
                image_capture.takePhoto()
                .then((response) => {
                    console.log(response);
                    props.base64Converter(response, false);
                })
                .catch((error) => {
                    console.log("could not take picture");
                })
            }, 1000);
        }
    });

    return (
        <div id="interactive" class="viewport" ref={video}>
        </div>
    );
}

export default LiveCamera;
