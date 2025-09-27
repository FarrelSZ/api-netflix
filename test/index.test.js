require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Resource /my-movies", () => {
  it("should return success get favorite movies", async () => {
    const response = await request(app).get("/my-movies/tes1@gmail.com/688b238c6bb8cca57820980c");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get Favorite Movies Success");
  });

  it("should return unauthorized get favorite movies", async () => {
    const response = await request(app).get("/my-movies/tes1@gmail.com/882321hbjbas");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return failed to save favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "tes1@gmail.com",
        token: "123213t78sadhasb",
        data: {
          id: 1,
          title: "testing",
          desc: "testing testing",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return success to save favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "tes1@gmail.com",
        token: "688b238c6bb8cca57820980c",
        data: {
          id: 1,
          title: "testing",
          desc: "testing testing",
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Add Favorite Movies Success");
  });
});
