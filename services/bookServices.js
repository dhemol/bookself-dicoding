const nanoId = require('nanoid');
const timeStamp = require('time-stamp');
const db = require('../server');

function readBooks(req, res) {
    
}

function createBooks(req, res) {
    const { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading } = req.body;

    if (name === undefined) res.status(400).send({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku.' });

    if (readPage > pageCount) res.status(400).send({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' });

    db.query(`INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt) VALUES ('${id}', '${name}', '${year}', '${author}', '${summary}', '${publisher}', '${pageCount}', '${readPage}', '${finished}', '${reading}', '${timeStamp('YYYY-MM-DD HH:mm:ss')}', '${timeStamp('YYYY-MM-DD HH:mm:ss')}')`, (err) => {
        if (err) throw err;
        
        res.status(201).json({ status: 'success', message: 'Data buku berhasil ditambah.' });
    });
}

function updateBooks(req, res) {

}

function deleteBooks(req, res) {

}

module.exports = {
    readBooks,
    createBooks,
    updateBooks,
    deleteBooks,
}