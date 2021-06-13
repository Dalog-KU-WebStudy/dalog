function onSubmit() {
    location.href=`./view.html`;
}

let changeWeather_flag = 0;
function changeWeather() {
    if (changeWeather_flag==0) {
        document.getElementById('weather_select').style.display="block";
        document.getElementById('input_temper_night').readOnly=false;
        document.getElementById('input_temper_day').readOnly=false;
        document.getElementById('input_temper_night').style.border="1px solid black";
        document.getElementById('input_temper_day').style.border="1px solid black";

        document.getElementById('manual_button').childNodes[1].innerText = "저장";

        changeWeather_flag=1;
    } else if (changeWeather_flag==1) {
        document.getElementById('weather_select').style.display="none";
        document.getElementById('input_temper_night').readOnly=true;
        document.getElementById('input_temper_day').readOnly=true;
        document.getElementById('input_temper_night').style.border="none";
        document.getElementById('input_temper_day').style.border="none";

        document.getElementById('manual_button').childNodes[1].innerText = "변경";

        changeWeather_flag=0;
    }
}

let selected_weather = "";
const weatherType ={
    sun:"맑음",
    cloud:"흐림",
    rain:"비",
    snow:"눈"
}
function weather_select_change() {
    let select = document.getElementById('weather_select');
    selected_weather = select.options[select.selectedIndex].value;
    document.getElementById('weather').childNodes[1].src=`../media/icon_${selected_weather}.png`;
    document.getElementById('weather').childNodes[1].title=weatherType[selected_weather];
}