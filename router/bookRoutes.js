const router = require('express').Router();
const bookServices = require('../services/bookServices');

function toPageBooks(req, res) {
    res.status(200).redirect('/books');
}

router.route('/books')
.get()
.post(bookServices.createBooks);

module.exports = router;