//function to get all users
async function getProfiles() {
    const users = await db.users.findAll({
        attributes: ["id", "name"]
    })

    return users;
}

module.exports = {
    getProfiles
}