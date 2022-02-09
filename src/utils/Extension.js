const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

// Các hàm hỗ trợ cho các hàm khác, giúp thực hiện các thao tác
// Mà các thao tác này có thể dùng lại nhiều lần
class Extension {
    // Tạo ra object image với 2 thuộc tính là
    // contentType: loại dữ liệu (jpg,png,...)
    // data: hình ảnh lưu dưới dạng binary
    // từ imageFile: một object do thư viện multer trả về
    async makeImageObject(imageFile) {
        // kiểm tra đầu vào có hợp lệ hay không
        if (!imageFile) {
            throw new Error("imageFile is missing or server not handle")
        }
        if (!imageFile.mimetype || !imageFile.path) {
            throw new Error("imageFile mimetype or path is missing or server not handle")
        }

        // Đọc file
        const imageData = fs.readFileSync(imageFile.path)
        // Chuyển file sang base64
        const encodeImage = imageData.toString('base64')
        // Tạo image object
        const imageObject = {
            contentType: imageFile.mimetype,
            data: new Buffer.from(encodeImage, 'base64')
        }

        // Xoá image sau khi đã xử lý
        fs.unlinkSync(imageFile.path)

        return imageObject
    }

    // Lấy data từ jwt của cookie nằm trong req header
    // Kiểm tra key có hợp lệ
    getDataFromJWT(token) {
        // Kiểm tra có giá trị json webtoken không        
        if (!token) {
            const err = new Error()
            err.name = 'Unauthorized'
            err.status = 401
            throw err
        }

        // Xác thực token có phải của server tạo ra hay không
        // và lấy dữ liệu được ẩn trong đó
        const data = jwt.verify(token, process.env.JWT_KEY)

        // Kiểm tra data
        if (!data) {
            const err = new Error('Unauthorized')
            err.status = 401
            return next(err)
        }

        return data
    }

    // hash password một chiều, nghĩa là không thể decode lại mật khẩu đã hash
    // thành mật khẩu ban đầu, chỉ có thể kiểm tra password có khớp hay không
    async hashPassword(password) {
        return await bcrypt.hash(password, 10)
    }

    // kiểm tra password nhập vào có khớp với password lưu trong db hay không
    // password: là mật khẩu người dùng nhập vd: 123456, password, 123
    // hashString: là mật khẩu đã được hash từ trước 
    // vd: $2y$10$PN7Vd0XL2WIzt5h2wHUxQ.AuiMLf5StlEELtGHvbcWhH06jJ70M0
    async checkPassword(password, hashString) {
        return await bcrypt.compare(password, hashString)
    }

    async signToken(_id) {
        return jwt.sign(
            {
                _id: _id
            },
            process.env.JWT_KEY,
            {
                expiresIn: '365h',
            }
        );
    }
    // Vì bản thân javascript và nodejs không hỗ trợ hàm sleep
    // nên tự định nghĩa phục vụ cho một số trường hợp đặc biệt
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Trả về thời gian ghỉ cho hàm,
    // Nếu thời gian hiện tại chưa tới lúc bắt đầu thì nghỉ
    // Nếu thời gian hiện tại tại đã qua thời gian kết thủc thì nghỉ
    // Còn lại là 0
    getTimeOut(startTimeString, endTimeString) {
        const currentTime = moment()
        const startTime = moment(startTimeString, "H:mm")
        const endTime = moment(endTimeString, "H:mm")

        if (startTime.diff(currentTime) > 0) {
            return startTime.diff(currentTime)
        } else if (endTime.diff(currentTime) < 0) {
            // 1000 miliseconds 60 seconds 60 minutes 24 hours
            return startTime.diff(currentTime) + 1000*60*60*24 
        }

        return 0
    }

    formatState(state) {
        if (typeof state !== 'string') {
            state = JSON.stringify(state)
        }

        state = state.toLowerCase()

        if (state === "false" || state === "off") return "off"
        if (state === "true" || state === "on") return "on"

        return ""
    }

    getWorkTime(endTimeString) {
        const currentTime = moment()
        const endTime = moment(endTimeString, "H:mm")

        return endTime.diff(currentTime)
    }

    matchCondition(sensorValue, expr, threshold) {
        return eval(`${sensorValue} ${expr} ${threshold}`)
    }

    isSameObject(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    }
}

module.exports = new Extension()