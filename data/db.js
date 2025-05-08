const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maroc.0903',
    database: 'db_blog'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('NONNT');
});
module.exports = connection;