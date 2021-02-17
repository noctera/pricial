async function getCategories() {
    const categories = await db.categories.findAll({
        attributes: ['id', 'name'],
    })

    return categories;
}

module.exports = {
    getCategories
}