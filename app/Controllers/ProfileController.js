const { getJWT, getId } = require('../utils/index.js');
const {getProfiles, getUserProfile, getFollowerCount, getSubscriberCount, getPostCount} = require("../Services/ProfileServiceProvider.js")

async function sendProfiles(req, res) {

    //get fetch recipes from database
    const users = await getProfiles();

    res.send(users);
}

async function sendOwnProfile(req, res) {

    //get JWT from request
    const token = getJWT(req, res);

    //parse id from request
    const userId = await getId(token);

    let response = {};
    const user = await getUserProfile(userId);
    response.name = user["name"];
    response.description = user["description"];

    response.followerCount = await getFollowerCount(userId);
    response.subscriberCount = await getSubscriberCount(userId);
    response.postCount = await getPostCount(userId);

    res.send(response)
}

module.exports = {
    sendProfiles,
    sendOwnProfile
}