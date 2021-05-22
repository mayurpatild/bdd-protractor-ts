import { browser, Config } from "protractor";
import { Reporter } from "./support/reporter";
const jsonReports = process.cwd() + "/reports/json";
const htmlReport = process.cwd() + "/reports/html";

export const config: Config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: true,

    baseUrl: "https://www.protractortest.org",

    params: {
        environment: "DEV"
    },

    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--disable-dev-shm-usage']
        }
    },

    directConnect: true,

    ignoreUncaughtExceptions: false,

    framework: "custom",
    
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../src/features/**/*.feature",
    ],

    onPrepare: async () => {
        await browser.waitForAngularEnabled(true);
        await browser.manage().timeouts().implicitlyWait(15000);
        await browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports, htmlReport);        
    },

    cucumberOpts: {
        format: ["message","json:../../reports/json/cucumber-report.json","html","@cucumber/pretty-formatter"],
        require: ["../../typeScript/src/step_definitions/*.steps.js", "../../typeScript/src/support/*.js", "../../typeScript/src/pages/*.po.js"],
        tags: "@api or @guide",
    },

    onComplete: () => {
        try {
            Reporter.createHTMLReport();
        } catch (err) { }
    },

    allScriptsTimeout: 120000,

    getPageTimeout: 60000,
    
    restartBrowserBetweenTests: false
};
