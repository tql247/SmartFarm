const count_notification = require("./accessor/count_notification");
const count_notification_by_topic = require("./accessor/count_notification_by_topic");

// lấy tổng số thông báo có trong database, hỗ trợ hiển thị ở frontend
async function get_num_notification (topic) {
    try {
        if(topic) return await count_notification_by_topic(topic)
        return await count_notification()
    } catch (e) {
        throw e
    }
}

module.exports = get_num_notification