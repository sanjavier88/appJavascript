function geolocationSupport() {
//    if('geolocation' in navigation){
//     return true
//    }

//    return false
   return 'geolocation' in navigator
}

const defaultOpctions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000,

}

export function getCurrentPosition(options =  defaultOpctions) {
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalizacion en tu navegador')

        return new Promise((resolve, reject)=>{

            navigator.geolocation.getCurrentPosition((position)=>{
                
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                resolve(position)
                 
                // console.log(lat, lon)
                // console.log('esto es getCurrentPosition')
                
            },()=> {
                reject('No hemos podido obtener tu ubicacion')
            }, options)
           
        })
}

export async function getLatLon(options = defaultOpctions) {

    try{
        const {coords: {latitude: lat, longitude: lon}} = await getCurrentPosition(options)
        return {lat, lon, isError: false}

    }catch{
        return {isError: true, lat: null, lon:null}

    }

}

// export async function getMinMaxHumid(options = defaultOpctions) {

//     try{
//         const {main: { tempMin: temp_min,tempMax: temp_max, humidity: humidity}} = await getCurrentPosition(options)
//         return {temp_min, temp_max, humidity}

//     }catch{
//         return {isError: true, temp_min: null, temp_max:null, humidity: null}

//     }

// }

// export async function getWind(options = defaultOpctions) {

//     try{
//         const {wind: { velodidad: speed}} = await getCurrentPosition(options)
//         return {speed}

//     }catch{
//         return {isError: true, speed:null}

//     }

// }