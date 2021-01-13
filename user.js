let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server=require('../server')
let User=require('../Models/User')

//Our parent block
describe('should GET /',  () => {
    it('should get 200 status', (done) =>{
        chai.request(server)
        .get('/')
        .end( (err, res) => {
            res.should.have.status(200);
            done();
        });
    });


     describe('Should check for Users', () => {
        it('should check for get all users', (done) =>{
            chai.request(server)
            .get('/users')
            .end( (err, res) => {
               
                    res.should.have.status(200);
                    done()
            })
        })
    
    })
   });