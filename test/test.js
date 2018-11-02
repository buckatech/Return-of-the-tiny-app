const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
const nock = require('nock');

const app = require('../express_server.js');
const indexController = require('../controllers/indexController');
const index = require('../routes/index');

indexController.testVar = 'hi'
console.log(indexController)
chai.use(chaiHttp);

const agent = chai.request.agent(app);

describe('Integration test with session active', () => {
  // it('should return the register page with text', () => {
  //   return chai.request(app)
  //       .get('/register')
  //       .then((response) => {
  //         response.should.have.status(200);
  //         response.should.be.html;
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  // });
  it('should return the home page with a cookie', () => {
    return chai.request(app)
        .get('/')
        .then((response) => {
          console.log(response.text)
          response.should.have.status(200);
          response.should.be.html;
        })
        .catch((error) => {
          throw error;
        });
  });
  
  // it('home should check cookie', () => {
  //   return chai.request.agent(app)
  //       .post('/register')
  //       .send({email: 'email@email.com', password: 'pass@pass.com'})
  //       .then((res) => {
  //         const str = res.text;
  //         const m = str.match(/<p>([\s\S]*)?<\/p>/i)||[];
  //         const out = m[1] || '';
  //         res.cookie = out
  //         const parentres = res.cookie
  //         expect(out).to.be.length(6);
  //         expect(out).to.be.a('string');
  //         //console.log(res.cookie)
  //         return agent.get('/')
  //             .then((res) => {
  //               nock('/')
  //                 .get('/')
  //                 .reply(200, {
  //                   cookie: parentres
  //                 })
  //                 console.log(res)
  //             });
  //       });
  // });

  // it('should post the user to database', () => {
  //   return chai.request(app)
  //       .post('/register')
  //       .send({email: 'email@email.com', password: 'pass@pass.com'})
  //       .then((response) => {
  //         response.should.have.status(200);
  //         response.should.be.html;
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  // });

  // it('should return a 404 for a route that does not exist', () => {
  //   return chai.request(app)
  //       .get('/sad')
  //       .then((response) => {
  //         response.should.have.status(404);
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  // });
});


