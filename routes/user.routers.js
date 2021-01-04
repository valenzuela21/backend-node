/*
* Url: /api/users
*/
const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middleware/validate-fields');

const {getUsers, postUsers, putUsers, deleteUsers} = require('../controlers/users.controler');
const {validateJWT} = require('../middleware/validate-jwt');

const router = Router();

router.get('/', validateJWT , getUsers);
router.post('/',
    [   validateJWT,
        check('name', 'He name input required.').not().isEmpty(),
        check('password', 'He password input required.').not().isEmpty(),
        check('email', 'He email input required.').isEmail(),
        validateFields
    ], postUsers);

router.put('/:id',
    [   validateJWT,
        check('name', 'He name input required.').not().isEmpty(),
        check('email', 'He email input required.').isEmail(),
        check('role', 'He role input required.').not().isEmpty(),
        validateFields
    ],
    putUsers);

router.delete('/:id',validateJWT, deleteUsers);


module.exports = router;
