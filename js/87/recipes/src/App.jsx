import './App.css';
import Header from './Header';
import Recipe from './Recipe';
import NoRecipe from './NoRecipe';
import AddRecipeForm from './addRecipeForm';
import { useState, useEffect } from 'react';
import RecipeList from './recipeList';





export default function App() {
    const [recipes, setRecipes] = useState([]);


    const [chosenRecipe, setChosenRecipe] = useState(1);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

        const getRecipes = async () => {
            try {
                const response = await fetch('recipes.json');
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`);
                }
                const recipes = await response.json();
                console.log(recipes);
                setRecipes(recipes);

            } catch (e) {
                console.log(e);
            }
        }
        getRecipes();

    }, [])

    const selectRecipe = e => {
        setChosenRecipe(e.target.value);
    }

    const handleToggle = () => {
        setShowForm(!showForm);

    };
    const handleAddRecipe = (newRecipe) => {

        const newRecipeId = {
            ...newRecipe,
            id: recipes.length ? recipes[recipes.length - 1].id + 1 : 1
        };
        setRecipes((prevRecipes) => {
            const updated = [...prevRecipes, newRecipeId];
        setChosenRecipe(updated.length-1);
        return updated;
        });
        
        setShowForm(false);
    };


    const recipeDisplay = !recipes.length
        ? <NoRecipe />
        : <Recipe recipe={recipes[chosenRecipe]} />


    return (
        <>
            <Header></Header>

            <button className='addRecipe' onClick={handleToggle}>{showForm ? 'Hide Form': 'Add Recipe'}</button>
            {showForm && <AddRecipeForm addRecipe={handleAddRecipe}></AddRecipeForm>}

            <RecipeList
                recipes={recipes}
                selectedRecipe={chosenRecipe}
                selectRecipe={selectRecipe} />

            {recipeDisplay}
        </>

    )

}


