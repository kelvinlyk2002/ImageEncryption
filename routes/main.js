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
        try{
            encrypted = AESCBCEncrypt(inputKey, imgBitstring);
            res.render("pages/uploadSuccess", { success: true, output: encrypted });
        } catch (e) {
            res.render("pages/uploadSuccess", { success: false, output: e });
        }
    });

    app.get("/decryptSuccess",function(req, res){
        res.render("pages/decryptSuccess");
    })
}

function AESCBCEncrypt(key, text){
    const hash = crypto.createHmac('sha256', 'AESApplicationSalt').update(key).digest('hex');
    let hashArray = hash.split("");
    let keyArray = [];
    for(var i=0; i<hashArray.length; i+=2){
        keyArray.push(parseInt(hashArray[i] + hashArray[i+1], 16));
    }
    if(keyArray.length != 32){
        //not 256 bit
        throw "Hashing error - result is not 256bit";
    } else {
        // The initialization vector (must be 16 bytes)
        // derived based on hashArray, takes first 16 values of the hash and reverse them
        let iv = hashArray.slice(0, 16);
        for(var i = 0; i<iv.length; i++){
            iv[i] = parseInt(iv[i], 16);
        }
        // encrypt
        let textBytes = aesjs.utils.utf8.toBytes(text);
        var aesCbc = new aesjs.ModeOfOperation.cbc(keyArray, iv);
        var encryptedBytes = aesCbc.encrypt(textBytes);
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    }
}