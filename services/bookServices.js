const nanoId = require('nanoid');
const timeStamp = require('time-stamp');
const db = require('../server');

function readBooks(req, res) {
    db.query(`SELECT id, name, publisher FROM books`, (err, result) => {
        if (err) return db.rollback(() => { throw err; });

        res.status(200).json({
            status: 'success',
            data: {
                books: result
            }
        })
    });
}

function readBookById(req, res, next) {
    const id = req.params.id;

    db.query(`SELECT * FROM books WHERE id='${id}'`, (err, result) => {
        if (err) return db.rollback(() => { throw err; });

        // console.log(result, result.length);

        if (result.length === 0) return next(); // This must Jump to error module

        res.status(200).json({
            status: 'success',
            data: {
                book: result[0] // FIXME: result[0] is undefined. Check Test Result in [Mandatory] Get Detail Books With Correct Id Postman
            }
        });
    });
}

function createBooks(req, res) {
    const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = req.body;

    const id = nanoId.nanoid();

    db.query(`INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt) VALUES ('${id}', '${name}', '${year}', '${author}', '${summary}', '${publisher}', '${pageCount}', '${readPage}', '${finished}', '${reading}', '${timeStamp('YYYY-MM-DD HH:mm:ss')}', '${timeStamp('YYYY-MM-DD HH:mm:ss')}')`, (err) => {
        if (err) return db.rollback(() => { throw err; });
        
        res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
    });
}

function updateBooks(req, res, next) {
    const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = req.body;
    const id = req.params.id;

    db.beginTransaction(err => {
       if (err) throw err;
       
       db.query(`SELECT * FROM books WHERE id='${id}'`, (err, result) => {
           if (err) return db.rollback(() => { throw err; });

           if (result.length === 0) return next(); // This must Jump to error module

           db.query(`UPDATE books SET name='${name}', year='${year}', author='${author}', summary='${summary}', publisher='${publisher}', pageCount='${pageCount}', readPage='${readPage}', finished='${finished}', reading='${reading}', updatedAt='${timeStamp('YYYY-MM-DD HH:mm:ss')}' WHERE id='${id}'`, (err) => {
               if (err) return db.rollback(() => { throw err; });

               db.commit();

               res.status(200).json({
                   status: 'success',
                   message: 'Buku berhasil diperbarui',
                   data: {
                       bookId: id
                   }
               });
           });
       });
    });
}

function deleteBooks(req, res, next) {
    const id = req.params.id;

    db.beginTransaction(err => {
        if (err) throw err;

        db.query(`SELECT * FROM books WHERE id='${id}'`, (err, result) => {
            if (err) return db.rollback(() => { throw err; });

            if (result.length === 0) return next(); // This must Jump to error module

            db.query(`DELETE FROM books WHERE id='${id}'`, (err) => {
                if (err) return db.rollback(() => { throw err; });

                db.commit();

                res.status(200).json({
                    status: 'success',
                    message: 'Buku berhasil dihapus',
                });
            });
        });
    });
}

module.exports = {
    readBooks,
    readBookById,
    createBooks,
    updateBooks,
    deleteBooks,
}