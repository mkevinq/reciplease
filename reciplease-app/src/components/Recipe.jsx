import React, { useRef } from 'react';
import './Recipe.css';

function Recipe(props) {

    function getUsedIngredients(){
        let usedIngredients = []
        const ingredients = props.usedIngredients;
        ingredients.forEach(ingredient => {
            usedIngredients.push(ingredient['name']);
        });
        return usedIngredients;
    }

    return (
        <div>
            <img src={props.image}></img>
            <h1>{props.title}</h1>
            <p>{getUsedIngredients()}</p>
            <a href={props.link}>See the full recipe here!</a>
        </div>
    )
}

export default Recipe;