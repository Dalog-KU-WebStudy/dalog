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


document.getElementById('input_date').value=diaryContent.date;
document.getElementById('input_temper_night').value=diaryContent.temper_night;
document.getElementById('input_temper_day').value=diaryContent.temper_day;
document.getElementById('weather').childNodes[1].src=`../media/icon_${diaryContent.weather}.png`;
document.getElementById('weather').childNodes[1].title=weatherType[diaryContent.weather];
document.getElementById('input_title').value=diaryContent.title;
document.getElementById('today_photo').src=diaryContent.img;
document.getElementById('input_content').innerText= diaryContent.content;