const { getCategories } = require('../Services/CategoryServiceProvider.js')

async function sendCategories(req, res) {

    const categories = await getCategories();

    res.send({ categories });
}

module.exports = {
    sendCategories
}