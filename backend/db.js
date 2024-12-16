const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'avnadmin',
    host: 'service-postgresql-phkvpn-d7db.e.aivencloud.com',
    database: 'chatappdb',
    password: 'AVNS_YjdmnrZABZIsgRmmWu-',
    port: 24048,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = pool;

//postgres://avnadmin:AVNS_YjdmnrZABZIsgRmmWu-@service-postgresql-phkvpn-d7db.e.aivencloud.com:24048/