const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../express_server.js');
const urlsController = require('../../controllers/urlsController');
const urls = require('../../routes/index');

const db = require('../../server/urlDB');
const users = require('../../server/userDB');

describe('/---Urls/New Integration Test ---/', () => {
  describe('---If the user is logged in', () => {
    it('/urls/new should return html', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/new')
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
    it('/urls/new should return the site header', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/new')
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
    it('/urls/new should return a text input field for the original (long) URL', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/new')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<h1>([\s\S]*)?<\/h1>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(7);
            expect(out).to.be.a('string');
            expect(out).to.have.string('TinyApp');
            expect(response.text).to.have.string('<label for="longURL">Enter a URL:</label>');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
    it('/urls/new should return a submit button which makes a POST request to /urls', () => {
      urlsController.testVar = 'hi';
      return chai.request(app)
          .get('/urls/new')
          .then((response) => {
            const string = response.text;
            const matchReg = string.match(/<h1>([\s\S]*)?<\/h1>/i)||[];
            const out = matchReg[1] || '';
            expect(out).to.be.length(7);
            expect(out).to.be.a('string');
            expect(out).to.have.string('TinyApp');
            expect(response.text).to.have.string('<form action="/urls" method="post" style="margin:150px;"><label for="longURL">');
            response.should.have.status(200);
            response.should.be.html;
            delete urlsController.testVar;
          })
          .catch((error) => {
            throw error;
          });
    });
  });
  describe('---If the User is not logged in', () => {
    it('/urls/new should redirect user to /login', () => {
      delete urlsController.testVar;
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
  })
});
