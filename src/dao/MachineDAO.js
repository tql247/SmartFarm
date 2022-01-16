const mongoose = require('mongoose')
const MachineModel = require('../models/MachineModel')
// const Connection = require("../utils/_Connection")

class MachineDao {
    async getAll() {
        return await MachineModel
            .find({ deleted_at: null })
            .populate('located', "name address owner", { deleted_at: null })
            .populate('owner', "full_name email").exec()
    }

    async getByOwner(owner_id) {
        return await MachineModel
            .find({
                deleted_at: null,
                owner: owner_id
            })
            .populate('owner', "full_name email")
            .exec()
    }

    async createMachine(machine) {
        return await MachineModel
            .create({
                name: machine.name,
                located: machine.located,
                owner: machine.owner,
            })
    }

    async updateMachine(machine) {
        return await MachineModel
            .findByIdAndUpdate(
                machine._id,
                {
                    name: machine.name,
                    located: machine.located,
                    owner: machine.owner,
                },
                { new: true }
            )
    }

    async deleteMachine(_id) {
        return await MachineModel
            .findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
    }
}

module.exports = new MachineDao()