const { getJWT, getId } = require('../utils/index.js');
const { createIngredient, getIngredients, updateIngredient } = require('../Services/IngredientServiceProvider.js');

async function addIngredient(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //add recipe to database
    const recipe = await createIngredient(userId, req);

    res.send(recipe);
}

async function sendIngredients(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //get fetch recipes from database
    const portionId = req.param.portionId
    const ingredients = await getIngredients(userId, portionId);

    res.send(ingredients);
}

async function sendUpdate(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //get fetch recipes from database
    
    const ingredient = await updateIngredient(userId, req, res);

    res.send(ingredient);
}

module.exports = {
    addIngredient,
    sendIngredients,
    sendUpdate
}