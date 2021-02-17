const {getProfiles} = require("../Services/ProfileServiceProvider.js")

async function sendProfiles(req, res) {

    //get fetch recipes from database
    const users = await getProfiles();

    res.send(users);
}

module.exports = {
    sendProfiles
}