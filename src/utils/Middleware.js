const multer = require("multer")
const { v4: uuid } = require('uuid')
const path = require("path")
const { getDataFromJWT } = require("./Extension")

// Hàm xử lý trung gian trước khi gọi Controller
class Middleware {
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, uuid() + path.extname(file.originalname))
        }
    })

    // Xử lý file tải lên
    fileUpload = multer({ storage: this.storage })

    // Xác thực người dùng
    authorize(req, res, next) {
        try {
            console.log(req.originalUrl)
            if (req.originalUrl !== '/account/login') {
                const token = (req.headers.authorization || req.cookies).replace('Bearer ', '')
                const data = getDataFromJWT(token)
                console.log(data)

                // gán dữ liệu người dùng vào req
                req.user = data
            }
            return next()
        } catch (error) {
            return next(error)
        }
    }

    test(req, res, next) {
        try {
            console.log('middleware')
            next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new Middleware()