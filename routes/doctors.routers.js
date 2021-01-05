/*
* URL: /api/doctors
 */

const {Router} = require('express');
const { getDoctors, postDoctors, updateDoctors, deleteDoctors } = require('../controlers/doctors.controler');
const {validateJWT} = require('../middleware/validate-jwt');
const {validateFields} = require('../middleware/validate-fields');
const {check} = require('express-validator');

const router = Router();

router.get('/', getDoctors);
router.post('/',
    [validateJWT,
        check('name', 'Input name file is require').not().isEmpty(),
        check('hospital', 'Input id_hospital file is require').isMongoId(),
        validateFields
    ], postDoctors);

router.put('/:id',
    [],
    updateDoctors);

router.delete('/:id', deleteDoctors);


module.exports = router;
