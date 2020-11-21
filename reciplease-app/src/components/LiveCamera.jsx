import React, { useRef } from 'react';
import './LiveCamera.css';
import ScriptTag from 'react-script-tag';

function LiveCamera(props) {
    return (
        <div id="interactive" class="viewport">
            <ScriptTag src="../LiveVideo.js" />
        </div>
    );
}

export default LiveCamera;