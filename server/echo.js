var jsonfile = require("jsonfile")
var configFile = __dirname + "/config/config.json"
var amqpConfigFile = __dirname + "/config/config.amqp.json"
var config = jsonfile.readFileSync(configFile)
var amqpConfig = jsonfile.readFileSync(amqpConfigFile)
require("./config/logger")

var reqQueue = amqpConfig.queues.request
var amqpConn = require("./lib/connections/amqp")
var clientConn = false

amqpConn.on("connect", function () {
    ch.assertQueue(reqQueue, { durable: true })

    ch.prefetch(1)

    ch.consume(reqQueue, function (msg) {
        if (clientConn) {
            processMsg(msg, function (err) {
                if (err) {
                    errLog.error(err)
                }
                ch.ack(msg)
            })
        } else {
            setTimeout(function () {
                errLog.error('NACK_MSG');
                ch.nack(msg, false, true)
            }, 1000)
        }
    }, { noAck: false })
})

var mqtt = require('mqtt')
var client = mqtt.connect(config.mqtt.broker.url)

client.on('connect', function () {
    genLog.log("ECHO-MQTT Client Connected");
    clientConn = true
})
client.on('reconnect', function () {
    clientConn = false
})
client.on('close', function () {
    clientConn = false
})
client.on('error', function (err) {
    clientConn = false
})


function processMsg(msg, cb) {
    // var payload 
    var data = JSON.parse(msg.content.toString())
    var topic = data.topic
    var payload = data.payload

    if (topic.indexOf("$req") > -1) {
        var resTopic = topic.replace(/\$req/i, "$res")
        // testLog.log('Payload:', payload.toString());
        client.publish(resTopic, payload.toString())
        cb()
    } else {
        testLog.log("Response Topic not Available");
        cb("TOPIC_NOT_FOUND")
    }
}