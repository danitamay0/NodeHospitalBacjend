const bcrypt = require('bcryptjs');

const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user')
const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        //verify email
        const userDb = await User.findOne({ email });

        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Passwordd or Email not valid'
            })
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, userDb.password);

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password or Email not valid'
            })
        }

        //encrypy jwt
        const token = await generateJWT(userDb.id)
        res.status(200).json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: ' Unexpected Error ' + error
        })
    }
}

module.exports = { login }