const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const { takeScreenshot } = require("../utils/visualHelper");

describe("Visual Testing - Inventory Page", function () {
  this.timeout(30000);
  let driver, loginPage;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("Capture inventory page visual", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await takeScreenshot(
      driver,
      "screenshots/actual/inventory.png"
    );
  });
});