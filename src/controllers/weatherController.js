let axios = require('axios')

// get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId>  (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)

let getTempOfCities = async function (req, res) {
    try {
        let q = req.query.cityName
        let appid = req.query.id

        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }

        let result = await axios(options)
        let data = result.data
        let temp = data.main.temp
        res.status(200).send({ msg: { cityName: data.name, temp: temp }, status: true })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

let tempWiseSort = async function (req, res) {

    try {
        let citiesArr = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let citiesWithTempArr = []

        for (let i = 0; i < citiesArr.length; i++) {
            let q = citiesArr[i]
            let appid = req.query.id

            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
            }

            let result = await axios(options)
            let data = result.data
            let temp = data.main.temp

            citiesWithTempArr.push({ city: data.name, temp: temp })

        }

        function compare(a, b) {
            if (a.temp > b.temp) { return 1 }
            if (a.temp < b.temp) { return -1 }
            return 0
        }
        citiesWithTempArr.sort(compare)
        res.status(200).send({ status: true, msg: citiesWithTempArr })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.getTempOfCities = getTempOfCities
module.exports.tempWiseSort = tempWiseSort
