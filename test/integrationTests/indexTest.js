const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../express_server.js');
const indexController = require('../controllers/indexController');
const index = require('../routes/index');

const db = require('../server/urlDB');
const users = require('../server/userDB');

describe('/---Index Integration test with session active---/', () => {
  it('should return the home page with a cookie', () => {
    indexController.testVar = 'hi';
    return chai.request(app)
        .get('/')
        .then((response) => {
          const string = response.text;
          const matchReg = string.match(/<p>([\s\S]*)?<\/p>/i)||[];
          const out = matchReg[1] || '';
          expect(out).to.be.length(6);
          expect(out).to.be.a('string');
          response.should.have.status(200);
          response.should.be.html;
          delete indexController.testVar;
        })
        .catch((error) => {
          throw error;
        });
  });
});


describe('---Index Integration test with no session', () => {
  it('should return the home page with no cookie', () => {
    return chai.request(app)
        .get('/')
        .then((response) => {
          const string = response.text;
          const matchReg = string.match(/<p>([\s\S]*)?<\/p>/i)||[];
          const out = matchReg[1] || '';
          expect(out).to.not.be.length(6);
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
});

