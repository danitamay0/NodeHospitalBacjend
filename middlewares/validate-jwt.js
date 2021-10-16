const jwt = require('jsonwebtoken')

const validateJWT = (req,res,next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'Token not found'
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token not valid'
        })
    }

   

}

module.exports = {
    validateJWT
}