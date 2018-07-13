const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');
const mockery = require('mockery');


describe('GET /', function () {
    before(function() {
        mockery.enable({
          warnOnUnregistered: false
        })
    
        mockery.registerMock('../api/repositories/user', {
          getUser: (req,cb) => cb(null, ["First news", "Second news"])
        })
        this.controller = require('../api/routes/user')
      });

      after(function() {
        mockery.disable()
      });

    it("should respond with status 200", (done) => {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});
