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

  describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        username: "fitone12",
        email: "user1@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.email).toBe("user1@example.com");
        expect(user.username).toBe("fitone12");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        username: "fitone13",
        email: "It's-a me, Mario!",
        password: "1234567890"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {

      User.create({
        username: "fitone11",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {

        User.create({
          username: "fitone11",
          email: "user@example.com",
          password: "nananananananananananananananana BATMAN!"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#findByLogin", () => {
    it("should be able to find a user by username OR email", (done) => {
      User.create({
        username: "fitone14",
        email: "user22@example.com",
        password: "1234567890"
      }).then(user => {
        User.findByLogin("user22@example.com")
        .then(user => {
          expect(user).not.toBeNull();
          expect(user.username).toBe("fitone14");
          done();
        })
      }).catch(err => {
        console.log(err);
        done();
      })
    })
  })

})
