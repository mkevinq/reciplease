import React, { Component, useRef } from 'react';
import './LiveCamera.css';
import Quagga from 'quagga'; // ES6
import makeQuagga from '../MakeQuagga.js';

class LiveCamera extends Component {
    render() {
        return (
            <div id="interactive" class="viewport">
            </div>
        );
    }
    
    componentDidMount() {
        makeQuagga();
    }
}

export default LiveCamera;
