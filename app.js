const express = require('express')
const app = express()

const {uploadFile} = require("./middleware/multer");
const {NotFoundError, ErrorHandler} = require("./utils/errorHandler");


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.post('/upload-single', uploadFile.single('image'), (req, res, next) => {
    // uploadFile.single('image')
    console.log(req.file)
    res.send(req.file)

})


app.post('/upload-array', uploadFile.array('image', 3), (req, res, next) => {
    // uploadFile.single('image')
    console.log(req.files)
    res.send(req.files)

})


app.post('/upload-fields', uploadFile.fields([
    {name: "image", maxCount: 1}, {
        name: "file",
        maxCount: 1
    },

    ]), (req, res, next) => {
    // uploadFile.single('image')
    // console.log(req.files)
    res.send(req.files)

})
app.post('/upload-any', uploadFile.any(), (req, res, next) => {
    // uploadFile.single('image')
    // console.log(req.files)
    res.send(req.files)

})


app.use(NotFoundError)
app.use(ErrorHandler)
app.listen(3500, () => {
    console.log('server is running')
})