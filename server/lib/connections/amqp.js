var EventEmitter = require('events').EventEmitter;
var amqp = require('amqplib/callback_api');
var amqpEvents = new EventEmitter();

var jsonfile = require('jsonfile')
var configFile = __dirname + "/../../config/config.json"
var config = jsonfile.readFileSync(configFile)
require("../../config/logger")

module.exports = amqpEvents;

var amqpUrl = config.amqp.url;
amqp.connect(amqpUrl, function (err, conn) {
    if (!err) {
        genLog.log('Connected to AMQP')
        conn.createChannel(function (err1, ch) {
            if (!err1) {
                genLog.log('Channel Created');
                global.ch = ch;
                amqpEvents.emit('connect');
            } else {
                errLog.error('Error creating Channel :' + err1);
            }
        })
    } else {
        errLog.error('Error connecting to AMQP :' + err);
    }
})
