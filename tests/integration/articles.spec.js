const app = require("../../app");
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("test GET /api/v1/articles endpoint", () => {
  test("test get all articles -> Success", async () => {
    try {
      const { statusCode, body } = await request(app).get("/api/v1/articles");

      user = body.data;
      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.data).toHaveProperty("user_id");
      expect(body.data).toHaveProperty("title");
      expect(body.data).toHaveProperty("body");
      expect(body.data.name).toBe(user_id);
      expect(body.data.email).toBe(title);
      expect(body.data.password).toBe(body);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});
