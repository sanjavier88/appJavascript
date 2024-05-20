

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