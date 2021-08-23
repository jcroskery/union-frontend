let socket = new WebSocket("wss://" + location.host + "/ws/login");

document.getElementById("submit").addEventListener("click", () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    socket.send(JSON.stringify({
        request_type: "login",
        email,
        password
    }));
});

socket.onmessage = (e) => {
    console.log(JSON.parse(e.data));
};
