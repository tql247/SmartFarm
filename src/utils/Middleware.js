const multer = require("multer");
const { getCookieData } = require("./Extension");

// Hàm xử lý trung gian trước khi gọi Controller
class Middleware {
    // Xử lý file tải lên
    fileUpload(req, res, next) {
        try {
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'uploads')
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now())
                }
            });

            return multer({storage: storage});
        } catch (err) {
            next(err);
        }
    }

    // Xác thực người dùng
    authorize(req, res, next) {
        try {
            const data = getCookieData(req.cookies);

            // gán dữ liệu người dùng vào req
            // req.user_profile = await get_account_data(data._id);
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new Middleware();