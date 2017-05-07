var mqtt = require('mqtt')
var amqp = require('amqplib/callback_api')
var jsonfile = require('jsonfile')
require("./config/logger")
var configFile = __dirname + "/config/config.json"
var amqpConfigFile = __dirname + "/config/config.amqp.json"
var config = jsonfile.readFileSync(configFile)
var amqpConfig = jsonfile.readFileSync(amqpConfigFile)

var reqQueue = amqpConfig.queues.request
var reqCh;

var amqpConn = require("./lib/connections/amqp")

amqpConn.on('connect', function () {
    ch.assertQueue(reqQueue, { durable: true })
})

var mqtt = require('mqtt')
var client = mqtt.connect(config.mqtt.broker.url)

client.on('connect', function () {
    genLog.log("AMQP-MQTT binder Client Connected");
    client.subscribe(config.mqtt.echoTopic)
    genLog.log("AMQP-MQTT Subscribed:", config.mqtt.echoTopic)
})

client.on('message', function (topic, message, payload) {
    if(!ch) {
        return errLog.error("AMQP-MQTT Request Channel Failure");
    }
    payload.payload = payload.payload.toString()
    ch.sendToQueue(reqQueue, Buffer.from(JSON.stringify(payload), { persistent: true }))
})

client.on('reconnect', function () {
    errLog.error("AMQP-MQTT Client Reconnecting...");
})

