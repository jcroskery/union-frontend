let messageSent = false;

const reader = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
}

document.getElementById("submit").addEventListener("click", e => {
    if (!messageSent) {
        let files = document.getElementById("file").files;
        let requests = [];
        let promises = [];
        for(let i = 0; i < files.length; i++) {
            promises.push(reader(files[i]));
            requests.push({ image_name: files[i].name });
        }
        Promise.all(promises).then((files) => {
            for(let i = 0; i < requests.length; i++) {
                requests[i].image = files[i];
                requests[i].id = getCookie("id");
                requests[i].gallery_name = window.location.pathname.split("/").pop();
            }
            console.log(requests);
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/post/image', true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                window.location.reload();
            }
            let json = JSON.stringify(requests);
            console.log(json);
            xhr.send(json);
            messageSent = true;
        });
    }
});
