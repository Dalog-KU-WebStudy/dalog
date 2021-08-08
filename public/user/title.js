var title = document.getElementById("titleInput");

title.addEventListener("focus", submitTitle());

function submitTitle() {
    if(title.value !== "")
        document.getElementById('form').submit();
} 