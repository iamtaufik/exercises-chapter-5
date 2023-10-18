const app = require("../../app");
const request = require("supertest");
let user = {};
let articles = {};

describe("test POST /api/v1/articles endpoint", () => {
  test("should can create user", async () => {
    try {
      const name = "usertest3";
      const email = "usertest3@mail.com";
      const password = "pasword123";

      const { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name,
          email,
          password,
        });
      user = body.data;
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name");
      expect(body.data).toHaveProperty("email");
      expect(body.data).toHaveProperty("password");
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
  test("should can create new articles", async () => {
    const data = {
      title: "title",
      body: "body",
      user_id: user.id,
    };
    const response = await request(app).post("/api/v1/articles").send(data);

    articles = response.body.data;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("title");
    expect(response.body.data).toHaveProperty("body");
    expect(response.body.data.title).toBe(data.title);
    expect(response.body.data.body).toBe(data.body);
    expect(response.body.data.user_id).toBe(data.user_id);
  });

  test("should can not create new articles user_id not found", async () => {
    const data = {
      title: "title",
      body: "body",
      user_id: 0,
    };
    const response = await request(app).post("/api/v1/articles").send(data);
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("user tidak ditemukan");
  });

  test("should can not create new articles title & body empty", async () => {
    const data = {
      title: "",
      body: "",
      user_id: 0,
    };
    const response = await request(app).post("/api/v1/articles").send(data);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("data tidak lengkap");
  });
});

describe("test GET /api/v1/articles endpoint", () => {
  test("test get all articles -> Success", async () => {
    const { statusCode, body } = await request(app).get("/api/v1/articles");

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("data");
  });
});

describe("test PUT /api/v1/articles/{id} endpoint", () => {
  test("test perbarui artikel dengan user_id yang tidak ada -> error", async () => {
    const updatedData = {
      user_id: 999,
      title: "tes title",
      body: "tes body",
    };

    const { statusCode, body } = await request(app)
      .put(`/api/v1/articles/${articles.id}`)
      .send(updatedData);
      
    expect(statusCode).toBe(404);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
  });

  test("test perbarui artikel yang tidak ada -> error", async () => {
    const updatedData = {
      user_id: user.id,
      title: "tes title",
      body: "tes body",
    };

    const nonExistentArticleId = 999; 

    const { statusCode, body } = await request(app)
      .put(`/api/v1/articles/${nonExistentArticleId}`)
      .send(updatedData);

    expect(statusCode).toBe(404);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
  });

  test("test update article -> Success", async () => {
    const updatedData = {
      user_id: user.id,
      title: "tes title",
      body: "tes body",
    };

    const { statusCode, body } = await request(app)
      .put(`/api/v1/articles/${articles.id}`)
      .send(updatedData);

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("user_id");
    expect(body.data).toHaveProperty("title");
    expect(body.data).toHaveProperty("body");
    expect(body.data.user_id).toBe(updatedData.user_id);
    expect(body.data.title).toBe(updatedData.title);
    expect(body.data.body).toBe(updatedData.body);
  });
});
