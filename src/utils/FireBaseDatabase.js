const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("../../firebaseConfig");
const serviceAccount = require("../../serviceAccountKey.json")
const Extension = require("./Extension")

class FireBaseDatabase {
    realtimeDatabase = undefined;

    start() {
        // config realtimeDatabase
        this.realtimeDatabase = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: firebaseConfig.databaseURL //"https://smartfarm-7bf74-default-rtdb.asia-southeast1.firebasedatabase.app"
        }).database()
    }

    async getDataByKey(key) {
        const ref = this.realtimeDatabase.ref(key)
        //     ref.on("value", (snapshot) => {
        //         console.log(snapshot.val())
    
        //         if (Extension.isTime(rule.time) && Extension.isValidThreshold(rule.thresholdDown, rule.thresholdUp)) {
        //             console.log("set " + rule.machine + " to " + rule.targetValue)
    
        //             // how to disable with duration
        //         }
    
        //     }, this.logError)
        const data = await ref.once("value")

        return data._delegate._node.value_
    }

    logValue(snapshot) {
        console.info(snapshot.val())
    }

    logError(error) {
        console.error("The read failed: " + error.name)
    }
}

module.exports = FireBaseDatabase