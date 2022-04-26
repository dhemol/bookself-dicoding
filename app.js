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

app.listen(3000, () => { console.log('Server started on port 3000'); });