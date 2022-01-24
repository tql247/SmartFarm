const { setMachineState, getValue } = require("../services/MachineService")
const RuleService = require("../services/RuleService")
const { sleep, getTimeOut, getWorkTime, formatState, matchCondition } = require("./Extension")

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

            const ref = await realtimeDatabase.ref(`${sensor._id}`)
            this.keysRef[key] = ref

            // check key exist
            if (ref) {
                console.log(sensor._id + ' exist')
                ref.on("value", (snapshot) => {
                    const currentSensorValue = snapshot.val()
                    console.log('currentSensorValue', currentSensorValue)

                    if (matchCondition(currentSensorValue, rule.expr, rule.threshold)) {
                        console.log('do it')
                        ref.off("value")
                    }
                }, console.error)
            }
        } else { // start
            // set machine state immediately
            await this._setMachineState(rule, machine)
        }
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

        await sleep(rule.duration*1000)
        console.log('turn off')
        // reset previous state
        setMachineState(`${machine._id}`, currentMachineState)
    }

}

module.exports = RuleListener
