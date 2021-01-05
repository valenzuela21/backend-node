/*
* Url General: /api/upload
*/
const {Router} = require('express');
const expressfileUpload = require('express-fileupload');
const {validateJWT} = require('../middleware/validate-jwt');
const { fileUpload, returnImage } = require('../controlers/uploads.controler');

const router = Router();

router.use(expressfileUpload());

router.put('/:type/:id', [
    validateJWT
], fileUpload);

router.get('/:type/:photo', [
    validateJWT
], returnImage);


module.exports = router;
