/*
* URL: /api/hospitals
 */

const {Router} = require('express');
const {getHospitals, postHospitals, updateHospitals, deleteHospitals} = require('../controlers/hospitals.controler');
const {validateJWT} = require('../middleware/validate-jwt');
const {validateFields} = require('../middleware/validate-fields');
const {check} = require('express-validator');

const router = Router();

router.get('/', validateJWT, getHospitals);
router.post('/',
    [validateJWT,
        check('name', 'Input name file require').not().isEmpty(),
        validateFields
    ], postHospitals);

router.put('/:id',
    [],
    updateHospitals);

router.delete('/:id', deleteHospitals);


module.exports = router;
