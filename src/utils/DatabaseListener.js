const firebaseAdmin = require("firebase-admin")
const serviceAccount = require("../../serviceAccountKey.json")
const Extension = require("./Extension")

class DatabaseListener {
    realtimeDatabase = undefined;

    start() {
        // config realtimeDatabase
        this.realtimeDatabase = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: "https://smartfarm-7bf74-default-rtdb.asia-southeast1.firebasedatabase.app"
        }).database()

        // TODO: get rules by machine by user
        // TODO: 

        // start example
        const rules = [
            {
                name: "test",
                sensor: "humidity sensor",
                machine: "water pumps",
                time: {
                    "from": "09:00:00",
                    "to": "10:00:00"
                },
                thresholdUp: 8,
                thresholdDown: 6,
                targetValue: 1,
            }
        ]

        this.addListener(rules)
        // end example

    }

    addListener(rules) {
        rules.forEach(rule => {
            this.listenRule(rule)
        })
    }

    listenRule(rule) {
        // get senor in database
        const senor = {
            nameInDB: "test"
        }

        const ref = this.realtimeDatabase.ref(senor.nameInDB)

        ref.on("value", (snapshot) => {
            console.log()

            if (Extension.isTime(rule.time) && Extension.isValidThreshold(rule.thresholdDown, rule.thresholdUp)) {
                console.log("set " + rule.machine + " to " + rule.targetValue)

                // how to disable with duration
            }

        }, this.logError)

        // get sensor, machine, rule
        // reset event
    }

    logValue(snapshot) {
        console.info(snapshot.val())
    }

    logError(error) {
        console.error("The read failed: " + errorObject.name)
    }
}

module.exports = new DatabaseListener()