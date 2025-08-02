import allure from '@wdio/allure-reporter'
import 'dotenv/config'

export const config = {
    user: 'ramon.teste',
    key: 'b4fea5fd-943e-423f-9fef-8664ba8cb188',
    hostname: 'ondemand.us-west-1.saucelabs.com',
    port: 443,
    path: '/wd/hub',


    services: ['sauce'],
    specs: [
        './test/specs/**/*.test.js'
    ],
    suites: {
        products: [
            './test/specs/login.test.js',
            './test/specs/product.test.js',
            './test/specs/search.test.js'
        ],
        checkout: [
            './test/specs/cart.test.js'
        ]
    },
    framework: 'mocha',
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone XR Simulator',
        'appium:platformVersion': '17.0',
        'appium:automationName': 'XCUITest',
        'appium:app': 'storage:filename=LojaEBAC-sim.zip',
        'sauce:options': {
            build: 'EBAC Teste',
            name: 'ebac_test'
        }
    }],
    waitforTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: function (test, scenario, { error, duration, passed }) {
        if(error) {
            driver.takeScreenshot()
        }
    },
    beforeSuite: async function(){
        //verificar se o app já está instalado e executando
        let state = await driver.queryAppState("br.art.ebaconline")
        if(state !== 4){
            await driver.execute('mobile: launchApp', { bundleId: "br.art.ebaconline" })
        }
    },
    afterSuite: async function(){
        //fechar o app
        await driver.execute('mobile: terminateApp', { bundleId: "br.art.ebaconline" })
    },
    maxInstances: 1
}