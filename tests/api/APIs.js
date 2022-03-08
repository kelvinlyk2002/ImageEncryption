var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var encryption = require('../../helpers/encrypter');
const fs = require('fs')

chai.use(chaihttp);

const __url = 'http://localhost:3000';

/*

    This file is mainly used to write all the service tests regarding the application.

*/

// This test case makes sure that the homepage is working as expected 
describe('Home Service', () => {
    it('should return 200', (done) => {
        chai.request(__url)
            .get('/')
            .end((err, res) => {        
                //assert.equal(res.status, 200);
                expect(res.status).to.equal(200);
                done();
            });
    });
}) ;
