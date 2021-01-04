const  jwt = require('jsonwebtoken');

const generateJWT  = (uid) => {

    return new Promise((resolve, reject) =>{
        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '12h'
        },(error, token)=>{
            if(error){
                console.log(error);
                reject("Json general web token failed...");
            }else{
                resolve(token);
            }
        });
    });


}

module.exports ={
    generateJWT
}
