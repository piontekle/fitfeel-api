import request from "request";
import server from "../../server.js";

const base = "http://localhost:8080/api/";

describe("routes : static", () => {
  describe("GET /", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain("Connected!");

        done();
      });
    });
  });

});
