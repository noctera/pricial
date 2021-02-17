async function createIngredient(userId, req) {

    //check if Recipe is public
    const result = await db.recipes.find({
        attributes: ['public'],
        where: {
            id: req.body.recipeId,
            user_id: userId,
        }
    })

    const ingredient = await db.ingredients.create({
        user_id: userId,
        portion_id: req.body.portionId,
        name: req.body.name,
        value: req.body.value,
        public: result.public
    }) 
    
    return ingredient;
}

//function to get all ingredients from a portion
async function getIngredients(jwtUserId, userId, portionId) {

    let ingredients = [];

    if (jwtUserId == userId) {
        ingredients = await db.ingredients.findAll({
            where: {
                user_id: userId,
                portion_id: portionId
            }
        })
    }
    else {
        ingredients = await db.ingredients.findAll({
        where: {
            user_id: userId,
            portion_id: portionId,
            public: true
        }
    })
    }


    return ingredients;
}

//update ingredients
async function updateIngredient(userId, req, res) {

    //check if entity is in database
    const ingredient = await db.ingredients.count({
        where: {
            user_id: userId,
            id: req.body.id
        }
    })
    .then(count => {
        if (count != 0) {
            //if in database, upgrade with the new values
            db.ingredients.update(
                {
                    name: req.body.name,
                    value: req.body.value,
                },
                {
                    where: {
                        user_id: userId,
                        id: req.body.id
                    }
                }
            )
        }
        else {
            return res.status(404)
        }
    })
}

module.exports = {
    createIngredient,
    getIngredients,
    updateIngredient
}