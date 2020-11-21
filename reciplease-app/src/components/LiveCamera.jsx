import React, { useRef } from 'react';
import './LiveCamera.css';
import ScriptTag from 'react-script-tag';
//import useScript from '../UseScript.js';

function LiveCamera(props) {
    //useScript('LiveVideo.js');

    return (
        <div id="interactive" class="viewport">
            <ScriptTag type="text/javascript" src="../LiveVideo.js" />
        </div>
    );
}

export default LiveCamera;