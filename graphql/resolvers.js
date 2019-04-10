const Category = require('../models/Category')

module.exports = {
    createCategory: async function({categoryInput}, req) {
        const category = new Category({
            name: categoryInput.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        })
        try {
            await category.save();
            res.status(201).json(category)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}