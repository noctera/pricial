const { where } = require("sequelize");

//function to get all users
async function getProfiles() {
    const users = await db.users.findAll({
        attributes: ["id", "name"]
    })

    return users;
}

async function getUserProfile(userId) {
    const users = await db.users.find({
        attributes: ["name", "description"],
        where: {
            id: userId
        }
    })

    return users;
}

async function getFollowerCount(userId) {
    /*const count = await db.users.findAll({
        attributes: ["name", "description"]
    })*/

    return "0";
}

async function getSubscriberCount(userId) {
    return "0";
}

async function getPostCount(id) {
    const count = await db.recipes.count({
        where: {
            user_id: userId
        }
    })

    return count;
}

module.exports = {
    getProfiles,
    getUserProfile,
    getFollowerCount,
    getSubscriberCount,
    getPostCount
}