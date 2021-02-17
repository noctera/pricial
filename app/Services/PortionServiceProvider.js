async function createPortion(userId, req) {
    //check if Recipe is public
    const result = await db.recipes.find({
        attributes: ['public'],
        where: {
            id: req.body.recipeId,
            user_id: userId,
        }
    })

    const portion = await db.portions.create({
        user_id: userId,
        recipe_id: req.body.recipeId,
        value: req.body.value,
        public: result.public
    }) 
    
    return portion;
}

//function to get all recipes from a user
async function getPortions(jwtUserId, userId, recipeId) {

    let portions = [];

    if (jwtUserId == userId) {
        portions = await db.portions.findAll({
            where: {
                user_id: userId,
                recipe_id: recipeId
            }
        })
    }
    else {
        portions = await db.portions.findAll({
            where: {
                user_id: userId,
                recipe_id: recipeId
            }
        })
    }

    return portions;
}

module.exports = {
    createPortion,
    getPortions
}