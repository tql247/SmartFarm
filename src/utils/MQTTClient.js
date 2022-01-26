const mqtt = require("mqtt")
const hiveMQConfig = require("../../hiveMQConfig");

class MQTTClient {
    mqttClient = undefined

    start() {
        this.mqttClient = mqtt.connect(hiveMQConfig)
    }

    publish(_id, state) {
        if ((typeof state !== 'string')) state = JSON.stringify(state)
        this.mqttClient.publish(_id, state);
    }
}

module.exports = MQTTClient
