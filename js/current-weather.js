// import weather from '../data/current-weather.js'
import {formatDate, formatTemp, formatTempMax,formatTempMin, formatWindSpeed, formatHumidity} from './utils/format-data.js'
import {weatherConditionCodes} from './constants.js'
import {getLatLon} from './geolocation.js'
import {getCurrentWeather} from './services/weather.js'

// weatherConditionCodes[]


function setCurrentCity($e, city){
    $e.textContent = city

}



function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatDate(date)
    
    $el.textContent = formattedDate
}


function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)

}

function solarStatus( sunsetTime, sunriseTime) {
    const currentHours = new  Date().getHours 
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()

    if(currentHours > sunsetHours || currentHours < sunriseHours){

        return 'nigtht'
    }


    return 'morning'
}

function setBackground($el, conditionCode ,solarStatus){
    const weatherType = weatherConditionCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    


    true ? '@2x' : ''
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function showCurrentWeather($app, $loader){
    $app.hidden = false 
    $loader.hidden = true
}


function setCurrentTempMax($el, tempMax) {
    $el.textContent = formatTempMax(tempMax)
}

function setCurrentTempMin($el, tempMin) {
    $el.textContent = formatTempMin(tempMin)
}

function setCurrentWindSpeed($el, windSpeed) {
    $el.textContent = formatWindSpeed( windSpeed)
}

function setCurrentHumidity($el,humidity) {
    $el.textContent = formatHumidity( humidity)
}


//pARECIDO A LOS EVENTlISTENER(selectores)
function configCurrentWeather(weather){
    const $app = document.querySelector('#app') 
    const $loading = document.querySelector('#loading') 

//louder
showCurrentWeather($app, $loading)
//Date
const $currentWeatherDate = document.querySelector("#current-weather-date")
setCurrentDate($currentWeatherDate)
//city
const $currentWeatherCity = document.querySelector('#current-weather-city')
const city = weather.name
setCurrentCity($currentWeatherCity, city)
//temp
const $currentWeathertemp = document.querySelector('#current-weather-temp')
const temp = weather.main.temp
setCurrentTemp($currentWeathertemp, temp)

const $currentWeathertempMax = document.querySelector('#temp-max')
const tempMax = weather.main.temp_max
setCurrentTempMax($currentWeathertempMax, tempMax)

const $currentWeatherWindSpeed = document.querySelector('#wind')
const windSpeed = weather.wind.speed
setCurrentWindSpeed($currentWeatherWindSpeed, windSpeed )

const $currentWeathertempMin = document.querySelector('#temp-min')
const tempMin = weather.main.temp_min
setCurrentTempMin($currentWeathertempMin, tempMin )

const $currentWeatherHumidity = document.querySelector('#humidity')
const humidity = weather.main.humidity
setCurrentHumidity($currentWeatherHumidity, humidity )


//background
const sunriseTime = new Date( weather.sys.sunrise * 1000)
const sunsetTime = new Date (weather.sys.sunset * 1000)

const conditionCode = String(weather.weather[0].id).charAt(0)
setBackground($app,conditionCode , solarStatus(sunriseTime,  sunsetTime))

}
//crear lo selectores o  variables
export default async function currentWeather() {
    //geo // api -weather // config
    // console.log('Esto pasa antes de getCurrentPosition')
    const {lat,lon,temp_max,temp_min,humidity,speed,isError} = await getLatLon()
    if(isError) return console.log('Ah ocurrido un error ubicandote')
    // console.log(lat, lon)
   
   
    //  getCurrentPosition()
    //  .then((data)=>{
    //     console.log('hemos triunfado', data)
       
    //  })
    //  .catch((message)=> {
    //     console.log(message)
    //  })
     
    //  console.log('Esto pasa despues de getCurrentPosition')

    // const {temp_min,temp_max} = await getMinMaxHumid()
    // if(isError) return console.log('Ah ocurrido un error ubicandote')
    
    const {isError: currentWeatherError, data: weather} = await getCurrentWeather(lat, lon, temp_min,temp_max,humidity,speed )
    if(currentWeatherError) return console.log('oh a ocurrido un error trayendo los datos del clima')
    configCurrentWeather(weather)
    // console.log(weather)
    
}