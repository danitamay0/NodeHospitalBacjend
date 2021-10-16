const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsuers = async (req, res) => {
    const users = await User.find({}, 'name surname role email ');
    res.json({
        ok: true,
        users
    })
}

const storeUsuer = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const existEmail = await User.find({ email })
        if (existEmail.length) {
            return res.status(400).json({
                ok: false,
                msg: 'The email alrealy exists'
            })
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateJWT(user.id)
        
        return res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: ' Unexpected Error ' + error
        })
    }

}

const updateUsuer = async (req, res) => {
    try {
        //TODO Validar toquen e implementar
        const id = req.params.id;

        const userDB = await User.findById(id);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found '
            })
        }
        const { password, google, email, ...inputs } = req.body;

        if (email) {
            const hasEmail = await User.findOne({ email })
            if (hasEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'The email alrealy exists'
                })
            }
        }
        inputs.email = email;

        //Update user
        const userUpdated = await User.findByIdAndUpdate(id, inputs, { new: true });
        res.json({
            ok: true,
            user: userUpdated
        })


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: ' Unexpected Error ' + error
        })
    }

}

const deleteUser = async (req, res = response) => {
    try {
        const id = req.params.id;

        console.log(id);
        const userDB = await User.findById(id);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found '
            })
        }
        await User.findByIdAndDelete(id)

        res.status(200).json({
            ok: false,
            msg: 'User deleted'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: ' Unexpected Error ' + error
        })
    }

}

module.exports = {
    getUsuers, storeUsuer, updateUsuer, deleteUser
}