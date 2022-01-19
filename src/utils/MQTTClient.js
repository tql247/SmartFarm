const mqtt = require("mqtt")
const hiveMQConfig = require("../../hiveMQConfig");

class MQTTClient {
    mqttClient = undefined

    start() {
        this.mqttClient = mqtt.connect(hiveMQConfig)
    }

    publish(_id, state) {
        this.mqttClient.publish(_id, JSON.stringify(state));
    }
}

module.exports = MQTTClient
