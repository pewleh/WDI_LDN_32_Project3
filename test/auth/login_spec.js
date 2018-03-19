/* global api, describe, it, expect, beforeEach */

const User = require('../../models/user');

const userData = {
  username: 'tester',
  email: 'tester@test.com',
  password: 'tester',
  passwordConfirmation: 'tester'
};

describe('POST /login', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(() => done());
  });
  //checking to see if token is valid. ->
  it('should return a token', done => {
    api
      .post('/api/login')
      .send(userData)
      .end((err, res) => {
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });
// need to add login and register errors once errors are linked.
});
