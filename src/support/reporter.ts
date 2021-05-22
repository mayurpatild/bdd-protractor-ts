import * as reporter from "multiple-cucumber-html-reporter";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
import { hostname, userInfo } from "os";
const jsonReports = path.join(process.cwd(), "/reports/json/");
const htmlReports = path.join(process.cwd(), "/reports/html");
const screenshots = path.join(process.cwd(), "/screenshots/");

const cucumberReporterOptions = {
    theme: 'bootstrap',
    jsonDir: jsonReports,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'Application': 'Protractor Website',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome 87',
        'Platform': 'MAC OS',
        'Parallel': 'Scenarios'
    },
    screenshotsDirectory: screenshots,
    storeScreenshots: true
};

const multiCucumberReporterOptions = {
    jsonDir: jsonReports,
    reportPath: htmlReports,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    screenshotsDirectory: screenshots,
    storeScreenshots: true,
    metadata: {
        browser: {
            name: 'chrome',
            version: '87'
        },
        platform: {
            name: 'ubuntu',
            version: '16.04'
        },
        device: ''+hostname,
        Parallel: 'Scenarios'
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'Custom project' },
            { label: 'Release', value: '1.2.3' },
            { label: 'Cycle', value: 'B11221.34321' },
            { label: 'Username', value: userInfo().username }
        ]
    },
    displayDuration: true,
    reportName: "Report Dashboard",
    pageTitle: "Report Dashboard",
    pageFooter: "<div class=\"created-by\"><p class=\"footer-text\">Made with <img alt=\"❤️\" draggable=\"false\" src=\"https://twemoji.maxcdn.com/2/72x72/2764.png\" style=\"height: 1em; width: 1em; margin: 0px 0.05em 0px 0.1em; vertical-align: -0.1em;\"> by <a href=\"http://mayurpatild.github.io/portfolio/\" target=\"_blank\">Mayur Patil</a></p>" +
        "<a href=\"https://github.com/mayurpatild/\" target=\"_blank\"><i class=\"fa fa-github-square fa-2x\"></i></a>" +
        "<a href=\"http://nl.linkedin.com/in/mayurpatild\" target=\"_blank\"><i class=\"fa fa-linkedin-square fa-2x\"></i></a></div>"
}

export class Reporter {
    
    public static startTime;
    public static createDirectory(json: string, html: string) {
        this.startTime= new Date();
        if (!fs.existsSync(json)) {
            mkdirp.sync(json);
            mkdirp.sync(html);
        }
    }

    public static createHTMLReport() {
        try {
            reporter.generate(multiCucumberReporterOptions,
                multiCucumberReporterOptions.customData.data.push(
                    { label: 'Execution Start Time', value: ''+this.startTime },
                    { label: 'Execution End Time',value: ''+new Date() }
                ));
        } catch (err) { }
    }
}
