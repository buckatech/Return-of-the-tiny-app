const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../express_server.js');
const urlsController = require('../controllers/urlsController');
const urls = require('../routes/index');

const db = require('../server/urlDB');
const users = require('../server/userDB');
chai.use(chaiHttp);
describe('/---Urls/Id ---/', () => {
  describe('---If the user is logged in', () => {
    it('Urls/Id should return html', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/cookie')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<p>([\s\S]*)?<\/p>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(6);
            expect(out).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
    it('Urls/Id should return the site header', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/cookie')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<h1>([\s\S]*)?<\/h1>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(7);
            expect(out).to.be.a('string');
            expect(out).to.have.string('TinyApp');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
    it('Urls/Id should return the short URL (for the given ID)', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/cookie')
          .then((response) => {
            expect(response.text).to.have.string('<h5>ShortURL: cookie</h5>');
            expect(response.text).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
    describe('a form which contains:', () => {
      it('the corresponding long URL', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls/cookie')
            .then((response) => {
              expect(response.text).to.have.string('<h5>ShortURL: cookie</h5>');
              expect(response.text).to.be.a('string');
              response.should.have.status(200);
              response.should.be.html;
              delete urlsController.testVar;
            })
            .catch((error) => {
              throw error;
            });
      });
      it('an update button which makes a POST request to /urls/:id', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls/cookie')
            .then((response) => {
              expect(response.text).to.have.string('<form action="/urls/cookie/update" method="post"');
              expect(response.text).to.be.a('string');
              response.should.have.status(200);
              response.should.be.html;
              delete urlsController.testVar;
            })
            .catch((error) => {
              throw error;
            });
      });
    });
  });
  describe('If the user is not logged in', () => {
    it('returns HTML with a relevant error message', () => {
      delete urlsController.testVar;
      return chai.request(app)
          .get('/urls/cookie')
          .then((response) => {
            expect(response.text).to.have.string('<h3>You are not logged in please');
            expect(response.text).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
          })
          .catch((error) => {
            throw error;
          });
    });
  });
  describe('If the user is logged in but does not own the URL', () => {
    it('returns HTML with a relevant error message', () => {
      delete urlsController.testVar;
      return chai.request(app)
          .get('/urls/cookie')
          .then((response) => {
            expect(response.text).to.have.string('You do not own this URL');
            expect(response.text).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
          })
          .catch((error) => {
            throw error;
          });
    });
  });
});
