const cookieSession = require("cookie-session")
const RuleModel = require("../models/RuleModel")
const { setMachineState, getValue } = require("../services/MachineService")
const RuleService = require("../services/RuleService")
const NotificationService = require("../services/NotificationService")
const { sleep, getTimeOut, getWorkTime, formatState, matchCondition } = require("./Extension")

class RuleListener {
    keysRef = {}
    ruleVersion = {}

    async start() {
        const rules = await RuleService.getAll()
        const self = this

        console.log('RuleListener logs...')

        rules.forEach(function (rule) {
            self.ruleVersion[rule._id] = 1
            rule._version = 1
            self.listen(rule)
        })

        // auto update listen rule when collection changes
        const watchRule = RuleModel.watch()
        watchRule.on("change", async (change) => {
            console.log('rule just changes')
            console.log(change)
            console.log('=============')
            const _id = change.documentKey._id
            const [newRule] = await RuleService.getRuleByID(_id)

            if (newRule !== undefined) {
                if (_id in self.ruleVersion) {
                    console.log('old')
                    self.ruleVersion[_id] += 1
                    newRule._version = self.ruleVersion[_id]
                } else {
                    console.log('new')
                    self.ruleVersion[_id] = 1
                    newRule._version = 1
                }
    
                console.log('ruleVersion', self.ruleVersion)
                console.log('newRule', newRule)
                console.log('newRule.state', newRule.state)
                self.listen(newRule)
            }
        })
    }

    async listen(rule) {
        console.log('----------', rule.state)
        if (!rule.state) return
        console.log('++++++++++')
        console.log(rule)
        // listen time
        // set time out to check for or sleep
        const timeOut = getTimeOut(rule.start_at, rule.end_at)
        console.log('sleep ' + timeOut / 1000 + ' seconds')
        await sleep(timeOut)

        const key = rule._id

        // check for update, if yes, exist
        if (rule._version < this.ruleVersion[key]) {
            console.log('this rule has been changed, existing...')
            return
        }

        const sensor = rule.sensor
        const machine = rule.machine

        // listen if sensor is specified
        if (rule.threshold) {
            const ref = await realtimeDatabase.ref(`${sensor._id}`)
            this.keysRef[key] = ref

            // check key exist
            if (ref) {
                console.log(sensor._id + ' exist')
                ref.on("value", (snapshot) => {
                    const currentSensorValue = snapshot.val()
                    console.log('currentSensorValue', currentSensorValue)
                    console.log('listening...')

                    if (matchCondition(currentSensorValue, rule.expr, rule.threshold)) {
                        console.log('do it')
                        ref.off("value")
                        this._setMachineState(rule, machine, sensor.name + ": " + currentSensorValue)
                    }
                }, console.error)
            }
        } else { // start
            // set machine state immediately
            this._setMachineState(rule, machine)
        }
    }

    async _setMachineState(rule, machine, sensorInfo=undefined) {
        const key = rule._id
        let initState = await getValue(`${machine._id}`)
        let currentMachineState = initState
        console.log('initState', initState)

        // G???i mqtt message 'b???t m??y l??n' m???i 3 gi??y cho ?????n khi m??y ???????c b???t
        while (getWorkTime(rule.end_at)) {
            // check for update, if yes, exist
            if (rule._version < this.ruleVersion[key]) {
                console.log('this rule has been changed, existing...')
                return
            }

            // ki???m tra m??y ???????c b???t/t???t hay ch??a, n???u r???i th?? tho??t v??ng l???p
            if (formatState(currentMachineState) === formatState(rule.target_value)) {
                // Th??m th??ng b??o
                NotificationService.createNotification({
                    subject: rule.name,
                    detail: (rule.machine.name + ' ' + rule.target_value) + (sensorInfo===undefined?"":", " + sensorInfo),
                    owner: rule.owner._id,
                })
                break
            }

            console.log('turn ' + rule.target_value)
            setMachineState(`${machine._id}`, rule.target_value)
            // d???ng l???i 3 gi??y
            await sleep(3 * 1000)
            currentMachineState = await getValue(`${machine._id}`)
        }

        // check duration
        if (rule.duration > 0) {
            console.log(rule.duration, rule.duration * 60)
            console.log('sleep', rule.duration * 60, 'seconds')
            await sleep(rule.duration * 1000 * 60)
    
            if (rule._version < this.ruleVersion[key]) {
                console.log('this rule has been changed, existing...')
                return
            }
    
            console.log('turn back to', initState)
            // tr??? l???i state ban ?????u c???a m??y sau khi thay ?????i
            setMachineState(`${machine._id}`, initState)
            currentMachineState = await getValue(`${machine._id}`)

            while (formatState(currentMachineState) !== formatState(initState)) {
                if (rule._version < this.ruleVersion[key]) {
                    console.log('this rule has been changed, existing...')
                    return
                }

                console.log('turn back to', initState)
                setMachineState(`${machine._id}`, initState)
                currentMachineState = await getValue(`${machine._id}`)
                await sleep(3 * 1000)
            }

            console.log('turn back', initState)

            await sleep(1000 * 10)
        }
        
        // start new listen trip
        this.listen(rule)
    }

}

module.exports = RuleListener
