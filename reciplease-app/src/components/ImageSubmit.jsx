import React, { useRef } from 'react';
import './ImageSubmit.css';

function ImageSubmit() {
    return (
        <form>
        <div class="input-field">
            <button type="button">Upload Barcode</button>
            <button type="button" class="icon-barcode button scan" onClick={convertTo64}>&nbsp;Search</button>
            <input type="file" id="file" capture/>
        </div>
        </form>
    );
}

export default ImageSubmit;