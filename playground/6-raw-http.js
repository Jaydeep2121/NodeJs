const https = require('https')
const url = 'https://api.weatherapi.com/v1/forecast.json?key=289a1d3a72f149409d551338221403&q=surat&days=1&aqi=no&alerts=no'

const request = https.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()