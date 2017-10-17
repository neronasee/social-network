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

        response.statusCode.should.eql(400);
      });
    });
  });

  describe('GET /users/:id', () => {
    context('user exists', () => {
      it('returns the user by id', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id}`,
          timeout: 500,
          json: true,
        });

        response.body.data.email.should.eql(existingUser.email);
        response.statusCode.should.eql(200);
        response.headers['content-type'].should.match(/application\/json/);
      });
    });

    context('user doesnt exist', () => {
      it('returs 404', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id + 1}`,
          timeout: 500,
        });
        response.statusCode.should.eql(404);
      });
    });
  });

  describe('GET /users', () => {
    it('returns users list with proper limits', async function() {
      const response = await request({
        method: 'GET',
        url: `${ROOT_URL}/users?limit=1`,
        timeout: 500,
        json: true,
      });

      response.body.data.should.have.length(1);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });
  });

  describe('PATCH /users/:id', () => {
    const validDataForUpdate = {
      email: 'updatedEmail@gmail.com',
    };

    const invalidDataForUpdate = {
      Xemail: '*updatedEmail@gmail.com',
    };

    context('user doesnt exist', () => {
      it('returns 404', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/users/${existingUser.id + 1}`,
          json: true,
          body: validDataForUpdate,
        });

        response.statusCode.should.eql(404);
      });
    });

    context('user exists and data is INVALID', () => {
      it('returns an error', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/users/${existingUser.id}`,
          json: true,
          body: invalidDataForUpdate,
        });

        response.statusCode.should.eql(400);
      });
    });
    context('user exists and data is VALID', () => {
      it('returns 200 and user is updated', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/users/${existingUser.id}`,
          json: true,
          body: validDataForUpdate,
        });

        response.statusCode.should.eql(200);

        const updatedResponse = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id}`,
          json: true,
        });

        updatedResponse.body.data.email.should.eql(validDataForUpdate.email);
      });
    });
  });

  describe('DELETE /users/:id', () => {
    context('user exists', () => {
      it('returns 200', async function() {
        const response = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/users/${existingUser.id}`,
          timeout: 500,
        });

        response.statusCode.should.eql(200);
      });
    });

    context('user doesnt exist', () => {
      it('returns 404', async function() {
        const response = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/users/${existingUser.id + 1}`,
          timeout: 500,
        });

        response.statusCode.should.eql(404);
      });
    });
  });
});
