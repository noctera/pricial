//function to create Recipes in database
async function createRecipe(userId, req) {

    const recipe = await db.recipes.create({
        user_id: userId,
        name: req.body.name,
        description: req.body.description,
        public: req.body.public,
        category_id: req.body.categoryId
    }) 
    
    return recipe;
}

//function to get all recipes from a user
async function getRecipes(userId, req, res) {

    let recipes = [];
    if (userId == req.query.userId) {
        recipes = await db.recipes.findAll({
            where: {
                user_id: req.query.userId
            }
        }) 
    }
    else {
        recipes = await db.recipes.findAll({
            where: {
                user_id: req.query.userId,
                public: true
            }
        })
    }

    return recipes;
}

//function to get a specific recipes from a user
async function getRecipe(jwtUserId, userId, recipeId) {

    let recipes = [];
    if (jwtUserId == userId) {
        recipes = await db.recipes.find({
            where: {
                user_id: userId,
                id: recipeId
            }
        }) 
    }
    else {
        recipes = await db.recipes.find({
            where: {
                user_id: userId,
                id: recipeId,
                public: true
            }
        })
    }

    return recipes;
}



module.exports = {
    createRecipe,
    getRecipes,
    getRecipe
}