var title = document.getElementById("titleInput");
var titleBtn = document.getElementById("title-submit");

titleBtn.addEventListener("click", submitTitle());

function submitTitle() {
    if(title.value !== ""){
        document.getElementById('form').submit();
        titleBtn.style.display='none';
    }
} 