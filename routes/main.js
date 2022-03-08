// The main.js file of your application
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
var encryption = require('../helpers/encrypter');



module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("pages/index");
    });

    app.post("/encrypt", upload.single('image'), function(req, res){
        let imgBitstring = req.file.buffer.toString('base64');
        let inputKey = req.body.key;
        try{
            encrypted = encryption.AESCBC(inputKey, imgBitstring, "encrypt");
            res.render("pages/uploadSuccess", { success: true, output: encrypted });
        } catch (e) {
            res.render("pages/uploadSuccess", { success: false, output: e });
        }
    });

    app.post("/decrypt", function(req, res){
        let inputEncryptedString = req.body.inputEncryptedString;
        let inputKey = req.body.key;
        try{
            decrypted = encryption.AESCBC(inputKey, inputEncryptedString, "decrypt");
            res.render("pages/decryptSuccess", { success: true, output: decrypted });
        } catch (e) {
            console.log(e)
            res.render("pages/decryptSuccess", { success: false, output: e });
        }
    });
}