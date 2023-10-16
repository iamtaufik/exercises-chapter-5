const app = require('../../app');
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let user = {};
//  test createUsers
/* 
    - test email belum terdaftar
    -> sukses 
    - test email sudah terdaftar
    -> error
*/
describe('test POST /api/v1/users endpoint', () => {
  //   beforeAll(async () => {
  //     await prisma.user.delete({
  //       where: {
  //         email: 'usertest2@mail.com',
  //       },
  //     });
  //   });

  test('test email belum terdaftar -> sukses', async () => {
    try {
      const name = 'usertest2';
      const email = 'usertest2@mail.com';
      const password = 'pasword123';

      const { statusCode, body } = await request(app).post('/api/v1/users').send({
        name,
        email,
        password,
      });
      user = body.data;
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test email sudah terdaftar -> error', async () => {
    try {
      const name = 'usertest2';
      const email = 'usertest2@mail.com';
      const password = 'pasword123';

      const response = await request(app).post('/api/v1/users').send({
        name,
        email,
        password,
      });

      expect(response.statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe('email sudah dipakai');
    }
  });
});

// get allUsers
/* 
    - test cari id users yang terdaftar
    -> sukses
    - test cari id yang belum terdaftar
    -> error
*/

describe('test GET /qpi/v1/users/{id} endpoint', () => {
  test('test cari user dengan id yang terdaftar -> sukses', async () => {
    try {
      const { statusCode, body } = await request(app).get(`/api/v1/users/${user.id}`);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
    } catch (err) {
      expect(err).toBe('error');
    }
  });

  test('test cari user dengan id yang tidak terdaftar -> error', async () => {
    try {
      const { statusCode, body } = await request(app).get('/api/v1/users/100');

      expect(statusCode).toBe(404);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
    } catch (err) {
      expect(err).toBe('user tidak ditemukan');
    }
  });
});
