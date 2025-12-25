const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");

describe("SauceDemo - Login & Sort A-Z", function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async () => {
    await driver.quit();
  });

  it("Login sukses dan sort produk A-Z", async () => {
    // 1. Buka website
    await driver.get("https://www.saucedemo.com/");

    // 2. Login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // 3. Assert login berhasil
    const title = await driver.wait(
      until.elementLocated(By.className("title")),
      5000
    );
    expect(await title.getText()).to.equal("Products");

    // 4. Sort produk A-Z (PAKAI VALUE DROPDOWN)
    const sortDropdown = await driver.findElement(
      By.className("product_sort_container")
    );

    await driver.executeScript(
      "arguments[0].value = 'az'; arguments[0].dispatchEvent(new Event('change'));",
      sortDropdown
    );

    // Tunggu UI update
    await driver.sleep(2000);

    // 5. Ambil nama produk
    const products = await driver.findElements(
      By.className("inventory_item_name")
    );

    const productNames = [];
    for (let product of products) {
      productNames.push(await product.getText());
    }

    // 6. VALIDASI SORT A-Z (YANG BENAR)
    const expectedSorted = [...productNames].sort((a, b) =>
      a.localeCompare(b)
    );

    expect(productNames).to.deep.equal(
      expectedSorted,
      "Produk tidak terurut A-Z"
    );
  });
});
