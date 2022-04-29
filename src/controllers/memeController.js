const axios = require('axios')


// 1. Get all the memes at Postman (https://api.imgflip.com/get_memes)
// 2. Pick a memeId you want (Eg 129242436) for the POST request
// 3. Create a Post request (https://api.imgflip.com/caption_image) with only query params. Following are the params (copy username and password exactly as given below):
// template_id <meme_id>
// text0 <text you want as a caption>
// text1 <optional>
// username chewie12345
// password meme@123

// 4. Return a response with a body like this
// "data": {
//         "url": "https://i.imgflip.com/5mvxax.jpg",
//         "page_url": "https://imgflip.com/i/5mvxax"
//     }

const getAllMemes = async function (req, res) {

    try {
        let options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }

        let result = await axios(options)
        let data = result.data

        res.status(200).send({ status: true, msg: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

const createMemes = async function (req, res) {
    try {
        let template_id = req.query.memeId
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.name
        let password = req.query.pswd
        

        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result = await axios(options)
        let data = result.data.data
        res.status(200).send({ data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.getAllMemes = getAllMemes
module.exports.createMemes = createMemes
