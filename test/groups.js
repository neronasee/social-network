const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false,
});
const config = require('config');
const app = require('../app');
const db = require('../db');

const ROOT_URL = `http://localhost:${config.get('testPort')}`;

let server;

describe('Group Interactions', () => {
  let existingGroup;
  let existingUser;

  const existingGroupData = {
    name: 'testGroup',
    description: 'testDescription',
    get owner_id() {
      return existingUser.id;
    },
  };

  const newGroupData = {
    name: 'testGroupNEW',
    description: 'testDescriptionNEW',
    get owner_id() {
      return existingUser.id;
    },
  };

  before(done => {
    db.users.findAll().then(response => {
      existingUser = response[0];
    });

    server = app.listen(config.get('testPort'), done);
  });

  after(done => {
    server.close(done);
  });

  beforeEach(async function() {
    await db.groups.empty();

    existingGroup = await db.groups.create(existingGroupData);
    await db.groups.addUserToGroup(existingUser.id, existingGroup.id);
  });

  describe('GET /groups', () => {
    it('returns groups list with proper limits', async function() {
      const response = await request({
        method: 'GET',
        url: `${ROOT_URL}/groups?limit=1`,
        timeout: 500,
        json: true,
      });

      response.body.data.should.have.length(1);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });
  });

  describe('GET /groups/:id', () => {
    context('group exists', () => {
      it('returns the group by id', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/groups/${existingGroup.id}`,
          timeout: 500,
          json: true,
        });

        response.body.data.name.should.eql(existingGroup.name);
        response.statusCode.should.eql(200);
        response.headers['content-type'].should.match(/application\/json/);
      });
    });

    context('group doesnt exist', () => {
      it('returs 404', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/groups/${existingGroup.id + 1}`,
          timeout: 500,
        });
        response.statusCode.should.eql(404);
      });
    });
  });

  describe('DELETE /groups/:id', () => {
    context('group exists', () => {
      it('returns 200', async function() {
        const response = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/groups/${existingGroup.id}`,
          timeout: 500,
        });

        response.statusCode.should.eql(200);
      });
    });
    context('group doesnt exist', () => {
      it('returns 404', async function() {
        const response = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/groups/${existingGroup.id + 1}`,
          timeout: 500,
        });

        response.statusCode.should.eql(404);
      });
    });
  });

  describe('POST /groups', () => {
    it('creates group and returns it', async function() {
      const response = await request({
        method: 'post',
        url: `${ROOT_URL}/groups`,
        json: true,
        body: newGroupData,
      });
      response.body.data.name.should.eql(newGroupData.name);
    });
  });

  describe('PATCH /groups/:id', () => {
    const validDataForUpdate = {
      name: 'updatedEmail@gmail.com',
    };

    const invalidDataForUpdate = {
      Xname: 'updatedName',
    };

    context('group doesnt exist', () => {
      it('returns 404', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/groups/${existingGroup.id + 1}`,
          json: true,
          body: validDataForUpdate,
        });

        response.statusCode.should.eql(404);
      });
    });

    context('group exists and data is INVALID', () => {
      it('returns an error', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/groups/${existingGroup.id}`,
          json: true,
          body: invalidDataForUpdate,
        });

        response.statusCode.should.eql(400);
      });
    });
    context('group exists and data is VALID', () => {
      it('returns 200 and group is updated', async function() {
        const response = await request({
          method: 'patch',
          url: `${ROOT_URL}/groups/${existingGroup.id}`,
          json: true,
          body: validDataForUpdate,
        });

        response.statusCode.should.eql(200);

        const updatedResponse = await request({
          method: 'GET',
          url: `${ROOT_URL}/groups/${existingGroup.id}`,
          json: true,
        });

        updatedResponse.body.data.name.should.eql(validDataForUpdate.name);
      });
    });
  });

  describe('PUT /groups/:groupId/users/:userId', () => {
    it('adds a new member to the group', async function() {
      await request({
        method: 'PUT',
        url: `${ROOT_URL}/groups/${existingGroup.id}/users/${existingUser.id}`,
        timeout: 500,
        json: true,
      });

      const response = await request({
        method: 'GET',
        url: `${ROOT_URL}/users/${existingUser.id}/groups`,
        timeout: 500,
        json: true,
      });

      response.body.data.should.have.length(2);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });
  });

  describe('DELETE /groups/:groupId/users/:userId', () => {
    context('group and user exist', () => {
      it('returns 200 and anything after deleting', async function() {
        const deleteResponse = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/groups/${existingGroup.id}/users/${existingUser.id}`,
          timeout: 500,
        });

        deleteResponse.statusCode.should.eql(200);

        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id}/groups`,
          timeout: 500,
          json: true,
        });

        response.statusCode.should.eql(404);
      });
    });
    context('group or user dont exist', () => {
      it('returns 404', async function() {
        const response = await request({
          method: 'DELETE',
          url: `${ROOT_URL}/groups/${existingGroup.id + 1}/users/${existingUser.id}`,
          timeout: 500,
        });

        response.statusCode.should.eql(404);
      });
    });
  });

  describe('GET /users/:id/groups', () => {
    context('relation exists', () => {
      it('returns the list of groups', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id}/groups`,
          timeout: 500,
          json: true,
        });

        response.body.data.should.have.length(1);
        response.statusCode.should.eql(200);
        response.headers['content-type'].should.match(/application\/json/);
      });
    });

    context('relation doesnt exist', () => {
      it('returs 404', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/users/${existingUser.id + 1}/groups`,
          timeout: 500,
        });

        response.statusCode.should.eql(404);
      });
    });
  });

  describe('GET /groups/:id/users', () => {
    context('relation exists', () => {
      it('returns the list of groups', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/groups/${existingGroup.id}/users`,
          timeout: 500,
          json: true,
        });

        response.body.data.should.have.length(1);
        response.statusCode.should.eql(200);
        response.headers['content-type'].should.match(/application\/json/);
      });
    });

    context('relation doesnt exist', () => {
      it('returs 404', async function() {
        const response = await request({
          method: 'GET',
          url: `${ROOT_URL}/groups/${existingGroup.id + 1}/users`,
          timeout: 500,
        });

        response.statusCode.should.eql(404);
      });
    });
  });
});
