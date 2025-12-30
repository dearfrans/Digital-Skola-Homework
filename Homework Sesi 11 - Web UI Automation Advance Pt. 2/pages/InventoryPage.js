const { By } = require("selenium-webdriver");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.sortDropdown = By.className("product_sort_container");
  }

  async sortAZ() {
    await this.driver.findElement(this.sortDropdown).sendKeys("az");
  }
}

module.exports = InventoryPage;