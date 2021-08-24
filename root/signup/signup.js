let socket = new WebSocket("wss://" + location.host + "/ws/signup");
let messageSent = false;

socket.onmessage = (e) => {
    console.log(JSON.parse(e.data));
    messageSent = false;
    if (JSON.parse(e.data).success) {
        window.location = "/login/";
    }
};

document.getElementById("submit").addEventListener("click", () => {
    if (!messageSent) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let username = document.getElementById("username").value;
        socket.send(JSON.stringify({
            email,
            password,
            username
        }));
        messageSent = true;
    }
});
