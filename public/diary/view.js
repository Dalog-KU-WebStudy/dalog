const xhr = new XMLHttpRequest();
xhr.open('post', url);
xhr.send();
console.log('post 호출');
xhr.addEventListener('load', function () {
  console.log(xhr.responseText);

  if (xhr.responseText!="wrongId") {
    const diary = JSON.parse(xhr.responseText);
    console.dir(diary);

    document.getElementById("date").childNodes[1].innerText = diary.diary_date;
    document.getElementById("title").childNodes[1].innerText = diary.diary_title;
    if (diary.weather) {
      document.getElementById(
        "weather"
      ).childNodes[1].src = `/media/icon_${diary.weather}.png`;
      document.getElementById("weather").childNodes[1].title =
        diary.weather;
    } else {
      document.getElementById('weather_box').style = "display:none";
    }
    if (diary.image_dir) {
      document.getElementById("photo").childNodes[1].src = `/${diary.image_dir}`;
    } else {
      document.getElementById("photo").style = "display : none";
    }

    document.getElementById("content").innerHTML = diary.diary_content;
  } else {
    alert('잘못된 접근입니다.'); location.href = '/';
  }

})