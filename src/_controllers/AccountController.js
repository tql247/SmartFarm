const { hashPassword } = require("../utils/Coder");
const Extension = require("../utils/Extension");
const AccountService = require("../_services/AccountService");

class AccountController {
    async test(req, res, next) {
        try {
            res.status(201).json(await AccountService.test());
        } catch (error) {
            next(error);
        }
    }

    async createAccount(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const acc = {
                email: req.body.email,
                password: await hashPassword(req.body.password),
                avatar: req["file"].filename,
                full_name: req.body.full_name,
                phone: req.body.phone,
                address: req.body.address,
                role: req.body.role
            };

            const accInserted = await AccountService.createAccount(acc);

            res.status(200).json(accInserted) 
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const accounts = await AccountService.getAll();

            res.status(200).json(accounts) 
        } catch (error) {

        }
    }

    async Login(req, res, next) {
        try {
            res.status(201).json(await AccountService.test());
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccountController();