const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../express_server.js');

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
  /*
  it('should return 302 and redirect to youtube when /u/b2xV2n is called', () => {
    return chai.request(app)
        .get('/u/b2xV2n')
        .then((response) => {
          response.should.have.status(200);
        })
        .catch((error) => {
          throw error;
        });
  });
   TODO Figure out redirect logic 
  it('should return 302 and redirect to google when /u/h1h1h1 is called', () => {
    return chai.request(app)
        .get('/u/h1h1h1')
        .then((response) => {
          response.should.have.status(200);
        })
        .catch((error) => {
          throw error;
        });
  });
  */
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
