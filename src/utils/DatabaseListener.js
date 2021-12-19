const firebaseAdmin = require('firebase-admin');
const serviceAccount = require("../../serviceAccountKey.json");


class DatabaseListener {
    start() {
        // config realtimeDatabase
        const realtimeDatabase = firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            databaseURL: "https://smartfarm-7bf74-default-rtdb.asia-southeast1.firebasedatabase.app"
        }).database();

        // TODO: get list sensor base on db name
        // TODO: 

        const ref = realtimeDatabase.ref("test");

        ref.on('value', this.logValue, this.logError);
    }

    addListener() {
        // get sensor, machine, rule
        // reset event
    }

    logValue (snapshot) {
        console.info(snapshot.val());
        //   .then(val => Object.keys(val).map(key => val[key]))
    }

    logError (error) {
        console.error('The read failed: ' + errorObject.name);
    }
}

module.exports = new DatabaseListener();