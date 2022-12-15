$(() => {
    let textarea = document.getElementById("Address");
    let limit = 150; //height limit

    textarea.oninput = function() {
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px";
    };

});