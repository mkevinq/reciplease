import React, { useRef } from 'react';
import './TopCollection.css';
import LiveCamera from './LiveCamera.jsx';
import LeftCollection from './LeftCollection.jsx';

function TopCollection() {
    return (
        <div class="topCollection">
            <LeftCollection/>
            <LiveCamera/>
        </div>
    );
}

export default TopCollection;