const express =  require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('hbs', exphbs.engine( {extname: '.hbs'}));
app.set('view engine','hbs');

//connection pool
const pool = mysql.createPool({
connectionLimit : 100,
host            : process.env.DB_HOST,
user            : process.env.DB_USER,
password        : process.env.DB_PASSWORD,
database        : process.env.DB_NAME
});

//CONNECT TO DB

pool.getConnection((err,connection) => {
    if(err) throw err; //not connected
    console.log('connected as ID ' + connection.threadId);
});

//router
const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));