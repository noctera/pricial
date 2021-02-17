const { getJWT, getId } = require('../utils/index.js');
const { createRecipe, getRecipes, getRecipe } = require('../Services/RecipeServiceProvider.js');
const { getPortions } = require("../Services/PortionServiceProvider.js");
const { getIngredients } = require('../Services/IngredientServiceProvider.js');

async function addRecipe(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //add recipe to database
    const recipe = await createRecipe(userId, req);

    res.send(recipe);
}

async function sendRecipes(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //get fetch recipes from database
    const recipes = await getRecipes(userId, req, res);

    res.send(recipes);
}

//send specific recipe
async function sendRecipe(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const jwtUserId = await getId(token);

    //get fetch recipe from database
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;
    let recipe = [];
    const recipeInfo = await getRecipe(jwtUserId, userId, recipeId);
    const portions = await getPortions(jwtUserId, userId, recipeId);
    const ingredients = [];

    for (i in portions) {
        var portionId = portions[i].id;
        ingredients[i] = Object.assign({}, await getIngredients(jwtUserId, userId, portionId));
    }
    recipe.push(recipeInfo);
    recipe.push(portions);
    recipe.push(ingredients);
    //recipe[1].push(recipeInfo)


    res.send(recipe);
}

module.exports = {
    addRecipe,
    sendRecipes,
    sendRecipe
}