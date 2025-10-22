(function () {

    const recipeList = document.querySelector('#recipeList');

    async function loadRecipeList() {
        try {
            const r = await fetch('recipes.json');
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const list = await r.json();

            list.forEach(recipe => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'recipe';
                radio.value = recipe.name;
                radio.id = recipe.name;

                const label = document.createElement('label');
                label.htmlFor = recipe.name;
                label.innerText = recipe.name;

                const container = document.createElement('div');
                container.appendChild(radio);
                container.appendChild(label);
                recipeList.appendChild(container);

                radio.addEventListener('change', () => {
                    loadRecipe(recipe);
                });
            });
        }
        catch (e) {
            console.error(`Unable to load recipe${e}`);

        }
    }

    async function loadRecipe(recipeData) {
        try {
            const url = recipeData.url;
            const r = await fetch(url);
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText}`);
            }
            const recipe = await r.json();



            const nameElem = document.querySelector('#name');
            nameElem.innerText = recipe.name;
            nameElem.style.fontSize = '2em';

            document.querySelector('#ingredients').innerHTML = recipe.ingredients
                .map(item => `<li>${item}</li>`).join('');



            const imgpath = `img/${recipe.picture}`;
            document.querySelector('#recipePic').src = imgpath;
            const img = document.querySelector('#recipePic');
            img.style.width = '300px';




        }
        catch (e) {
            console.error(`Unable to load recipe${e}`);
        }
    }

    loadRecipeList();

}());