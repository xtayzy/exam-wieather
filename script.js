// data = [
//     {
//         id: 3,
//         name: 'aad',
//         date: "05.08.24"
//     },
//     {
//         id: 2,
//         name: 'asssad',
//         date: "05.04.24"
//     },
//     {
//         id: 1,
//         name: 'assad',
//         date: "05.06.24"
//     },
//     {
//         id: 4,
//         name: 'asad',
//         date: "01.07.24"
//     },
// ]
//
//
// data_sort = data.sort((a, b) => {
//     // return a.id - b.id
//     return a.name.toLowerCase() > b.name.toLowerCase()
// })
//
// console.log(data_sort)

const date = new Date();
const date_block = document.getElementById("date_now");
date_block.innerHTML = `${date.getDate() > 10 ? date.getDate() : '0' + date.getDate()}.${(date.getMonth() + 1) > 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}.${date.getFullYear()}`;

const API_KEY = 'a4cc1149d25d3c89542d65d5b68c8731'
const API_URL = 'https://api.openweathermap.org/'
const main_block = document.querySelector('#main')
const form = document.querySelector('#form')
const hours_block = document.querySelector('.weather-hours-block')
const today = document.querySelector('#today')
const fife_days = document.querySelector('#fife-days')
let city = 'Tashkent'
let timezone = 0
const second_page = document.querySelector('#second-page')

const first_page = document.querySelector('#first-page')



form.onsubmit = (e) => {
    e.preventDefault()
    city = document.querySelector('#city').value
    weatherToday()
}

function weatherToday() {
    fetch(`${API_URL}data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            first_page.classList.remove('first-page')
            today.classList.add('today')
            fife_days.classList.remove('fife-days')
            second_page.classList.add('second-page')
            main_block.innerHTML = mainComponent(response)
            fetch(`${API_URL}data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    hours = response.list.map(weatherHour)
                    hours = hours.filter((e) => e.date === hours[0].date)
                    // console.log(hours)
                    day = hours.length
                    res = response.list.slice(0, day)
                    // console.log(res)
                    for (i = 0; i < hours.length; i++) {
                        res[i].dt_txt = hours[i].hour
                    }
                    hours_block.innerHTML = res.map(weatherHoursComponent).join('')
                })
        })
}


function mainComponent(weather) {
    suns = getSunrise(weather.sys.sunrise, weather.sys.sunset, weather.timezone)
    return `
        <div class="main-1">
            <div>
                <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
            </div>
            <div class="clear">
                ${weather.weather[0].main}
            </div>
        </div>
        <div class="main-1">
            <div class="temp">${Math.round(weather.main.temp - 273.15)}°C</div>
            <div class="real-feel">
                Real feel ${Math.round(weather.main.feels_like - 273.15)}°
            </div>
        </div>
        <div class="main-1 sunrise">
            <div style="display: flex; gap: 15px">
                <div>Sunrise: </div>
                <div>${suns.sunrise}</div>
            </div>
            <div style="display: flex; gap: 15px">
                <div>Sunset: </div>
                <div>${suns.sunset}</div>
            </div>
            <div style="display: flex; gap: 15px">
                <div>Duration: </div>
                <div>${suns.duration} hr</div>
            </div>

        </div>
    `
}


function getSunrise(rise, set, timezone) {
    let SunriseSunsetDur = {
        'sunrise': '',
        'sunset': '',
        'duration': '',
    }
    let sunrise = new Date((rise * 1000) + (timezone * 1000))
    let sunset = new Date((set * 1000) + (timezone * 1000))
    let duration = new Date(sunset.getTime() - sunrise.getTime())

    SunriseSunsetDur.duration = `${duration.getUTCHours() > 10 ? duration.getUTCHours() : '0' + duration.getUTCHours()}:${duration.getUTCMinutes() > 10 ? duration.getUTCMinutes() : '0' + duration.getUTCMinutes()}`

    if (sunrise.getUTCHours() > 12) {
        SunriseSunsetDur.sunrise = `${(sunrise.getUTCHours() - 12) > 10 ? (sunrise.getUTCHours() - 12) : '0' + (sunrise.getUTCHours() - 12)}:${sunrise.getUTCMinutes() > 10 ? sunrise.getUTCMinutes() : '0' + sunrise.getUTCMinutes()} PM`
    } else {
        SunriseSunsetDur.sunrise = `${sunrise.getUTCHours() > 10 ? sunrise.getUTCHours() : '0' + sunrise.getUTCHours()}:${sunrise.getUTCMinutes() > 10 ? sunrise.getUTCMinutes() : '0' + sunrise.getUTCMinutes()} AM`
    }

    if (sunset.getUTCHours() > 12) {
        SunriseSunsetDur.sunset = `${(sunset.getUTCHours() - 12) > 10 ? (sunset.getUTCHours() - 12) : '0' + (sunset.getUTCHours() - 12)}:${sunset.getUTCMinutes() > 10 ? sunset.getUTCMinutes() : '0' + sunset.getUTCMinutes()} PM`
    } else {
        SunriseSunsetDur.sunset = `${sunset.getUTCHours() > 10 ? sunset.getUTCHours() : '0' + sunset.getUTCHours()}:${sunset.getUTCMinutes() > 10 ? sunset.getUTCMinutes() : '0' + sunset.getUTCMinutes()} AM`
    }

    return SunriseSunsetDur
}


function weatherHoursComponent(weather) {
    return `
        <div class="block-1-info">
            <div class="wea-1 item">${weather.dt_txt}</div>
            <div class="wea-2 item">
                <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
            </div>
            <div class="wea-3 item">${weather.weather[0].main}</div>
            <div class="wea-4 item">${Math.round(weather.main.temp)}°</div>
            <div class="wea-5 item">${Math.round(weather.main.feels_like)}°</div>
            <div class="wea-6 item">
                <div>${Math.round((weather.wind.speed * 3600) / 1000)}</div>
                <div>ESE</div>
            </div>
        </div>
    `
}


function weatherHour(sec) {
    const weatherHours = {
        date: '',
        hour: ''
    }

    const h8 = 8 * 60 * 60 * 1000
    let date = new Date((sec.dt * 1000) + h8 + (timezone * 1000))

    weatherHours.date = date.getDate()
    if (date.getHours() > 12) {
        weatherHours.hour = `${date.getHours() - 12}pm`
    } else {
        weatherHours.hour = `${date.getHours()}am`
    }

    return weatherHours
}





function weatherFifeDays() {
    first_page.classList.add('first-page')
    second_page.classList.remove('second-page')
    today.classList.remove('today')
    fife_days.classList.add('fife-days')
    fetch(`${API_URL}data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(response => {
            // console.log(response)
            day1 = response.list.slice(0, 8)
            day2temp = midlTemp(day1)

            day2 = response.list.slice(8, 16)
            day2temp = midlTemp(day2)

            day3 = response.list.slice(16, 24)
            day3temp = midlTemp(day3)

            day4 = response.list.slice(24, 32)
            day4temp = midlTemp(day4)

            day5 = response.list.slice(32, 40)
            day5temp = midlTemp(day5)


            // console.log(dayComponent(day1[0]))
        })
}

function midlTemp(day) {
    temp = 0
    for (let i=0; i <day.length; i++) {
        temp += day[i].main.temp
    }

    return Math.round((temp / day.length))
}


function dayComponent(day) {
    day_data = new Date((day.dt * 1000) + (timezone * 1000) + (8 * 60 * 60 * 1000))
    city_date = new Date(city)
    console.log(city_date)


    return `
        <div class="day-f">
            <div style="font-weight: 600; color: #009595; font-size: 30px">WEDNESDAY</div>
            <div>JUN 30</div>
            <div>
                <img src="https://openweathermap.org/img/w/01n.png" alt="">
            </div>
            <div style="color: black; font-size: 45px">25°</div>
            <div>Clear, Warm</div>
        </div>
    `
}
weatherFifeDays()
weatherToday()
