const request = require("supertest");
const app = require("../Server");

// Test 1: Root endpoint returns API info
test("GET / returns API info", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("message");
});

// Test 2: Accessing protected route without token returns 401
test("GET /tasks without token returns 401", async () => {
  const res = await request(app).get("/tasks");
  expect(res.statusCode).toBe(401);
});

// Test 3: Unknown route returns 404
test("GET /unknown returns 404", async () => {
  const res = await request(app).get("/unknown-route");
  expect(res.statusCode).toBe(404);
});
