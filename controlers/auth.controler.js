const { response }= require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');

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

const googleSingAuth = async (req, res = response)=>{
    const googleToken = req.body.token;

    try{

        const {name, email, picture} = await googleVerify(googleToken);

        //Verify exists email user

        const userDB = await User.findOne({email});
        let user;

        if(!userDB){
                    user = new User({
                        name,
                        email,
                        password: '@@@@',
                        image: picture,
                        google: true
                    });
        }else{
            //Exist User
            user = userDB;
            user.google = true;
        }

        await  user.save();

        //Generate Json Web Token
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            token
        })

    }catch (e) {
        console.log(e);
        res.status(401).json({
            ok: true,
            msg: "The token is not correct...",
        })
    }

}

const renewToken = async (req, res = response) =>{

    const uid = req.uid;

    //Generate New Token
    const token = await generateJWT(uid);

    //Get user for uid
    const user = await User.findById(uid);

    res.status(200).json({
        ok: true,
        token,
        user
    })
}


module.exports = {
    loginAuth,
    googleSingAuth,
    renewToken
}
