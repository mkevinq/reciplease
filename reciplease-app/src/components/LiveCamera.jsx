import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import './LiveCamera.css';

function LiveCamera(props) {
    const webcam = useRef(null);
    const interval = useRef(null);

    useEffect(() => {
        if (interval.current === null) {
            interval.current = setInterval(() => {
                props.onScreenshot(webcam.current.getScreenshot(), true);
            }, 1000)
        }
    });

    return (
        <div id="interactive" class="viewport">
            <Webcam audio={false} ref={webcam} width={800} screenshotFormat="image/jpeg" />
        </div>
    );
}

export default LiveCamera;
