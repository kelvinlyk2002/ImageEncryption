const aesjs = require('aes-js');
const crypto = require('crypto');

const AESCBC =  (key, text, direction) => {
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
        // cryptor
        let aesCbc = new aesjs.ModeOfOperation.cbc(keyArray, iv);
        if(direction == "encrypt"){
            // padding to a multiple of 16 bytes, adding custom padding
            for(var i=0; i < text.length % 16 ; i++){
                text += "|";
            }
            // encrypt
            let textBytes = aesjs.utils.utf8.toBytes(text);
            let encryptedBytes = aesCbc.encrypt(textBytes);
            let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return encryptedHex;
        } else if (direction == "decrypt"){
            // decrypt
            let encryptedBytes = aesjs.utils.hex.toBytes(text);
            let decryptedBytes = aesCbc.decrypt(encryptedBytes);
            let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            // removing custom padding
            decryptedText = decryptedText.replace("|","");
            return decryptedText;
        } else {
            throw "error";
        }
    }
}

exports.AESCBC = AESCBC;
