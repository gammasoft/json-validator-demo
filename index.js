var express = require('express');
var bodyParser = require('body-parser');
var jsv = require('json-validator');
var app = express();
var HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json({
    limit: '1024kb'
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res, next) {
    var schema = JSON.parse(req.body.schema);
    var payload = JSON.parse(req.body.payload);

    jsv.validate(payload, schema, function(err, messages) {
        if(err) {
            console.log(err);
            return next(err);
        }

        res.json(messages);
    });
});

app.listen(HTTP_PORT);