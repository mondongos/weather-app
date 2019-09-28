export function fetchWeather (city) {
    const endpoint = window.encodeURI('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=c048dcbea9c9c0aaa8259ed5de4303a6')
    console.log(endpoint)
    return fetch(endpoint) 
    .then((res) => res.json())
    .then((data) => {
        if(!data) {
            throw new Error(data.message)
        }
        return data
    })
}