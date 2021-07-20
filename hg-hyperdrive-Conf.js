/************************************************
  AUTHOR: PRAKASH PRABHAT
************************************************/
"use strict";
var logGenerator = require("./helpers/logGenerator.js"),
  logger = logGenerator.getApplicationLogger(),
  jasmineReporters = require('jasmine-reporters'),
  Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter'),
  util = require("./helpers/util.js"),
  browser = process.env.Browser,
  buildURL = process.env.BUILD_URL,
  environment = process.env.Environment,
  SNOW_Version = process.env.SNOW_Version,
  username = process.env.Email,
  password = process.env.Password,
  secretKey = process.env.secretKey,
  language = process.argv[3],
  suitesList = process.env.Suites,
  isProvisioningRequired = process.env.isProvisioningRequired,
  isDummyAdapterDisabled = process.env.isDummyAdapterDisabled,
  runSnowDiscovery = process.env.runSnowDiscovery,
  skipImiConfig = process.env.skipImiConfig,
  postSlack = process.env.POST_TO_SLACK,
  postSlackWebhookURL = process.env.POST_TO_SLACK_WEBHOOK_URL,
  currentDirectory = process.cwd();


if (browser == null)
  browser = "chrome"
//browser = "firefox"
if (environment == null)
  environment = "qa.hyperdrive.solutions/"
if (username == null)
  username = "user@example.com"
if (password == null)
  password = "slX3MW5Q3hcKAxqqimfUcBxVb2GEuLjr"
if (secretKey == null)
  secretKey = ""
if (suitesList == null)
  // suitesList = "Foundation_User,Foundation_Credentials,DataScience_Project,DataScience_Data"
  suitesList = "Datascience_Notebookserver"
if (isProvisioningRequired == null)
  isProvisioningRequired = "true";
if (isDummyAdapterDisabled == null)
  isDummyAdapterDisabled = "true";
if (runSnowDiscovery == null)
  runSnowDiscovery = "true";
if (postSlack == null)
  postSlack = "false";
if (postSlackWebhookURL == null)
  postSlackWebhookURL = ""
if (skipImiConfig == null)
  skipImiConfig = "false"


if (language == undefined || browser != "chrome") {
  language = "en";
} else {
  language = process.argv[3].substring(2)
}

global.SNOW_Version = SNOW_Version;
logger.info("******Printing Environment Variables*******")
logger.info("Test browser: " + browser)
logger.info("Test environment: " + environment)
logger.info("Username: " + username)
logger.info("Suites: " + suitesList)
logger.info("Provisioning: " + isProvisioningRequired)
logger.info("isDummyAdapterDisabled: " + isDummyAdapterDisabled)
logger.info("SnowDiscovery: " + runSnowDiscovery)
logger.info("Post to Slack: " + postSlack)
logger.info("skipImi: " + skipImiConfig)
logger.info("Language code on which tests are running: " + language);
logger.info("*******************************************")
var specArray = util.generateRuntimeSpecString(suitesList);
logger.info(specArray);

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 1740000,
  //allScriptsTimeout: 120000, //2 mins to wait for a single async request.
  useAllAngular2AppRoots: true,
  directConnect: true,
  specs: specArray,

  /* capabilities: {
      browserName: browser,
      chromeOptions: {args: ["--nonheadless","--disable-gpu","--window-size=1500,2000",'disable-extensions',"--test-type","--no-sandbox"]}
      //chromeOptions: {args: ['disable-extensions',"--test-type","--no-sandbox"]}
  },
  capabilities: {
      'browserName': browser,
      'moz:firefoxOptions': {
        'args': ['--safe-mode']
      }
    },*/

  framework: 'jasmine2',
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 5400000,
    //defaultTimeoutInterval : 260000, //15 mins timeout to run a single test
    // allScriptsTimeout: 20000000,
    useAllAngular2AppRoots: true
  },

  params: {
    url: "http://" + environment,
    username: username,
    password: password,
    postSlack: postSlack,
    isProvisioningRequired: isProvisioningRequired,
    language: language,
    secretKey: secretKey,
    isDummyAdapterDisabled: isDummyAdapterDisabled,
    runSnowDiscovery: runSnowDiscovery,
    buildURL: buildURL,
    postSlackWebhookURL: postSlackWebhookURL,
    skipImiConfig: skipImiConfig
  },

  plugins: [{
    package: "jasmine2-protractor-utils",
    disableHTMLReport: true,
    disableScreenshot: false,
    screenshotPath: "./testreports/screenshots",
    screenshotOnExpectFailure: false,
    screenshotOnSpecFailure: true,
    clearFoldersBeforeTest: true
  }],

  onPrepare: function () {
    if (browser == "chrome") {
      global.resLangCode = langCode.split("=")[1];
      util.removeDir("testreports/" + resLangCode + "/");
    }
    require('./helpers/onPrepare.js');
    hyperdriveLogin();

    var myReporter = {
      suiteStarted: function (result) {
        logger.info("Suite started: " + result.description);
      },
      specStarted: function (result) {
        logger.info("Test started: " + result.description);
      },
      specDone: function (result) {
        logger.info("Test " + result.status + ": " + result.description);
        for (var i = 0; i < result.failedExpectations.length; i++)
          logger.info("Failure reason: " + result.failedExpectations[i].message);
        logger.info("-------------------------------------------------------------------------------------------");
      },
      suiteDone: function (result) {
        logger.info("afterAll " + result.status + ": " + result.description);
        for (var i = 0; i < result.failedExpectations.length; i++) {
          logger.info("Failure reason: " + result.failedExpectations[i].message);
          logger.info(result.failedExpectations[i].stack);
        }
        logger.info("-------------------------------------------------------------------------------------------");
        logger.info("Suite completed: " + result.description);
        logger.info("===========================================================================================");
      }
    };
    jasmine.getEnv().addReporter(myReporter);
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: 'testreports',
      consolidate: true,
      useDotNotation: true
    }));

    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: 'screenshotreports',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        //fileNamePrefix: 'Foundation_UserTest',
        fileNamePrefix: 'Datascience_projectTest',
        fixedScreenshotName: true
      })
    );
  },
  onComplete: async function () {
    var reportGenerator = require('./helpers/utilToolsIntegration.js');
    var foundationUsers = require('../../pageObjects/foundation.userspageObject.js')
    // Set suite name to 'UIAuto' in 'junitresults.xml'
    await setSuiteName("UIAuto");
    await postToSlack().then(function () {
      //reportGenerator.generateHTMLReport('Foundation-User');
      reportGenerator.generateHTMLReport('Hyperdrive-Test-Report');
    });
  }
};

if (browser == "chrome") {
  exports.config["capabilities"] = {
    browserName: browser,
    //chromeOptions: {args: ["lang="+language,"--nonheadless","--disable-gpu","--window-size=2080,1920",'disable-extensions',"--test-type","--no-sandbox"]}
    chromeOptions: {
      args: ["lang=" + language, "--nonheadless", 'incognito', "--disable-gpu", "--window-size=1920,1080", 'disable-extensions', "--test-type", "--no-sandbox"],
      prefs: {
        download: {
          'prompt_for_download': false,
          'directory_upgrade': true,
          'default_directory': currentDirectory + "/downloads/exportedServices"
        },
        'browser': {
          'set_download_behavior': {
            'behavior': 'allow'
          }
        },
        'safebrowsing': {
          'enabled': true
        },
        'profile': {
          'default_content_setting_values': { 'automatic_downloads': 1 },
          'content_settings': {
            'pattern_pairs': {
              '*': {
                "multiple-automatic-downloads": 1
              }
            }
          }
        }
      }
    }

    //chromeOptions: {args: ["lang="+language,'disable-extensions',"--test-type","--no-sandbox"]}
    //chromeOptions: {args: ["lang="+language,"--nonheadless",'disable-extensions',"--test-type","--no-sandbox"]
  }

} else if (browser = "firefox") {
  exports.config["capabilities"] = {
    'browserName': browser,
    'moz:firefoxOptions': {
      // 'args': ['--safe-mode','--window-size=1440,900']
      'args': ['--nonheadless', '--window-size=1440,900']

    }
  }

}
if (browser == "chrome") {
  var langCode = (exports.config["capabilities"].chromeOptions["args"][0]);
  //logger.info("Langauge Code:" +langCode);
}
