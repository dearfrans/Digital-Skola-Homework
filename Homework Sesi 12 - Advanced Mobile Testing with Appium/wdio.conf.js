exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '16.0', // Pastikan versi Android di emulator sesuai
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': 'C:\\Users\\Asus\\Downloads\\ApiDemos-debug.apk',
        
        // --- REVISI STABILITAS ---
        'appium:noReset': false,          // Diubah ke false agar session selalu bersih (mencegah crash)
        'appium:fullReset': false,
        'appium:appWaitActivity': '*',    // Menunggu activity aplikasi stabil sebelum mulai
        'appium:newCommandTimeout': 300,  // Memberi waktu lebih lama sebelum session timeout
        'appium:adbExecTimeout': 60000,   // Menambah waktu eksekusi perintah ADB
        'appium:uiautomator2ServerInstallTimeout': 60000 // Menambah waktu instalasi driver
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
        timeout: 120000 // Ditambah ke 120 detik karena proses mobile testing butuh waktu lebih lama
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}