const firebaseAdmin = require("firebase-admin");
const firebaseConfig = require("../../firebaseConfig");
const serviceAccount = require("../../serviceAccountKey.json")
const Extension = require("./Extension")

class FireBaseDatabase {
    firebaseDatabase = undefined;

    start() {
        // config firebaseDatabase
        this.firebaseDatabase = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: firebaseConfig.databaseURL //"https://smartfarm-7bf74-default-rtdb.asia-southeast1.firebasedatabase.app"
        }).database()
    }

    async getDataByKey(key) {
        const ref = this.firebaseDatabase.ref(key)
        const data = await ref.once("value")

        return data._delegate._node.value_
    }

    ref(key) {
        try {
            return this.firebaseDatabase.ref(key)
        } catch (err) {
            return null
        }
    }
}

module.exports = FireBaseDatabase