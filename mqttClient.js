const mqtt = require('mqtt')

const hiveMQTTConfig = {
    host: '6bf60994fabd4102b9c7f258fcc63801.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'tql247',
    password: 'CkJ75*7?'
}

//initialize the MQTT client
global.mqttClient = mqtt.connect(hiveMQTTConfig);

// //setup the callbacks
// client.on('connect', function () {
//     console.log('Connected');
// });

// client.on('error', function (error) {
//     console.log(error);
// });

// client.on('message', function (topic, message) {
//     //Called each time a message is received
//     console.log('Received message:', topic, message.toString());
// });

// // subscribe to topic 'my/test/topic'
// client.subscribe('my/test/topic');

// // publish message 'Hello' to topic 'my/test/topic'
// client.publish('my/test/topic', 'Hello');