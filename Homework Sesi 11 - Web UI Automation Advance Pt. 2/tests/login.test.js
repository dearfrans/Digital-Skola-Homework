const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");

describe("Login & Sort Product", function () {
  this.timeout(30000);
  let driver, loginPage, inventoryPage;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("User can login and sort product A-Z", async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.sortAZ();
  });
});