const { getJWT, getId } = require('../utils/index.js');
const { createPortion, getPortions } = require('../Services/PortionServiceProvider.js');

async function addPortion(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //add recipe to database
    const portion = await createPortion(userId, req);

    res.send(portion);
}

async function sendPortions(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    //get fetch portions from database
    const portions = await getPortions(userId, req);

    res.send(portions);
}

module.exports = {
    addPortion,
    sendPortions
}