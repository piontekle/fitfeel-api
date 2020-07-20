const request = require("request");
const server = require("../../server");
const base = "http://localhost:8080/api/"

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("POST /register", () => {
    it("should create a user with valid values", (done) => {
      const options = {
        url: `${base}users/register`,
        form: {
          name: "Athlete",
          email: "user123@example.com",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "user123@example.com" } })
        .then(user => {
          expect(res.statusCode).toBe(200);
          expect(user).not.toBeNull();
          expect(user.name).toBe("Athlete");
          expect(user.email).toBe("user123@example.com");
          done();
        })
        .catch(err => {
          console.log(err);
          expect(err).toBeNull();
          done();
        })
      })
    });

    it("should not create a user with an invalid email", (done) => {
      const options = {
        url: `${base}users/register`,
        form: {
          name: "Athlete",
          email: "noemail",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "no" } })
        .then(user => {
          expect(user).toBeNull();
          done();
        })
        .catch(err => {
          expect(res.statusCode).toBe(500);
          expect(err).toContain("Validation error");
          done();
        })
      })
    });

  });

});
