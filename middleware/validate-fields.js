const { response } = require('express');
const { validationResult } = require('express-validator');
const validateFields = (req, res = response, next) =>{
    const inputErrors =  validationResult(req);
    if(!inputErrors.isEmpty()){
        return  res.status(400).json({
            ok: false,
            msg: "¡There are wrong fields!",
            errors: inputErrors.mapped()
        })
    }

    next();
}

module.exports =  {validateFields};
