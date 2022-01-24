const RuleModel = require("../models/RuleModel")
const { setMachineState, getValue } = require("../services/MachineService")
const RuleService = require("../services/RuleService")
const { sleep, getTimeOut, getWorkTime, formatState, matchCondition } = require("./Extension")

class RuleListener {
    keysRef = {}
    ruleVersion = {}

    async start() {
        const rules = await RuleService.getAll()
        const self = this
        // rules.slice(0,1).forEach(function(rule) {
        //     self.listen(rule)
        // })

        // auto update listen rule when collection changes
        const watchRule = RuleModel.watch()
        watchRule.on("change", (change) => {
            console.log('rule just changes')
            console.log(change)
            console.log('=============')
            const _id = change.documentKey._id
            const newRule = RuleService.getRuleByID(_id)
            
            if (_id in self.ruleVersion) {
                console.log('xxxx')
                self.ruleVersion[_id] += 1
                rule._version += 1
            } else {
                console.log('new')
                self.ruleVersion[_id] = 1
                rule._version = 1
            }

            this.listen(newRule)
            
        })
    }
    
    async listen(rule) {
        if (!rule.state) return
        console.log('----------')
        console.log(rule)
        // listen time
        // set time out to check for or sleep
        const timeOut = getTimeOut(rule.start_at, rule.end_at)
        console.log('sleep ' + timeOut/1000 + ' seconds')
        await sleep(timeOut)

        const key = rule._id

        // check for update, if yes, exist
        if (rule.__version < this.ruleVersion[key]) {
            console.log('this rule has been changed, existing...')
            return
        }

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
                        this._setMachineState(rule, machine)
                    }
                }, console.error)
            }
        } else { // start
            // set machine state immediately
            this._setMachineState(rule, machine)
        }
    }

    async _setMachineState(rule, machine) {
        let currentMachineState = await getValue(`${machine._id}`)

        while (getWorkTime(rule.end_at)) {
            // check for update, if yes, exist return

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
        // start new listen trip
        this.listen(rule)
    }

}

module.exports = RuleListener
