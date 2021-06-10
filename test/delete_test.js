const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("class method remove", (done) => {
    //Remove a bunch of recoreds with some given criteria
    User.deleteMany({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(!user);
        done();
      });
  });

  it("class method findAndRemove", (done) => {
    User.deleteOne({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method find by id and remove", (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
