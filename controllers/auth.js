const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/User');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate) {
        // if exist - login
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            // generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: "Password not match!"
            })
        }
    } else {
        // if not exist - send error
        res.status(404).json({
            message: "User with this email not found!"
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate) {
        // Send error that user exists
        res.status(409).json({
            message: 'User with this email already exists! '
        })
    } else {
        // Create user in DB
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}