import { ingredients } from "./assets/top-1k-ingredients.json";

export default function isIngredient(ingredient) {
    return ingredients.includes(ingredient);
}
