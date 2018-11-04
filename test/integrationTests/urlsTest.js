const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../express_server.js');
const urlsController = require('../../controllers/urlsController');
const urls = require('../../routes/index');

const db = require('../../server/urlDB');
const users = require('../../server/userDB');

describe('/---Urls---/', () => {
  describe('---If the user is logged in', () => {
    it('should return 200 and render text when urls is called', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls')
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
    it('/urls should return html', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls')
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
    it('/urls should return the site header', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<h1>([\s\S]*)?<\/h1>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(7);
            expect(out).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
    describe('|--Urls should return a list (or table) of URLs the user has created, each list item containing:', () => {
      it('A short URL', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls')
            .then((response) => {
              const string = response.text;
              const matchReg = string.match(/<li>(.*?)<\/li>/g)||[];
              const outShort = matchReg[0] || '';
              expect(outShort).to.not.have.lengthOf(0);
              expect(outShort).to.be.a('string');
              expect(outShort).to.have.string('cookie');
              response.should.have.status(200);
              response.should.be.html;
              delete urlsController.testVar;
            })
            .catch((error) => {
              throw error;
            });
      });
      it('The Short URLS matching longURL', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls')
            .then((response) => {
              const string = response.text;
              const matchReg = string.match(/<li>(.*?)<\/li>/g)||[];
              const outShort = matchReg[0] || '';
              expect(outShort).to.not.have.lengthOf(0);
              expect(outShort).to.be.a('string');
              expect(outShort).to.have.string('cookie');
              response.should.have.status(200);
              response.should.be.html;
              const shortReg = outShort.match(/cookie1  (.+)<\//)[1];
              expect(shortReg).to.equal(db.cookie.cookie1)
              delete urlsController.testVar;
            })
            .catch((error) => {
              throw error;
            });
      });
      it('an edit button which makes a GET request to /urls/:id', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls')
            .then((response) => {
              expect(response.text).to.have.string('<button>Update');
              expect(response.text).to.not.have.lengthOf(0);
              response.should.have.status(200);
              response.should.be.html;
              delete urlsController.testVar;
            })
            .catch((error) => {
              throw error;
            });
      });
      it('a delete button which makes a post request to /urls/longURL/delete', () => {
        urlsController.testVar = 'hi';
        return chai.request(app)
            .get('/urls')
            .then((response) => {
              expect(response.text).to.have.string('action="/urls/cookie1/delete');
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
  describe('---If the user is not logged in', () => {
    it('should return 200 and render loginErr when urls is called without session', () => {
      return chai.request(app)
          .get('/urls')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<p>([\s\S]*)?<\/p>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(0);
            expect(out).to.be.a('string');
            response.should.have.status(200);
            response.should.be.html;
          })
          .catch((error) => {
            throw error;
          });
    });
  });
});
