const main = document.getElementsByClassName("main");
const datepicker = document.getElementsByClassName("datepicker");

// 위치정보를 얻어오는 함수
function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude.toFixed(4),
        longitude = position.coords.longitude.toFixed(4);
      return getWeatherData(latitude, longitude);
    }, function (error) {
      console.error(error);
    });
  } else {
    alert('GPS를 지원하지 않습니다');
  }
}

// 해당 위치에 맞는 날씨 정보 받아오기
const getWeatherData = async (lat, lon) => {

  key = '44e3a7220a403c04981ae33f1d716f4e';
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  );

  // 전체적인 날씨 정보 출력
  const weatherData = await data.json(); 
  console.log(weatherData) 
  console.log(datepicker[0].value);
  // 이 API에서는 온도에 절대영도를 사용하기 때문에 상수로 지정
  const ABS_ZERO = 273.15;

  //날씨 정보 받기 시작
  const weather = {
    main: weatherData.weather[0].main
  }
  
  // 값 가져오기 시작!!
  drawWeather(weather);
  return weather;
}

const drawWeather = (weather) => {
  //필요한 날씨 정보 잘 가져왔는지 확인하고!
  console.log("날씨정보")
  console.log(weather);

  JSON.stringify(weather);
  
  //날씨에 따라서 아이콘이 달라야하므로 조건문으로 처리해주고
  if(weather.main == "Clouds"){
    document.getElementById("currentWeather").src = "/media/icon_cloud.png";
    document.getElementById("currentWeather").title = "흐림";
  }
  else if(weather.main == "Atmosphere"){
    document.getElementById("currentWeather").src = "/media/icon_cloud.png";
    document.getElementById("currentWeather").title = "흐림";
  }
  else if(weather.main == "Mist"){
    document.getElementById("currentWeather").src = "/media/icon_cloud.png";
    document.getElementById("currentWeather").title = "흐림";
  }
  else if(weather.main == "Clear"){
    document.getElementById("currentWeather").src = "/media/icon_sun.png";
    document.getElementById("currentWeather").title = "맑음";
  }
  else if(weather.main == "Snow"){
    document.getElementById("currentWeather").src = "/media/icon_snow.png";
    document.getElementById("currentWeather").title = "눈";
  }
  else if(weather.main == "Rain"){
    document.getElementById("currentWeather").src = "/media/icon_rain.png";
    document.getElementById("currentWeather").title = "비";
  }
  else if(weather.main == "Drizzle"){
    document.getElementById("currentWeather").src = "/media/icon_rain.png";
    document.getElementById("currentWeather").title = "비";
  }
  else if(weather.main == "Thunderstorm"){
    document.getElementById("currentWeather").src = "/media/icon_thunderstorm.png";
    document.getElementById("currentWeather").title = "천둥번개";
  }
  else{
    main[0].innerHTML = "정보불러오기 실패";
  }
  
  if(document.getElementById("currentWeather").title == "흐림"){
    document.getElementById("cloud").selected = "selected";
  }
  else  if(document.getElementById("currentWeather").title == "맑음"){
    document.getElementById("sun").selected = "selected";
  }
  else  if(document.getElementById("currentWeather").title == "비"){
    document.getElementById("rain").selected = "selected";
  }
  else  if(document.getElementById("currentWeather").title == "눈"){
    document.getElementById("snow").selected = "selected";
  }  
  else  if(document.getElementById("currentWeather").title == "천둥 번개"){
    document.getElementById("thunderstorm").selected = "selected";
  }

};

// 위치 받으면 함수 내부에서 위에 있는 것들이 모두 처리된다.
//write, edit.js 안에서 실행
//getLocation();
