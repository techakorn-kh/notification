const express = require('express');
const config = require('./config');
const cors = require('cors');

const app = express();
const port = process.env.PORT|| config.APP_PORT;

require('./utils/database');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Hello World!');
});

app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.use(function(req, res){
    return res.status(500).json({
        code: 500, 
        status: 'error', 
        message: 'Internal Server Error'
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;