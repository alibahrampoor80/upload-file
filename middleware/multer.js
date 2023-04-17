const multer = require('multer')
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        fs.mkdirSync('public/uploads', {recursive: true})
        cb(null, 'public/uploads')

    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const whiteListFormat = ['.png', '.jpg', '.jpeg', '.webp','.JPG']
        if (whiteListFormat.includes(ext)) {
            const filename = Date.now() + ext
            cb(null, filename)
        } else {
            cb(new Error('فقط عکس مجاز است'))
        }
    }
})
const _1MB = 1000 * 1000
const _2MB = 2 * 1000 * 1000
const _3MB = 2 * 1000 * 1000
const _750KB = 150000

const uploadFile = multer({
    storage: storage,
    // limits: {
    //     fileSize: _750KB
    // }
})
module.exports = {uploadFile}