const { setMachineState, getValue } = require("../services/MachineService")
const RuleService = require("../services/RuleService")
const { sleep, getTimeOut, getWorkTime, formatState } = require("./Extension")

class RuleListener {
    keysRef = {}

    async start() {
        const rules = await RuleService.getAll()
        const self = this
        rules.slice(0,1).forEach(function(rule) {
            self.listen(rule)
        })

        // auto update listen rule when collection changes
    }
    
    async listen(rule) {
        console.log('----------')
        console.log(rule)
        // listen time
        // set time out to check for or sleep
        const timeOut = getTimeOut(rule.start_at, rule.end_at)
        console.log('sleep ' + timeOut/1000 + ' seconds')
        await sleep(timeOut)

        const key = rule._id
        const sensor = rule.sensor
        const machine = rule.machine

        // listen if sensor is specified
        if (rule.threshold) {
            console.log(sensor._id)
            const currentSensorValue = await realtimeDatabase.getDataByKey(`${sensor._id}`)
            console.log('currentSensorValue', currentSensorValue)

            const ref = await realtimeDatabase.ref(`${sensor._id}`)
            this.keysRef[key] = ref

            // check key exist
            if (ref) {
                console.log(sensor._id + ' exist')
            }
        } else { // start
            // set machine state immediately
            await this._setMachineState(rule, machine)
        }
        
        //     ref.on("value", (snapshot) => {
        //         console.log(snapshot.val())
    
        //         if (Extension.isTime(rule.time) && Extension.isValidThreshold(rule.thresholdDown, rule.thresholdUp)) {
        //             console.log("set " + rule.machine + " to " + rule.targetValue)
    
        //             // how to disable with duration
        //         }
    
        //     }, this.logError)
    }

    async _setMachineState(rule, machine) {
        let currentMachineState = await getValue(`${machine._id}`)

        while (getWorkTime(rule.end_at)) {
            if (formatState(currentMachineState) === formatState(rule.target_value)) {
                break
            }

            setMachineState(`${machine._id}`, rule.target_value)
            await sleep(5*1000)
            currentMachineState = await getValue(`${machine._id}`)
        }
    }

}

module.exports = RuleListener
