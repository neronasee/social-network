const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false,
});
const config = require('config');
const app = require('../app');
const db = require('../db');

const ROOT_URL = `http://localhost:${config.get('testPort')}`;

let server;

describe('User Interactions', () => {
  const existingUserData = {
    firstname: 'testname',
    lastname: 'testlastname',
    birthdate: '1820-12-12',
    phone: '123',
    gender: '2',
    city_id: '205',
    birthdate: '1970-10-25',
    password: '123',
    email: 'test@gmail.com',
  };

  const newUserData = {
    firstname: 'testnameNEW',
    lastname: 'testlastnameNEW',
    birthdate: '1820-12-12',
    phone: '456',
    gender: '2',
    city_id: '205',
    birthdate: '1970-10-25',
    password: '123',
    email: 'test2@gmail.com',
  };

  let existingUser;

  before(done => {
    server = app.listen(config.get('testPort'), done);
  });

  after(done => {
    server.close(done);
  });

  beforeEach(async function() {
    await db.users.empty();

    existingUser = await db.users.create(existingUserData);
  });

  describe('POST /login', () => {
    context('user doesnt exist', () => {
      it('returns an error with invalid credentials', async function() {
        const invalidData = {
          email: 'invalidEmail',
          password: 'invalidPass',
        };

        const response = await request({
          method: 'POST',
          url: `${ROOT_URL}/login`,
          timeout: 500,
          json: true,
          body: invalidData,
        });

        response.statusCode.should.eql(400);
      });
    });

    context('user exists', () => {
      it('returns jwt token with proper credentials', async function() {
        const validData = {
          email: existingUserData.email,
          password: existingUserData.password,
        };

        const response = await request({
          method: 'POST',
          url: `${ROOT_URL}/login`,
          timeout: 500,
          json: true,
          body: validData,
        });

        response.body.should.have.property('token');
      });
    });
  });

  describe('POST /signup', () => {
    context('user doesnt exist', () => {
      it('creates user and returns it', async function() {
        const response = await request({
          method: 'post',
          url: `${ROOT_URL}/signup`,
          json: true,
          body: newUserData,
        });

        response.body.user.email.should.eql(newUserData.email);
        response.body.should.have.property('token');
      });
    });

    context('user already exists', () => {
      it('returns an error', async function() {
        const response = await request({
          method: 'post',
          url: `${ROOT_URL}/signup`,
          json: true,
          body: existingUserData,
        });

        response.statusCode.should.eql(409);
      });
    });
  });
});
