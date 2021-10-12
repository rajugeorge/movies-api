const request = require("supertest");
const { User } = require("../models/User");

let server;

describe("Users", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });
  describe("GET /", () => {
    it.todo("get all users");
  });
  describe("POST /", () => {
    let post;

    beforeEach(() => {
      post = {
        name: "Mario",
        email: "mario@nintendo.com",
        password: "12344567",
      };
    });

    const exec = async () => {
      return await request(server).post("/api/users").send(post);
    };

    it("should return 400 if the input is not valid", async () => {
      post = {};

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/name/i);
    });

    it("should return 400 if the email is missing", async () => {
      post.email = "";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/email/i);
    });

    it("should return 400 if the email is valid", async () => {
      post.email = "one";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/email/i);
    });

    it("should return 400 if the user already exists", async () => {
      let user = new User(post);
      user = user.save();

      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("user details should be saved, if the input is valid", async () => {
      const res = await exec();

      const user = await User.find({ email: post.email });

      expect(user.length).toBe(1);
      expect(user[0]).toHaveProperty("_id");
    });

    it("user along with token should be returned, if the input is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("name", post.name);
      expect(res.body).toHaveProperty("email", post.email);
    });
  });
});
