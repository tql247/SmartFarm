const cloudinary = require('cloudinary')["v2"];

cloudinary.config({
    cloud_name: "tql247",
    api_key: "428231898387344",
    api_secret: "CwSv3Wy0mmM9P3brLPjRr5muJ9c",
})

module.exports = cloudinary;
