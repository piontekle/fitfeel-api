const request = require("request");
const server = require("../../server");
const base = "http://localhost:8080/api/users/"

const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

const authHelper = require("../../src/helpers/auth");

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
        url: `${base}register`,
        form: {
          name: "Athlete Two",
          email: "user123@example.com",
          password: "123456"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "user123@example.com" } })
        .then(user => {
          expect(res.statusCode).toBe(200);
          expect(user).not.toBeNull();
          expect(user.name).toBe("Athlete Two");
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
        url: `${base}register`,
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

  describe("POST /sign-in", () => {
    it("should sign a user with valid credentials in", (done) => {
      authHelper.hashPassword("123456")
      .then(hashedPass => {
        User.create({
          name: "Athlete Test",
          email: "athlete@sports.com",
          password: hashedPass
        })
        .then(user => {
          const options = {
            url: `${base}sign-in`,
            form: {
              email: user.email,
              password: "123456"
            }
          }

          request.post(options, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toContain("Sign in successful.");
            done();
          })
        }).catch(err => {
          console.log(err);
          done();
        })
      })
    });

    it("should reject a user with invalid credentials", (done) => {
      authHelper.hashPassword("123456")
      .then(hashedPass => {
        User.create({
          name: "Athlete Test",
          email: "athleteno1@sports.com",
          password: hashedPass
        }).then(user => {
          const options = {
            url: `${base}sign-in`,
            form: {
              email: user.email,
              password: "7891011"
            }
          }

          request.post(options, (err, res, body) => {
            expect(res.statusCode).toBe(401);
            expect(res.body).toContain("Invalid username or password.");
            done();
          })

        })
      })

    })

  });

});
