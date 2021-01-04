/*
* Url: /api/login
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { loginAuth } = require('../controlers/auth.controler');
const {validateFields} = require('../middleware/validate-fields');
const router = Router();

router.post('/',[
            check('email', 'He user input is required').isEmail(),
            check('password', 'He password input is required').not().isEmpty(),
            validateFields
], loginAuth )



module.exports = router;
