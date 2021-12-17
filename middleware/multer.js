const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images")
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const imgFileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
        cb(null, imgFileName);
    }
})

const upload = multer({
    storage
})

module.exports = upload;