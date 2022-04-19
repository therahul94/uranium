const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const midGloble = function(req, res, next){
    const moment = require('moment')
    console.log(moment().format('YYYY-MM-DD hh:mm:ss') +" , "+ req.socket.remoteAddress + " , " + req.path)
}
app.use(midGloble)

mongoose.connect("mongodb+srv://rahul94:efBR8Rc1hAQRsnZM@cluster0.ax9zh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
