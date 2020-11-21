import React, { useRef } from 'react';
import './Ingredients.css';

function Ingredients(props) {
    return (
        <div>
            <h3>Your ingredients</h3>
            <textarea disabled>{props.ingredients}</textarea>
        </div>
    )
}

export default Ingredients;