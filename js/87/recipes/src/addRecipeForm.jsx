import { useState } from 'react';
import './addRecipeForm.css';

export default function AddRecipeForm({ addRecipe }) {
    let idNum = 1;
    const [recipe, setRecipe] = useState({
        name: '',
        picture: '',
        ingredients: '',
        directions: ''
    });


    function handleSubmit(e) {
        e.preventDefault();
        const newRecipe = { ...recipe, id: idNum++, ingredients: recipe.ingredients.split("\n").map(i => i.trim()), directions: recipe.directions.split('.\n').map(d => d.trim()) };

        addRecipe(newRecipe);
        setRecipe({ name: '', picture: '', ingredients: '', directions: '' });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };



    return (

        <form onSubmit={handleSubmit}>
            <input
                name='name'
                value={recipe.name}
                onChange={handleChange}
                placeholder='Recipe Name'
                required
            />
            <input
                name='picture'
                value={recipe.picture}
                onChange={handleChange}
                placeholder='Recipe Picture URL'
            />
            <input
                name='ingredients'
                value={recipe.ingredients}
                onChange={handleChange}
                placeholder='Ingredients'
                required
            />
            <input
                name='directions'
                value={recipe.directions}
                onChange={handleChange}
                placeholder='Directions'
                required
            />
            <button type='submit'>Add Recipe</button>
        </form>
    );


}
