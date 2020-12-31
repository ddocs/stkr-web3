exports.config = {
    runner: 'local',
    specs: [
        './tests/**/*.test.js'
    ],
    suites: {
        simpleCoverage: [
            './tests/stake-unstake.test.js'
        ],
        fullStaking: [
            './tests/full-stake.test.js'
        ],
    },
    exclude: [
        // './tests/stake-unstake.test.js',
        // './tests/full-stake.test.js'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--load-extension=./metamask/metamaskChrome',
            ],
        },
        acceptInsecureCerts: true
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://goerli.stkr.io/',
    waitforTimeout: 25000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 100000
    },
    beforeTest: function () {
        const chai = require('chai')
        global.assert = chai.assert
        global.should = chai.should
        global.expect = chai.expect
    },
}
