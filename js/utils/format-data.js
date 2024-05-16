

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