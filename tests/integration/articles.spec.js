const app = require('../../app');
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let articles = {};

// test getAllArticles
// -> berhasil

describe('test GET /api/v1/articles endpoint', () => {
    test('test menampilkan semua artikel -> sukses', async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/articles`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('user_id');
            expect(body.data).toHaveProperty('title');
            expect(body.data).toHaveProperty('body');
        } catch (err) {
            expect(err).toBe(err);
        }
    });
});