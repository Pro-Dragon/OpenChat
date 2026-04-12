const socket = io("https://api.joinchat.app");
function sendMessage() {
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    const data = {
        username,
        message
    }

    socket.emit("send_message", data);
};

socket.on("receive_messages", (data) => {
    const li = document.createElement('li');
    li.innerText = `${data.username} : ${data.message}`;
    document.getElementById('chat').appendChild(li);
});

socket.on("load_old_messages", (data) => {
    data.forEach(element => {
        const li = document.createElement('li');
        li.innerText = `${element.username} : ${element.message}`;
        document.getElementById('chat').appendChild(li);
    });
})

