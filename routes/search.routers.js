/*
* Url General: /api/search
*/
const {Router} = require('express');
const {validateJWT} = require('../middleware/validate-jwt');
const {getSearch, getDocumentColeccion} = require('../controlers/search.controler');

const router = Router();

router.get('/:search', [
    validateJWT
], getSearch);
router.get('/coleccion/:table/:search', [
    validateJWT
], getDocumentColeccion);

module.exports = router;
