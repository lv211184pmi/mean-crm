const Possition = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {
    const _reqParams = req.params;
    try {
        const positions = await Possition.find({
            category: _reqParams.categoryId,
            user: _reqParams.id
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const position = await new Possition({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Possition.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Position was removed!'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    const _id = req.params.id;
    try {
        const position = await Possition.findByIdAndUpdate(
            {_id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}