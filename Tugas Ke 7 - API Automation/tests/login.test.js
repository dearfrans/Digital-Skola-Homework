const { expect } = require("chai");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });
const BASE_URL = "https://belajar-bareng.onrender.com/api";

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

describe("POST /login", function () {

  // =========================
  // Positive Case
  // =========================
  it("Login Successful (Positive Case)", async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "admin",
      }),
    });

    const data = await response.json();

    // Assert 1: Status Code
    expect(response.status).to.equal(200);

    // Assert 2: Schema Validation
    const validate = ajv.compile(loginSchema);
    const isValid = validate(data);
    expect(
      isValid,
      `Schema error: ${JSON.stringify(validate.errors)}`
    ).to.be.true;

    // Assert tambahan
    expect(data.message).to.equal("Login successful");
  });

  // =========================
  // Negative Case
  // =========================
  it("Login Failed - Wrong Password (Negative Case)", async function () {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "password_salah",
      }),
    });

    const data = await response.json();

    // Assert 1: Status Code
    expect(response.status).to.not.equal(200);

    // Assert 2: Response Body
    expect(data).to.have.property("message");
    expect(data.message).to.not.equal("Login successful");
  });

});
