const fs = require("fs");

async function takeScreenshot(driver, path) {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(path, image, "base64");
}

module.exports = { takeScreenshot };