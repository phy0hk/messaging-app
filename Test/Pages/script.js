const send_button = document.getElementById('send');
let websocket_connected = false;
let global_socket;

function scrollToBottom(ele){
    ele.scrollTop = ele.scrollHeight;
}
let message_pool = [];
// When the connection is open
function Connect(url) {

    const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Connected to the WebSocket server');
            global_socket = socket
            websocket_connected = true;
        };
    let sendMsg = setInterval( ()=>{
        if (message_pool.length>0){
            for (let i=message_pool.length;i>0;i--) {
                console.log(message_pool)
                socket.send(JSONMaker({header:'sendMsg',"message":message_pool.shift(),uid:localStorage.getItem('recipient')}))
            }
        }
    },500)

// When a message is received
    socket.onmessage = (event) => {
        console.log(JSON.parse(event.data))
        console.log("GG")
        if (JSON.parse(event.data).header==="message"){
            const message =JSON.parse(event.data).message
            messageUpdate("receive",message)
        }else if (JSON.parse(event.data).header==="users"){
        JSON.parse(event.data).users.forEach((data)=>{
            if (data!==localStorage.getItem('uname')){
                addRecipient(data)
            }
        })}

    };
// When the connection is closed
    socket.onclose = () => {
        console.log('Disconnected from the WebSocket server');
        socket.close()
        websocket_connected = false;
        clearInterval(sendMsg)
        Connect('ws://localhost:3000/api/message')
    };

// When an error occurs
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        socket.close()
        clearInterval(sendMsg)
        websocket_connected = false;
    };
}
Connect('ws://localhost:3000/api/message')

send_button.addEventListener('click',()=>{
    const user_msg = document.getElementById('user-msg').value;
    message_pool.push(user_msg)
    messageUpdate("send",user_msg)
})
function messageUpdate(who,msg){
    const messages = document.getElementById('messages');
    const message = document.createElement("p")
    message.textContent = msg;
    if (who==="send"){
        message.classList.add('send-msg')
    }else if(who==="receive"){
        message.classList.add('receive-msg')
    }
    messages.appendChild(message)
    scrollToBottom(messages)
}
function setUser(){
    const getUname = document.getElementById('uname');
    if (getUname.value){
        localStorage.setItem('uname',getUname.value);
        global_socket.send(JSONMaker({header:'username',uname:localStorage.getItem('uname')}))
    }

}
function JSONMaker(json){
    return JSON.stringify(json)
}
function addRecipient(name){
   const recipientList = document.getElementById('recipientName');
   const element = document.createElement('option')
   element.textContent = name
    recipientList.appendChild(element)
}
function setRecipient(){
    const recipientName = document.getElementById('recipientName')
    localStorage.setItem('recipient',recipientName.value)
}
