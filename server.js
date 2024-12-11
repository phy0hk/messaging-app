const express = require('express');
const server = express();
const database = require('./DB Controller/database.controller');
require('dotenv').config();
const {msgApi} = require('./API/MessageHandler.API')
const PORT = 3000;
const bcrypt = require('bcrypt')
const WebSocket = require('express-ws')
server.use(express.json());
async function hashPassword(pwd){
    return await bcrypt.hash(pwd,10);
}
WebSocket(server)
server.use('/api/message',msgApi);
server.get('/',(req,res)=>{
    res.send("Server is working");
})
server.ws('/',(ws,req)=>{

})

server.listen(PORT,()=>{
    console.log("Server is listen to http://localhost:"+PORT);
})
