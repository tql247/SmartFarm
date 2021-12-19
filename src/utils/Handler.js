class Handler {
    // Trả lỗi khi không tìm thấy đường dẫn
    notFoundUrl(req, res, next) {
        // TODO: trả về 1 trang web
        return res.send('Not found url: ' + req.originalUrl)
    }

    // Xử lý các loại lỗi
    errorHandler(err, req, res, next) {
        console.error(Object.entries(err))

        // Xử lý lỗi token quá hạn
        if (err.name === "TokenExpiredError") {
            err.status = 401
            res.redirect('/user/login')
        }
    
        // Xử lý lỗi chưa xác thực người dùng
        if (err.name === "Unauthorized") {
            err.status = 401
            res.redirect('/user/login')
        }
    
        // Xử lý lỗi truy cập bị từ chối
        if (err.name === "Access Denies") {
            err.status = 401
            // xóa cookie khi truy cập nội dung không hợp lệ
            res.clearCookie('jwt') 
            res.redirect('/user/login')
        }
    
        // Xử lý không tìm thấy trang
        if (err.name === "Page not found") {
            err.status = 404
        }
    
        // Xử lý lỗi không xác định
        if (!err.status) err.status = 400
        return res.status(err.status).json({
            name: err.name,
            message: err.message
        })
    }
}

module.exports = new Handler()