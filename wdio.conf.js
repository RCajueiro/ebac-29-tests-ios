export const config = {
    // runner: 'local',
    // port: 4723,

    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    hostname: 'ondemand.us-west-1.saucelabs.com',
    port: 443,
    path: '/wd/hub',

    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:app': 'storage:filename=ebacshop.aab', // The filename of the mobile app
        'appium:deviceName': 'Samsung.*',
        'appium:platformVersion': '10',
        'appium:automationName': 'UiAutomator2',
        'appium:disableIdLocatorAutocompletion': true,
        'sauce:options': {
            build: 'appium-build-teste-ebacshop',
            name: 'EBAC Shop Teste',
            deviceOrientation: 'PORTRAIT',
            appiumVersion: '2.0.0'
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
            await driver.takeScreenshot();
    }
};