const api = {
    endpoint: 'https://api.openweathermap.org/data/2.5/',
    key: '21fb11cf880bae45d62b41007980d15a'
}

let cityInput = getApi()

async function getApi() { 
    const resOne = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=64d391b3c5e34f2eb9a87b6b938de84c`);
    const resultOne = await resOne.json(); 
    getInfo(resultOne.city);
}


const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

function enter(e) {
    if(e.keyCode === 13) {
        getInfo(input.value.trim());
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&lang=ru&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {

    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;

    input.value = ''

    getOurDate();

    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `Ощущается как: ${Math.round(result.main.feels_like)}<span>°</span>`;

    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].description}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML = `Min: ${Math.round(result.main.temp_min)}<span>°</span> Max: ${Math.round(result.main.temp_max)}<span>°</span>`
}

function getOurDate() {
    const myDate = new Date;
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    let nowDay = days[myDate.getDay()];

    let todayDate = myDate.getDate();

    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    let nowMonths = months[myDate.getMonth()]

    let showDate = document.querySelector('#date');
    showDate.innerHTML = `${nowDay}, ${todayDate} ${nowMonths}`;
}

