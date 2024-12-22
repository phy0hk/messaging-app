const {Pool} = require('pg');
const fs = require('fs').promises;
const ca_cert = fs.readFile(__dirname+'/ca.pem',"utf-8").then((data)=>{return data})
const pool = new Pool({
    connectionString: process.env.Connection_String,
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