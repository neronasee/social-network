xdescribe('GET /user/:id', () => {
  it('returns the user by id', async function() {
    const response = await request({
      method: 'GET',
      url: `${ROOT_URL}/user/${existingUser.user_id}`,
      timeout: 500,
    });
    response.statusCode.should.eql(200);
    response.headers['content-type'].should.match(/application\/json/);
  });

  it('return 404 if user doesnt exists', async function() {
    const response = await request({
      method: 'GET',
      url: `${ROOT_URL}/user/${existingUser.user_id + 1}`,
      timeout: 500,
    });
    response.statusCode.should.eql(404);
  });
});
