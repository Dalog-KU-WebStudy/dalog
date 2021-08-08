var title = document.getElementById("titleInput");

title.addEventListener("change", submitTitle());

function submitTitle() {
    if(title.value !== "")
        document.getElementById('form').submit();
} 