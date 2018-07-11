const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../api/routes/user');

describe('API Endpoint',function(){
    it('get user',function(done){
        return chai.request(app)
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
          done();
        });
    });
});