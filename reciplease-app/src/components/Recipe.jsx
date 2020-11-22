import React, { useRef } from 'react';
import './Recipe.css';

function Recipe(props) {

    /*function getUsedIngredients(){
        let usedIngredients = []
        const ingredients = props.usedIngredients;
        ingredients.forEach(ingredient => {
            usedIngredients.push(ingredient['name']);
        });
        return usedIngredients;
    }*/

    return (
        <div className="recipe-card">
            <img src={props.image} alt="" class="food"></img>
            <h1>{props.title}</h1>
            <p className="ingredient-list"><strong>Ingredient(s): </strong>{props.ingredients}</p>
            <a className="recipe-link" href={props.link}>See the full recipe here!</a>
        </div>
    )
}

export default Recipe;