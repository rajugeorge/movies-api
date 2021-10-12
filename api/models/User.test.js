const { User } = require("./User");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("User model", () => {
  it("should return a valid JWT", () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);
    const token = user.generateAuthToken();
    var decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
