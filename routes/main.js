// The main.js file of your application
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const aesjs = require('aes-js');
const crypto = require('crypto');


module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("pages/index");
    });

    app.post("/", upload.single('image'), function(req, res){
        let imgBitstring = req.file.buffer.toString('base64');
        let inputKey = req.body.key;
        const hash = crypto.createHmac('sha256', 'AESApplicationSalt').update(inputKey).digest('hex');
        let hashArray = hash.split("");
        let keyArray = [];
        for(var i=0; i<hashArray.length; i+=2){
            keyArray.push(hashArray[i] + hashArray[i+1]);
        }
        console.log(keyArray);
        res.render("pages/uploadSuccess", { imgBitstring: imgBitstring });
    });

    app.get("/uploadSuccess",function(req, res){
        res.render("pages/uploadSuccess");
    })

    app.get("/decryptSuccess",function(req, res){
        res.render("pages/decryptSuccess");
    })
}