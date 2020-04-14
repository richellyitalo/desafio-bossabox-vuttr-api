// const request = require('supertest');
// const app = require('../src/server');
import request from 'supertest';
import app from '../src/app';
import { set } from 'mongoose';

let token;
const email = 'foo@bar.com';
const pw = '123456';

beforeAll((done) => {
  request(app)
    .post('/users/login')
    .send({
      email: email,
      password: pw,
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe('Test users registration/login', () => {
  test('Register user', () => {
    return request(app)
      .post('/users')
      .send({
        email: 'user@test.com',
        password: '123456',
      })
      .then((response) => {
        expect(response.statusCode).toBe(201);
      });
  });
  // send the token - should respond with a 200
  test('Login new user', () => {
    return request(app)
      .post('/users/login')
      .send({
        email: 'user@test.com',
        password: '123456',
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
  });
});

describe('Test token', () => {
  // token not being sent - should respond with a 401
  test('Test protection without token', () => {
    return request(app)
      .get('/tools')
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test('Test with token', () => {
    return request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('Tools Endpoints', () => {
  // post
  it('should create a new tool', async (done) => {
    const res = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'React',
        email: 'meunome@email.com',
        description: 'Doc React',
        link: 'https://github.com/facebook/reactjs',
        tags: ['javascript', 'framework', 'facebook', 'frontend'],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('tags', [
      'javascript',
      'framework',
      'facebook',
      'frontend',
    ]);

    done();
  });

  // get
  it('should get all tools', async (done) => {
    let res = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);

    // insert a new
    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Angular',
        email: 'meunome@email.com',
        description: 'Doc Angular',
        link: 'https://github.com/google/angularjs',
        tags: ['javascript', 'framework', 'node', 'google'],
      });

    // test new length
    res = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);

    expect(res.body).toHaveProperty(
      [1, 'tags'],
      ['javascript', 'framework', 'node', 'google']
    );

    done();
  });

  // get with filter tag
  it('should get all tools with filter', async (done) => {
    const res = await request(app)
      .get('/tools?tag=google')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);

    expect(res.body).toHaveProperty(
      [0, 'tags'],
      ['javascript', 'framework', 'node', 'google']
    );

    done();
  });

  // get with filter tag
  it('should delete a tool', async (done) => {
    const resTool = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${token}`);
    const firstTool = resTool.body[0];

    const res = await request(app)
      .delete(`/tools/${firstTool.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);

    done();
  });
});
