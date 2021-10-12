const request = require("supertest");
const { Genre } = require("../models/Genre");
const mongoose = require("mongoose");
let server;

describe("genres", () => {
  beforeEach(() => {
    server = require("../index");
  });
  afterEach(async () => {
    await Genre.deleteMany({});
    server.close();
  });
  describe("GET /", () => {
    it("should return status 200", async () => {
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
    });

    it("should return all the genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre 1" },
        { name: "genre 2" },
      ]);

      const res = await request(server).get("/api/genres");

      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre 1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre 2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    // should return 401 for unauthorized
    it.todo("should return 401 if not authorized ");

    // should return 404 for id
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/12345");

      expect(res.status).toBe(404);
    });

    // should return 404 if no genre with the given id exists
    it("should return 404 if no genre with the given id exists ", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/genres/${id}`);

      expect(res.status).toBe(404);
    });

    // should return a genre if valid id is passed
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
  describe("POST /", () => {
    let post = {};

    const exec = async () => {
      return await request(server).post("/api/genres").send(post);
    };

    beforeEach(() => {
      post = {};
    });

    it("should return 400, if the input is not valid", async () => {
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400, if the name is less than 5", async () => {
      post.name = "gen";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400, if the name is greater than 50", async () => {
      post.name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save genre, if it is valid", async () => {
      // post a valid genre to the server
      post.name = "genre 1";

      const res = await exec();

      const genre = await Genre.find({ name: post.name });

      expect(genre).not.toBeNull();
      expect(genre[0]).toHaveProperty("_id");
    });

    it("should return a genre, if it is valid", async () => {
      // post a valid genre to the server
      post.name = "genre 1";

      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", post.name);
    });
  });
  describe("PUT /", () => {
    let input;
    let id;
    let genre;

    beforeEach(async () => {
      input = { name: "genre 1" };
      genre = new Genre({ name: "genre 1" });
      genre = await genre.save();
      id = genre._id;
    });

    const exec = async () => {
      return await request(server).put(`/api/genres/${id}`).send(input);
    };

    // should return 404 if the id is invalid
    it("should return 404 if the id is invalid", async () => {
      id = 1;
      const res = await exec();
      expect(res.status).toBe(404);
    });
    //
    it("should return 404 if the genre does not exist", async () => {
      id = mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(404);
    });
    // should return 400 if the genre is less than 5 characters
    it("should return 400 if the genre is less than 5 characters", async () => {
      input.name = "gen";

      const res = await exec();
      expect(res.status).toBe(400);
    });
    // should return 400 if the genre is greater than 50 characters
    it("should return 400 if the genre is greater than 50 characters", async () => {
      input.name = new Array(52).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should update the genre if it is valid", async () => {
      input.name = "genre 2";
      const res = await exec();

      const updatedGenre = await Genre.findById(genre._id);
      expect(updatedGenre.name).toBe(input.name);
    });
  });
});
