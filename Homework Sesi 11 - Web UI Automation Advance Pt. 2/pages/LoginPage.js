const { By } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.username = By.id("user-name");
    this.password = By.id("password");
    this.loginBtn = By.id("login-button");
  }

  async open() {
    await this.driver.get("https://www.saucedemo.com/");
  }

  async login(user, pass) {
    await this.driver.findElement(this.username).sendKeys(user);
    await this.driver.findElement(this.password).sendKeys(pass);
    await this.driver.findElement(this.loginBtn).click();
  }
}

module.exports = LoginPage;