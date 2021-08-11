const main = document.querySelector(".main");
const feel = document.querySelector(".feel");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const temp = document.querySelector(".temp");
const rain = document.querySelector(".rain");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const icon = document.querySelector(".icon");


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

const getWeatherData = async (lat, lon) => {

  key = '826f749cb42e7f0116d3403ccf886a13';

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  );
  const weatherData = await data.json(); // weatherData를 콘솔에 찍어보는 것 추천!
  console.log(weatherData)
  const ABS_ZERO = 273.15; // 이 API에서는 온도에 절대영도를 사용하기 때문에 상수로 지정해줍니다

  //날씨
  //Feels, Min, Max, Humidity, Wind
  const weather = {
    main: weatherData.weather[0].main,

    feel: (weatherData.main.feels_like - ABS_ZERO).toFixed(2),
    min: (weatherData.main.temp_max - ABS_ZERO).toFixed(2),
    max: (weatherData.main.temp_min - ABS_ZERO).toFixed(2),
    temp: (weatherData.main.temp - ABS_ZERO).toFixed(2), // toFixed(2) - 소수점 둘째자리까지 나타냅니다

    rain: weatherData.rain ? weatherData.rain["1h"] : null, // 비가 올 때만 데이터가 들어오기 때문에 null 처리를 해주지 않으면 오류가 납니다
    humidity: weatherData.main.humidity,
    wind: weatherData.wind.speed,
    icon: weatherData.weather[0].icon,
    id: weatherData.weather[0].id
  }
  drawWeather(weather);
  return weather;
}

const drawWeather = (weather) => {
  main.innerHTML = `${weather.main}`;
  feel.innerHTML = `<span>Feels: </span>${weather.feel} °C`;
  min.innerHTML = `<span>Min: </span>${weather.min} °C`;
  max.innerHTML = `<span>Max: </span>${weather.max} °C`;
  temp.innerHTML = `${weather.temp} °C`;
  humidity.innerHTML = `<span>Humidity: </span>${weather.humidity} %`;
  wind.innerHTML = `<span>Wind: </span>${weather.wind} m/s`;
  // icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="icon" />`;
  setAnimationIcon(weather.id, weather.icon);
  if (weather.rain != null) {
    rain.innerHTML = `<span>Rain: </span>${weather.rain} mm/h`;
  }
};

setAnimationIcon = (weatherid, iconid) => {
  const skycons = new Skycons({ "color": "white", "resizeClear": true });
  switch(parseInt(weatherid/100)){
    case 2,3: skycons.add("icon", Skycons.SLEET); break;
    case 5: skycons.add("icon", Skycons.RAIN); break;
    case 6: skycons.add("icon", Skycons.SNOW); break;
    case 7: skycons.add("icon", Skycons.FOG); break;
    case 7: skycons.add("icon", Skycons.FOG); break;
    case 8: {
      switch(iconid){
        case '01d': skycons.add("icon", Skycons.CLEAR_DAY); break;
        case '01n': skycons.add("icon", Skycons.CLEAR_NIGHT); break;
        case '02d': skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY); break;
        case '02n': skycons.add("icon", Skycons.PARTLY_CLOUDY_NIGHT); break;
        default :   skycons.add("icon", Skycons.CLOUDY);
      }
    }
  }
    skycons.play();
}

getLocation();
