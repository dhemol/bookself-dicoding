const expres = require('express');
const bodyParser = require('body-parser');

const bookRoutes = require('./router/bookRoutes');

const app = expres();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(201).json({ status: 'success', message: 'Welcome to Book API' });
});

app.use(bookRoutes);

// Page 404 Error Handler
app.use((req, res, next) => {
    const err = new Error('404 Page Not Found.');

    err.status = 404;

    next(err);
});

// Error's Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.send({
        status: 'fail',
        message: err.message
    });
});

app.listen(3000, () => { console.log('Server started on port 3000'); });