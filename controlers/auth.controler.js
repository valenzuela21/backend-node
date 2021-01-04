const { response }= require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');


const loginAuth = async(req, res = response) => {

    const {password, email} = req.body;

    try{

        //Verify email
        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: "Error: contact the administrator..."
            })
        }

        //Verify password
        const validatePass = bcrypt.compareSync(password, userDB.password);

        if(!validatePass){
            return  res.status(400).json({
                ok: false,
                msg: "Error: contact the administrator..."
            })
        }

        //Generate Web Json Token
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    }catch (e) {
        console.log(e);
        res.status(400).json({
            ok: false,
            msg: "Error: contact the administrator..."
        })
    }

}
module.exports = {
    loginAuth
}
