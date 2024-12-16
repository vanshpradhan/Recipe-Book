let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to display recipes
function displayRecipes(filter = '') {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(filter.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(filter.toLowerCase())
    );

    filteredRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <h4>Ingredients:</h4>
            <p>${recipe.ingredients}</p>
            <h4>Preparation Steps:</h4>
            <p>${recipe.instructions}</p>
            <img src="${recipe.image}" alt="${recipe.name}">
            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            <button onclick="editRecipe(${recipe.id})">Edit</button>
        `;
        recipeList.appendChild(recipeItem);
    });
}

// Function to add a new recipe
document.getElementById('recipe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('recipe-name').value;
    const category = document.getElementById('recipe-category').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const instructions = document.getElementById('recipe-instructions').value;
    const image = document.getElementById('recipe-image').files[0];

    if (!image) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const recipe = {
            id: Date.now(),
            name,
            category,
            ingredients,
            instructions,
            image: e.target.result
        };

        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        document.getElementById('recipe-form').reset();
        document.getElementById('feedback').innerText = 'Recipe added successfully!';
    };
    reader.readAsDataURL(image);
});

// Function to search recipes
function searchRecipes() {
    const searchQuery = document.getElementById('search').value;
    displayRecipes(searchQuery);
}

// Function to delete a recipe
function deleteRecipe(id) {
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    document.getElementById('feedback').innerText = 'Recipe deleted successfully!';
}

// Function to edit a recipe
function editRecipe(id) {
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-category').value = recipe.category;
        document.getElementById('recipe-ingredients').value = recipe.ingredients;
        document.getElementById('recipe-instructions').value = recipe.instructions;
        document.getElementById('recipe-image').value = ''; // Reset image input

        // Remove the recipe from the list and update the local storage
        deleteRecipe(id);
    }
}


// Initial display of recipes
displayRecipes();