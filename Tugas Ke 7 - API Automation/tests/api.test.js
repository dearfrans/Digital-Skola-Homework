const { expect } = require("chai");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });
const BASE_URL = "https://belajar-bareng.onrender.com/api";
let globalToken;

// JSON Schema untuk response login (positive case)
const loginSchema = {
  type: "object",
  properties: {
    status: { type: "number" },
    token: { type: "string" },
    message: { type: "string" },
  },
  required: ["status", "token", "message"],
};

describe("API Automation Project - Belajar Bareng", function () {

  // =========================
  // 1. POST Login - Positive
  // =========================
  it("POST Login - Positive Case", async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    const data = await response.json();
    globalToken = data.token;

    // Assert 1: Status Code
    expect(response.status).to.equal(200);

    // Assert 2: Schema Validation
    const validate = ajv.compile(loginSchema);
    const isValid = validate(data);
    expect(
      isValid,
      `Schema validation error: ${JSON.stringify(validate.errors)}`
    ).to.be.true;

    // Additional Assert
    expect(data.message).to.equal("Login successful");
  });

  // =========================
  // 2. POST Login - Negative
  // =========================
  it("POST Login - Negative Case (Wrong Password)", async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin",
        password: "password_salah",
      }),
    });

    const data = await response.json();

    // Assert 1: Status Code (tidak boleh 200)
    expect(response.status).to.not.equal(200);

    // Assert 2: Response Body
    expect(data).to.have.property("message");
    expect(data.message).to.not.equal("Login successful");
  });

  // =========================
  // 3. GET List Users
  // =========================
  it("GET List Users", async function () {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${globalToken}`,
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
