const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'bsyxu3aldzplkzxbn0h6-mysql.services.clever-cloud.com',
    user: 'u14zoyyxmy4ygu8k',
    password: 'jhlTMwjdyTcyCH93aMgv',
    database: 'bsyxu3aldzplkzxbn0h6'
});

module.exports = pool;
