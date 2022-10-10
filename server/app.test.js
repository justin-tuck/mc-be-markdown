import request from "supertest";
import app from "./app.js";

describe("POST /createHTML", () => {
  describe("given markdown", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).post("/createHTML").send({
        markdown: "# Heading 1",
      });
      expect(response.statusCode).toBe(200);
    });
    test("should specify json in content header", async () => {
      const response = await request(app).post("/createHTML").send({
        markdown: "# Heading 1",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("response has html", async () => {
      const response = await request(app).post("/createHTML").send({
        markdown: "# Heading 1",
      });
      expect(response.body.html).toBeDefined();
    });
  });

  describe("given no markdown", () => {
    test("should respond with a status code of 400 - missing information", async () => {
      const response = await request(app).post("/createHTML").send({});
      expect(response.statusCode).toBe(400);
    });
  });
});
