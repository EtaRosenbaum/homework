
//export default function RecipeList(props) {
    // const { recipes, selectedRecipe, selectRecipe } = props;

    // // const recipeOptions = recipes?.map((r, index) => <option key={r.id} value={index}>{r.name}</option>);

    // const recipeOptions = recipes?.map((r, index) => <button key={r.id} onClick={handleRecipeChange} value={index}>{r.name}</button>);


    // function handleRecipeChange(e) {
    //     const buttonId = e.target.value;
    //     console.log(`Button with ID: ${buttonId} was clicked.`);

    // }

    // return (
    //     <div>   {recipeOptions} </div>

    // );


//}


    export default function RecipeList(props) {
        const { recipes, selectedRecipe, selectRecipe } = props;

        const recipesJsx = recipes?.map((r, index) => <option key={r.id} value={index}>{r.name}</option>);

        return (
            <select id="recipes" value={selectedRecipe} onChange={selectRecipe} >
                <option hidden>select a recipe</option>
                {recipesJsx}
            </select>
        );
    }
