const Extension = require("../utils/Extension")
const AccountService = require("../services/AccountService")

class AccountController {
    // Tạo tài khoản mới
    async createAccount(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const acc = {
                email: req.body.email,
                password: await Extension.hashPassword(req.body.password),
                // avatar: req["file"].filename,
                full_name: req.body.full_name,
                phone: req.body.phone,
                address: req.body.address || "Not set yet",
                role: req.body.role || "user"
            }

            const accInserted = await AccountService.createAccount(acc)

            res.status(200).json(accInserted)
        } catch (error) {
            next(error)
        }
    }

    // Cập nhật tài khoản khoản
    async updateAccount(req, res, next) {
        try {
            // Chuẩn bị dữ liệu để thêm vào database
            const acc = {
                email: req.body.email,
                full_name: req.body.full_name,
                phone: req.body.phone,
                address: req.body.address,
                role: req.body.role || "user",
                _id: req.body._id,
            }

            if (req.body.old_password) {
                if (!await AccountService.login(email, req.body.old_password)) {
                    const err = new Error("old password is incorrect")
                    err.status = 401
                    throw err
                }
            }

            if (req.body.password) {
                acc.password = await Extension.hashPassword(req.body.password)
            }

            const accInserted = await AccountService.updateAccount(acc)

            res.status(200).json(accInserted)
        } catch (error) {
            next(error)
        }
    }

    // Lấy dữ liệu của toàn bộ account có trong database
    async getAll(req, res, next) {
        try {
            const accounts = await AccountService.getAll()
            return res.render('_layout', { page: 'account', accounts: accounts })
        } catch (error) {
            next(error)
        }
    }

    // Lấy dữ liệu của toàn bộ account có trong database
    async getByID(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const [account] = await AccountService.getByID(_id)

            res.status(200).json(account)
        } catch (error) {
            next(error)
        }
    }

    // Xoá dữ liệu
    async deleteAccount(req, res, next) {
        try {
            const _id = req.params._id || req.query._id

            if (!_id) {
                const err = new Error("'_id' was not provided!")
                err.name = "Bad request"
                next(err)
            }

            const accounts = await AccountService.delete(_id)

            res.status(200).json(accounts)
        } catch (error) {
            next(error)
        }
    }

    // Trả về view login
    async login(req, res, next) {
        try {
            return res.render('_layout', { page: 'login' })
        } catch (error) {
            next(error)
        }
    }

    async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const token = await AccountService.login(email, password)
            if (!token) {
                const err = new Error("Incorrect email or password");
                err.status = 401
                err.name = "Unauthorized"
                throw err
            }

            return res.status(200).json(token)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccountController()