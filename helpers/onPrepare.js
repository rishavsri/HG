
const { element } = require("protractor");
var logGenerator = require("./logGenerator.js");
var logger = logGenerator.getApplicationLogger();
var EC = protractor.ExpectedConditions;

global.isAngularApp = function (flag) {
    browser.ignoreSynchronization = !flag;
};


global.hyperdriveLogin = function () {
    // catalogPage = new Catalog();
    var EC = protractor.ExpectedConditions;
    isAngularApp(false);
    browser.get(browser.params.url).then(function () {
        // console.log("I am Running:-",element(by.id(logins)).isPresent());
        logger.info("Launched browser and navigated to URLs: " + browser.params.url);
        // browser.sleep(5000);
        logger.info("Element checking" + element(by.id("logins")).isPresent());

        //Hybrid Authentication
        element(by.id("logins")).isPresent().then(function (status) {
            if (!status) {
                element(by.xpath("//*[contains(text(),'Log in with Email')]")).click();
                browser.wait(EC.visibilityOf(element(by.id("login"))), 60000).then(function () {
                    element(by.id("login")).sendKeys(browser.params.username).then(function () {
                        logger.info("Entered username - " + browser.params.username);
                        browser.wait(EC.visibilityOf(element(by.id("password"))), 60000).then(function () {
                            element(by.id("password")).sendKeys(browser.params.password).then(function () {
                                logger.info("Entered password ");
                                browser.wait(EC.elementToBeClickable(element(by.id("submit-login"))), 60000).then(function () {
                                    element(by.id("submit-login")).click().then(function () {
                                        logger.info("Clicked on Sign In button");
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    });
}

module.exports = {}
