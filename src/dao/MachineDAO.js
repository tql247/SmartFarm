const mongoose = require('mongoose')
const MachineModel = require('../models/MachineModel')
const Connection = require("./_Connection")

class MachineDao {
    async getAll() {
        try {
            await Connection.connect()

            return await MachineModel
                .find({ deleted_at: null })
                .populate('located', "name address owner", { deleted_at: null })
                .populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async getByOwner(owner_id) {
        try {
            await Connection.connect()

            return await MachineModel.find({
                deleted_at: null,
                owner: owner_id
            }).populate('owner', "full_name email").exec()
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async createMachine(machine) {
        try {
            await Connection.connect()
            return await MachineModel.create({
                name: machine.name,
                located: machine.located,
                owner: machine.owner,
            })
        } catch (e) {
            throw e
        } finally {
            await Connection.close()
        }
    }

    async updateMachine(machine) {
        try {
            await Connection.connect()
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
            await Connection.close()
        }
    }

    async deleteMachine(_id) {
        try {
            await Connection.connect()

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
            await Connection.close()
        }
    }
}

module.exports = new MachineDao()