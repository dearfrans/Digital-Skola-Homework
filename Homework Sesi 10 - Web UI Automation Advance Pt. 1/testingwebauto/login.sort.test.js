const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("SauceDemo - Login & Sort A-Z (Advance)", function () {
  this.timeout(30000);
  let driver;

  // 🔹 Dijalanin sekali sebelum semua test
  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // 🔹 Dijalanin sebelum tiap test
  beforeEach(async () => {
    await driver.get("https://www.saucedemo.com/");
  });

  // 🔹 Test case
  it("Login sukses dan sort produk A-Z", async () => {
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    const title = await driver.wait(
      until.elementLocated(By.className("title")),
      5000
    );
    expect(await title.getText()).to.equal("Products");

    const sortDropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await sortDropdown.sendKeys("Name (A to Z)");

    await driver.sleep(1500);

    const products = await driver.findElements(
      By.className("inventory_item_name")
    );

    const productNames = [];
    for (let product of products) {
      productNames.push(await product.getText());
    }

    const sortedNames = [...productNames].sort();
    expect(productNames).to.deep.equal(sortedNames);
  });

  // 🔹 Dijalanin sekali setelah semua test
  after(async () => {
    await driver.quit();
  });
});
