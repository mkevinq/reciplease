import React, { useRef } from 'react';
import './LeftCollection.css';

function LeftCollection() {
    return (
        <div class="leftCollection">
            <p>Welcome to <i>reciplease</i>. Start finding aweseome recipes today!</p>
            <div class="buttonCollection">
                <button>Number 1</button>
                <button>Number 2</button>
                <button>Number 3</button>
            </div>
        </div>
    );
}

export default LeftCollection;