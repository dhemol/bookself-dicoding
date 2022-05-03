function bookNameChecker(req, res, next) {
    const err = new Error('Gagal menambahkan buku. Mohon isi nama buku');

    err.status = 400;

    if (req.body.name === '') next(err);

    next();
}

function bookPageCountChecker(req, res, next) {
    const err = new Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');

    err.status = 400;

    if (parseInt(req.body.readPage) > parseInt(req.body.pageCount)) return next(err);
    return next();
}

function bookIdError(req, res, next) {
    const err = new Error('Buku tidak ditemukan');

    err.status = 404;

    next(err);
}

function bookIdErrorPut(req, res, next) {
    const err = new Error('Gagal memperbarui buku. Id tidak ditemukan');

    err.status = 404;

    next(err);
}

function bookNameCheckerPut(req, res, next) {
    const err = new Error('Gagal memperbarui buku. Mohon isi nama buku');

    err.status = 400;

    if (req.body.name === '') return next(err);

    return next();
}

function bookPageCountCheckerPut(req, res, next) {
    const err = new Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');

    err.status = 400;

    if (parseInt(req.body.readPage) > parseInt(req.body.pageCount)) return next(err);

    return next();
}

function bookIdErrorDelete(req, res, next) {
    const err = new Error('Buku gagal dihapus. Id tidak ditemukan');

    err.status = 404;

    next(err);
}

module.exports = {
    bookNameChecker,
    bookPageCountChecker,
    bookIdError,
    bookIdErrorPut,
    bookNameCheckerPut,
    bookPageCountCheckerPut,
    bookIdErrorDelete,
}