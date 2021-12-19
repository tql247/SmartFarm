const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Các hàm hỗ trợ
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

    getCookieData(cookie) {
        // Kiểm tra cookie có null hay không
        if (!cookie) {
            const err = new Error()
            err.status = 400
            err.name = "Bad request"
            err.message = "Invalid access to specific url"
            throw err
        }

        // Kiểm tra cookie có giá trị json webtoken không        
        if (!cookie["jwt"]) {
            const err = new Error()
            err.name = 'Unauthorized'
            err.status = 401
            throw err
        }

        // Lấy token từ cookie
        const token = cookie["jwt"]
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

    isValidThreshold(down, up, currentValue) {
        return down <= currentValue && up <= currentValue
    }

    isTime(timeString) {
        return true
    }
}

module.exports = new Extension()