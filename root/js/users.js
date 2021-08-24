let socket = new WebSocket("wss://" + location.host + "/ws/creategallery");
let messageSent = false;

socket.onmessage = (e) => {
    messageSent = false;
    if (JSON.parse(e.data).success) {
        window.location.reload();
    }
};

document.getElementById("submit").addEventListener("click", () => {
    if (!messageSent) {
        let gallery = document.getElementById("gallery").value;
        socket.send(JSON.stringify({
            gallery_name: gallery,
            id: getCookie("id")
        }));
        messageSent = true;
    }
});
