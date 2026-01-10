exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '16.0',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'C:\\Users\\Asus\\Downloads\\ApiDemos-debug.apk',
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:appWaitActivity': '*',
        'appium:newCommandTimeout': 300,
        'appium:adbExecTimeout': 60000,
        'appium:uiautomator2ServerInstallTimeout': 60000
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}