const mongoose = require('mongoose')
const MachineModel = require('../models/MachineModel')
const connect = require("./_connection")

class MachineDao {
    async getAll() {
        try {
            await connect()

            return await MachineModel
                .find({ deleted_at: null })
                .populate('located', "name address owner", { deleted_at: null })
                .populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async createMachine(machine) {
        try {
            await connect()
            return await MachineModel.create({
                name: machine.name,
                located: machine.located,
                owner: machine.owner,
            })
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async updateMachine(machine) {
        try {
            await connect()
            return await MachineModel.findByIdAndUpdate(
                machine._id,
                {
                    name: machine.name,
                    located: machine.located,
                    owner: machine.owner,
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }

    async deleteMachine(_id) {
        try {
            await connect()

            return await MachineModel.findByIdAndUpdate(
                _id,
                {
                    deleted_at: Date.now()
                },
                { new: true }
            )
        } catch (e) {
            throw e
        } finally {
            await mongoose.connection.close()
        }
    }
}

module.exports = new MachineDao()