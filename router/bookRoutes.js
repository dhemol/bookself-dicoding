const router = require('express').Router();
const bookServices = require('../services/bookServices');
const errorMods= require('../services/ErrorModule');

router.route('/books')
.get(bookServices.readBooks)
.post(errorMods.bookNameChecker, errorMods.bookPageCountChecker, bookServices.createBooks);

router.route('/books/:id')
.get(bookServices.readBookById, errorMods.bookIdError)
.put(errorMods.bookNameCheckerPut, errorMods.bookPageCountCheckerPut, bookServices.updateBooks, errorMods.bookIdErrorPut)
.delete(bookServices.deleteBooks, errorMods.bookIdErrorDelete);

module.exports = router;