class Handler {
    // Trả lỗi khi không tìm thấy đường dẫn
    notFoundUrl(req, res, next) {
        // TODO: trả về 1 trang web
        // return res.send('Not found url: ' + req.originalUrl)
        return res.status(404).json({title: '404', content: 'Not found url: ' + req.originalUrl})
    }

    // Xử lý các loại lỗi
    errorHandler(err, req, res, next) {
        console.error(err)
        console.error(Object.entries(err))

        // Xử lý lỗi token quá hạn
        if (err.name === "TokenExpiredError") {
            err.status = 401
        }
    
        // Xử lý lỗi chưa xác thực người dùng
        else if (err.name === "Unauthorized") {
            err.status = 401
        }
    
        // Xử lý lỗi truy cập bị từ chối
        else if (err.name === "Access Denies") {
            err.status = 401
        }
    
        // Xử lý không tìm thấy trang
        else if (err.name === "Page not found") {
            err.status = 404
        }
    
        // Xử lý lỗi không xác định
        else if (!err.status) err.status = 400

        return res.status(err.status).json({
            name: err.name,
            message: err.message
        })
    }
}

module.exports = new Handler()