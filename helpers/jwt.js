const jwt = require('jsonwebtoken')

const generateJWT = (id) => {
    return new Promise((resovlve, reject) => {
        const payload = {
            id
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("can't generate jwt")
            } else {
                resovlve(token)
            }


        })

    })
}

module.exports = { generateJWT }