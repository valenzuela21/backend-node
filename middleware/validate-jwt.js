const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) =>{
    //Read Token
    const token = req.header('token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "There is no token in the result"
        })
    }


    try{
        const { uid }= jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();

    }catch (e) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token results"
        })
    }

}

module.exports={
    validateJWT
}
