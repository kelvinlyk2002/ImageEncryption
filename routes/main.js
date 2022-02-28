// The main.js file of your application
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("pages/index");
    });

    app.post("/", upload.single('image'), function(req, res){
        res.send(req.file);
    });

    app.get("/uploadSuccess",function(req, res){
        res.render("pages/uploadSuccess");
    })

    app.get("/decryptSuccess",function(req, res){
        res.render("pages/decryptSuccess");
    })
}