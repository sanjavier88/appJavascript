

const defaultDateOpctions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',

}

export function formatDate(date, options = defaultDateOpctions) {
    return  new Intl.DateTimeFormat('es', options).format(date)
}

export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

export function formatTempMax(value) {
    return `Max: ${Math.floor(value)}°`
}

export function formatTempMin(value) {
    return `Min: ${Math.floor(value)}°`
}

export function  formatHumidity(value) {
    return `Humedad: ${value}%`
}

export function formatWindSpeed(value) {
    return `Viento: ${Math.floor(value)}km-h`
}

export function formatWeeklist(rawData) {
    
    const weekList = []
    let dayLsit = []

    rawData.forEach((item, index)=> {
        dayLsit.push(item)
        if((index + 1) % 8 === 0){
            weekList.push(dayLsit)
            dayLsit = []
        }
    })
    return weekList
}