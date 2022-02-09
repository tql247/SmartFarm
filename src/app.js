// Gọi module
const path = require("path")
const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

// Gọi các đối tượng đã định nghĩa
const routes = require("./routes")
const Handler = require("./utils/Handler")
const MQTTClient = require("./utils/MQTTClient")
const FireBaseDatabase = require("./utils/FireBaseDatabase")
const RuleListener = require("./utils/RuleListener")
const Connection = require("./utils/Connection")
const Middleware = require("./utils/Middleware")

// Khởi tạo đối tượng chính
const app = express()
const router = express.Router()

// start connect firebase database
global.realtimeDatabase = new FireBaseDatabase()
realtimeDatabase.start()

// start connect hiveMQ mqtt server
global.mqttClient = new MQTTClient()
mqttClient.start()

// start listen rule
ruleListener = new RuleListener()
ruleListener.start()

// Kết nối đến mongodb
Connection.connect()

// Sử dụng để chấp nhận proxy ip https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1)

// Định nghĩa view engine & định nghĩa thư mục của view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

// Dùng để serve một thư mục với đường dẫn /public và /uploads
app.use("/public", express.static(path.resolve(__dirname, "../public")))
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")))

// Dùng để cho phép truy cập theo cors policy
app.use(cors())

// Dùng để lấy cookie trong request header
app.use(cookieParser())

// Dùng để lấy nội dung của request
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())

// Sử dụng middlewares
app.use(Middleware.authorize)

// Gọi và sử dụng các route đã định nghĩa
router.use(routes)
app.use(router)

// Sử dụng các handler, enpoint
app.use([Handler.notFoundUrl, Handler.errorHandler])

module.exports = app