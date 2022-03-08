var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var encryption = require('../../helpers/encrypter');
const fs = require('fs')

chai.use(chaihttp);


/*

    This file is mainly used to write all the unit tests regarding the application.

*/

// This test case makes sure that the encryption is working as expected 
// By using the encryption mechanism that the service is using.
describe('Encryption', () => {

    it('the image should not match the encrypted image with key', () => {

        //Arrange
        const data = fs.readFileSync(`${__dirname}/testimage1.jpg`, {encoding: 'base64'})

        //Act
        const encrypted = encryption.AESCBC('1234567890123456', data, "encrypt")

        //Assert
        expect(data).to.not.equal(encrypted)
    });
})


// This test case makes sure that the decryption is working as expected
// By using the encryption mechanism that the service is using.
describe('Decryption', () => {

    it('the encrypted image should match the image when decrypted with same key', () => {

        //Arrange
        const data = fs.readFileSync(`${__dirname}/testimage1.jpg`, {encoding: 'base64'})

        //Act
        const encrypted = encryption.AESCBC('1234567890123456', data, "encrypt")
        const decrypted = encryption.AESCBC('1234567890123456', encrypted, "decrypt")

        //Assert
        expect(data).to.equal(decrypted)
    });
})
