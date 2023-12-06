const db = require('../database/models');
const User = db.User;
const passport = require('passport');
const bcrypt = require('bcrypt');


exports.newUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body

        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(14))

        const user = await User.create({first_name, last_name, email, password: hashedPassword})
        if (user) res.status(201).json({
            status: true,
            user: user.id
        })
    } catch (error){
        console.log(error)
    }

}

exports.login = (req, res) => {
    if (req.user) {
        res.status(200).json({
            status: true,
            message: "logged in successfully!"
        })
    }
}

exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) return next(err) 
        res.json({message: "logged out!"})
    })
}

exports.allUser = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: db.Url,
                    as: 'urls'
                },
            ]
        })
        if (users){
            res.json({
                status: true,
                users
            })
        }
    } catch (error){
        console.log(error)
    }
}

exports.getUser = async (req, res) => {
    try {

        const {email} = req.params
        const user = await User.findOne({where: {'email': email}})
        res.json({status: true, user})

    } catch (error) {
        console.log(error)
    }
    
}