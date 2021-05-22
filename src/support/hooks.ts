const { BeforeAll, Before, After, AfterAll, Status } = require("cucumber");
import { browser } from "protractor";
import { logger } from "./logger";


declare let global :any;

Before((scenario) => {
    global.tcname = scenario.pickle.name.replace(/\s/g,'_').toLowerCase();
    logger(global['tcname'],'********** START **********');
});

After({timeout: 100 * 1000}, async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
         const screenShot = await browser.takeScreenshot();
         this.attach(screenShot, "image/png");
    }
    return await browser.manage().deleteAllCookies();
});

AfterAll({timeout: 100 * 1000}, async () => {
    await browser.close();
    return await browser.quit();
});

export const tcname = global.tcname;