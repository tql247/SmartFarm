//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require("../src/app")
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('SmartFarm', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET account', () => {
        it('it should GET all the pets', (done) => {
            chai.request(app)
                .get('/account/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    // res.body.should.be.a('array');
                    // res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
});