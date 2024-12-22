const express = require('express');
const expressWs = require('express-ws');
const msgApi = express.Router();
const MsgToSend = [];
const clients = new Map();
const {users} = require('./StoreData')
const {locals} = require("express/lib/application");
expressWs(msgApi);
msgApi.ws('/',(ws,req)=>{
    ws.on('message',msg=>{
        msg = JSON.parse(msg)
        if (msg.header==='message'){
            console.log(msg.message)
        }else if (msg.header==='username'){
           users.push(msg.uname)
           clients.set(msg.uname,ws)
           BroadcastToAll({header:"users",users:users})
        }else if (msg.header==="sendMsg"){
            PassMessageToUser(msg.message,msg.uid)
        }
    })
})

function PassMessageToUser(msg,uid){
    const client = clients.get(uid)
    if (client && client.readyState ===client.OPEN){
        client.send(JSON.stringify({header:"message",message:msg}))
    }
}
function BroadcastToAll(json){
    clients.forEach((client)=>{
        if (client && client.readyState ===client.OPEN){
            client.send(JSON.stringify(json))
        }
    })
}
module.exports = {msgApi};