const {Pool} = require('pg');
const fs = require('fs').promises;
const ca_cert = fs.readFile(__dirname+'/ca(1).pem',"utf-8").then((data)=>{return data})
const pool = new Pool({
    connectionString: 'postgres://avnadmin:AVNS_YjdmnrZABZIsgRmmWu-@service-postgresql-phkvpn-d7db.e.aivencloud.com:24048/chatappdb',
    ssl:{
        rejectUnauthorized:false
    }
});

(async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database!');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();