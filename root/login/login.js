let socket = new WebSocket("wss://" + location.host + "/ws/login");
let messageSent = false;

document.getElementById("submit").addEventListener("click", () => {
    if (!messageSent) {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        socket.send(JSON.stringify({
            email,
            password
        }));
        messageSent = true;
    }
});

socket.onmessage = (e) => {
    messageSent = false;
    let date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = ";expires=" + date.toUTCString();
    document.cookie="id=" + JSON.parse(e.data).id + expires + ";path=/";
};
