const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../express_server.js');
const indexController = require('../controllers/indexController');
const index = require('../routes/index');

chai.use(chaiHttp);
describe('Index Route Tests', () => {
  it('should return 200 and render text when / is called', () => {
    return chai.request(app)
        .get('/')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render JSON when /json is called', () => {
    return chai.request(app)
        .get('/json')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.json;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 302 and redirect to youtube when /u/b2xV2n is called', () => {
    return chai.request(app)
        .get('/u/b2xV2n')
        .then((response) => {
          response.should.have.status(302);
          response.should.be.text;
          expect(response).to.redirect;
          expect(response).to.redirectTo('https://youtube.com');
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 302 and redirect to google when /u/h1h1h1 is called', () => {
    return chai.request(app)
        .get('/u/h1h1h1')
        .then((response) => {
          response.should.have.status(302);
          response.should.be.text;
          expect(response).to.redirect;
          expect(response).to.redirectTo('https://google.ca');
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render text when /login is called', () => {
    return chai.request(app)
        .get('/login')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render text when /register is called', () => {
    return chai.request(app)
        .get('/register')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
});

describe('Integration test with session active', () => {
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
describe('Integration test with no session', () => {
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

