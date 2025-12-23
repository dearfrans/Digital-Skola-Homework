const { expect } = require("chai");

const BASE_URL = "https://belajar-bareng.onrender.com/api";
let token;

describe("GET /users", function () {

  // Login dulu untuk ambil token
  before(async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    const data = await response.json();
    token = data.token;
  });

  it("Get List Users Successfully", async function () {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    // Assert 1: Status Code
    expect(response.status).to.equal(200);

    // Assert 2: Response Body
    expect(data).to.have.property("users");
    expect(data.users).to.be.an("array");
  });

});
