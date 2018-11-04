const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../express_server.js');


chai.use(chaiHttp);
describe('/---Urls Route Test---/', () => {
  it('should return 200 and render text when /urls is called', () => {
    return chai.request(app)
        .get('/urls')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render urls/new when /urls/new is called', () => {
    return chai.request(app)
        .get('/urls/new')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render urls/b2xVn2 when /urls/b2xVn2 is called', () => {
    return chai.request(app)
        .get('/urls/b2xVn2')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  it('should return 200 and render urls/h1h1h1 when /urls/h1h1h1 is called', () => {
    return chai.request(app)
        .get('/urls/h1h1h1')
        .then((response) => {
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
});
