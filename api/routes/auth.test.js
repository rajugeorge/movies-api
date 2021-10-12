const { User } = require("../models/User");
const request = require("supertest");
const bcrypt = require("bcrypt");

let server;
describe("Authentication", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(async () => {
    await User.deleteMany({});
    server.close();
  });
  describe("POST / ", () => {
    let existingUser;
    let credentials;

    beforeEach(async () => {
      // create a user
      existingUser = new User({
        name: "Mario",
        email: "ma@nin.com",
        password: "pass123456",
      });
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(existingUser.password, salt);
      existingUser = await existingUser.save();

      credentials = {
        email: "ma@nin.com",
        password: "pass123456",
      };
    });

    const exec = async () => {
      return await request(server).post("/api/auth").send(credentials);
    };

    it("should return 400 if the input is invalid", async () => {
      credentials = {};
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 404 if the user does not exist", async () => {
      credentials.email = "nouse@test.com";
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 401 if the credentials are invalid", async () => {
      credentials.password = "wrongpass33";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return valid token if the credentials are valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("token");
    });
  });
});
