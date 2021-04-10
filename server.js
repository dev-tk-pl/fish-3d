const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.render("index");
});

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});