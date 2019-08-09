const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = `https://api.darksky.net/forecast/f0daac9578589e2cd4ded22ceff26533/${lon},${lat}?units=us`
    request({url: url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            const {temperature, precipProbability} = body.currently
            callback(undefined, {
                temperature: temperature,
                precipProbability: precipProbability,
                summary: body.daily.data[0].summary
                }
            )
        }
    })
}


module.exports = forecast