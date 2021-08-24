let socket = new WebSocket("wss://" + location.host + "/ws/creategallery");
let messageSent = false;

socket.onmessage = (e) => {
    console.log(JSON.parse(e.data));
    messageSent = false;
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
