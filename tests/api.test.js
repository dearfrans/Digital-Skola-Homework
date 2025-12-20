const { expect } = require("chai");
const Ajv = require("ajv");

let token;

describe("API Automation Belajar Bareng", function () {

  it("POST Login - Positive Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          password: "admin"
        })
      }
    );

    expect(response.status).to.equal(200);

    const data = await response.json();
    expect(data.message).to.equal("Login successful");

    token = data.token;
  });

  it("POST Login - Negative Case", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          password: "salah"
        })
      }
    );

    expect(response.status).to.not.equal(200);

    const data = await response.json();
    expect(data.message).to.exist;
  });

  it("GET List Users", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    expect(response.status).to.equal(200);

    const data = await response.json();
    expect(data.users).to.be.an("array");
  });

});
