import {getWeeklytWeather} from './services/weather.js'
import {getLatLon} from './geolocation.js'
import {formatWeeklist} from './utils/format-data.js'
import {createDom} from './utils/dom.js'
import { createPeriodTime} from './period-time.js'  


function tabPanelTemplate(id) {
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
    <div class="dayWeather" id="dayWeather-${id}">
      <ul style="color:white" class="dayWeather-list" id="dayWeather-list-${id}">
            Tab Panel${id}
        
      </ul>
    </div>
  </div>
    `
}

function createTabPanel(id) {
    const $panel = createDom(tabPanelTemplate(id))
    if($panel > 0){
        $panel.hidden = true
    }
    return $panel
}

function  configWeeklyWeather( weeklist) {
    const $container = document.querySelector('.weeklyWeather')
    weeklist.forEach((day, index)=> {
        const $panel = createTabPanel(index)
        $container.append($panel)
        day.forEach((weather, indexWeather)=>{
            $panel.append( createPeriodTime(weather))
        })
    })

}


export default async function weeklyWeather(){
    const {lat,lon, isError} = await getLatLon()
    if(isError) return console.log('Ah ocurrido un error ubicandote')
    const {isError: weeklyWeatherError, data: weather} = await getWeeklytWeather(lat, lon)
    if(weeklyWeatherError) return console.log('oh a ocurrido un error trayendo el pronostico  del clima')
    const weeklist = formatWeeklist(weather.list)
    configWeeklyWeather( weeklist)
}
