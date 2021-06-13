function onEdit() {
    location.href=`./edit.html`;
}
function onDelete() {
    if(confirm('일기를 삭제하시겠습니까?')) {
        //삭제 구현
        location.href= `./board_grid.html`;
    }
}

const weatherType ={
    sun:"맑음",
    cloud:"흐림",
    rain:"비",
    snow:"눈"
}
const diaryContent = {
    date: "2021-06-14",
    temper_night: "-20",
    temper_day: "10",
    weather: "rain",
    title: "오늘의 일기",
    img: "../media/view_photo_example.jpg",
    content: `에베베베베베베베베우아아아아아악
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure magnam ea architecto excepturi voluptatum omnis, magni obcaecati enim ad, laboriosam quia animi delectus ut similique consectetur culpa ducimus, aliquid dolores!
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint vero, numquam labore cum dignissimos doloremque itaque earum non quis nisi quasi sequi blanditiis, eius enim sapiente quam adipisci eligendi doloribus.
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, esse, alias pariatur, optio velit recusandae commodi atque minus distinctio dolor tempora ad deserunt fugiat. Quidem perspiciatis omnis voluptate mollitia quasi!`
}

document.getElementById('date').childNodes[1].innerText=diaryContent.date;
document.getElementById('title').childNodes[1].innerText= diaryContent.title;
document.getElementById('temper_night').childNodes[1].innerText= diaryContent.temper_night;
document.getElementById('temper_day').childNodes[1].innerText= diaryContent.temper_day;
document.getElementById('weather').childNodes[1].src= `../media/icon_${diaryContent.weather}.png`;
document.getElementById('weather').childNodes[1].title= weatherType[diaryContent.weather];
document.getElementById('photo').childNodes[1].src= diaryContent.img;
document.getElementById('content').childNodes[1].innerText=diaryContent.content;