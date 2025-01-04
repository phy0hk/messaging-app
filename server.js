const express = require("express");
const server = express();
server.get('/chat',(req,res)=>{
    res.sendFile(__dirname+'/chatapp/out/chat.html');
})
server.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/chatapp/out/login.html');
})
server.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/chatapp/out/register.html');
})
server.use('/',(req,res)=>{
    res.sendFile(__dirname+"/chatapp/out/"+req.url);
})
server.listen(3000,()=>{
    console.log("Server is listen to port 3000")
})