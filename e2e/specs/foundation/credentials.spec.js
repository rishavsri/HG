/*
Spec_Name: credentials.spec.js 
Description: This spec will cover E2E testing of User Management Credentials".   
Author: Prakash Prabhat
*/

"use strict";

const { browser, element } = require('protractor');

var foundationCredentials = require('../../pageObjects/foundation.credentialspageObject.js'),
    async = require('async'),
    logGenerator = require("../../../helpers/logGenerator.js"),
    logger = logGenerator.getApplicationLogger(),
    appUrls = require('../../../testData/appUrls.json'),
    util = require('../../../helpers/util.js'),
    userTemplate = require('../../../testData/Foundation/UserDetails.json')
    ;


describe("Foundation - Credentials", function () {
    var foundationCredentialsPage;
    var messageStrings = {
        accountNameErrorMessage: "An account name must be no more than 64 characters",
        descriptionErrorMessage: "A description must be no more than 250 characters",
        serviceTypeErrorMessage: "A service type is required",
        serviceErrorMessage: "A service is required",
        accessKeyErrorMessage: "An access key with no more than 20 characters is required",
        accessSecretErrorMessage: "An access secret must be no more than 40 characters is required",
        credentialsSummaryPageTitle:"Credentials",

    };
    var accountName = "Accnt_" + util.getRandomString(4);
    var accountDesc = "Desc_" + util.getRandomString(4);
    var accountId = "Id_" + util.getRandomString(4);
    var accessKey = "Access_" + util.getRandomString(4);
    var secretKey = "Secret" + util.getRandomString(4);
    var url = "http://" + util.getRandomString(4);
    var apiKey = "Api_" + util.getRandomString(4);
    var platformUrl = "Url_" + util.getRandomString(4);
    var mqttPortNum = util.getRandomNumber(4);
    var systemKey = "System_" + util.getRandomString(4);
    var systemSecret = "Secret_" + util.getRandomString(4);
    var devEmail = "Test_" + util.getRandomString(4) + "@example.com";
    var devPassword = "Password_" + util.getRandomString(4);
    var envName = "Env_" + util.getRandomString(4);
    var gafanaUrl = "Url_" + util.getRandomString(4);
    var usernName = "User_" + util.getRandomString(4);
    var password = "Pass_" + util.getRandomString(4);




    beforeAll(function () {
        foundationCredentialsPage = new foundationCredentials();
        browser.driver.manage().window().maximize();

    });

    beforeEach(function () {
        expect(util.getCurrentURL()).toMatch(appUrls.homePageUrl);
        foundationCredentialsPage.clickFoundation();
        foundationCredentialsPage.clickCredentials();

    });

    afterAll(function () {
        // element(By.xpath('//button[@aria-label="Close"]')).isPresent().then(function (result) {
        //     if (result) {
        //         element(By.xpath('//button[@aria-label="Close"]')).click().then(function () {
        //             logger.info("clicked on Close X Button Successfully...");
        //             // foundationUsersPage.clickLogOutUser();
        //             // browser.close();
        //         });
        //     } else {
        //         foundationUsersPage.clickLogOutUser();
        //         // browser.close();
        //     }
        // });
        // log out user 
    });

    xxit("add credentials functionality", function () {
        var index = 1;

        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        // foundationCredentialsPage.selectServiceType();
        // logger.info("clicked on Close X Button Successfully...");
        foundationCredentialsPage.selectServiceTypeList(index);
        browser.sleep(1000);
        // foundationCredentialsPage.selectServiceList(2);
        foundationCredentialsPage.clickContinueButton();
        // ========================= SDK Token ==================================
        // foundationCredentialsPage.enterEnvName(envName, index);
        // foundationCredentialsPage.selectAssignedToGroup();
        // foundationCredentialsPage.getTextOfAssignedGroupValue(index);
        // foundationCredentialsPage.clickGenerateSdkToken();
        // ========================= Reporting Service-wieght&bias==================================
        // foundationCredentialsPage.clickShowCredsCheckbox();
        // foundationCredentialsPage.enterUrl();
        // foundationCredentialsPage.enterApiKey();
        // foundationCredentialsPage.clickConnectButton();
        // ========================= Deployment Traget - Cloud Badge ==================================
        // foundationCredentialsPage.clickShowCredsCheckbox();
        // foundationCredentialsPage.enterPlatformUrl(platformUrl, index);
        // foundationCredentialsPage.enterMqttPortNumber(mqttPortNum, index);
        // foundationCredentialsPage.enterSystemKey(systemKey, index);
        // foundationCredentialsPage.entersystemSecret(systemSecret, index);
        // foundationCredentialsPage.enterDevEmail(devEmail, index);
        // foundationCredentialsPage.enterDevPassword(devPassword, index);
        // foundationCredentialsPage.clickConnectButton();
        // // ========================= Deployment Traget - kubernetes ==================================
        // foundationCredentialsPage.selectuploadConfRadioButton();
        // foundationCredentialsPage.clickBrowseButton();
        // foundationCredentialsPage.selectPasteAsTextRadioButton();
        // foundationCredentialsPage.enterTextForConfigFile();
        // foundationCredentialsPage.clickConnectButton();
        // ========================= Monitoring-gafana ==================================
        foundationCredentialsPage.enterGafanaUrl(gafanaUrl, index);
        foundationCredentialsPage.enterUsername(usernName, index);
        foundationCredentialsPage.enterPassword(password, index);
        foundationCredentialsPage.clickContinueButton();
        foundationCredentialsPage.selectAssignedToGroup();
        foundationCredentialsPage.getTextOfAssignedGroupValue(index);
        foundationCredentialsPage.clickFinishButton();



    });

    xit("Verify satisfying all fields and clicking Continue button navigates user to Aws credential pop-up display", function () {
        index = 1;
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.clickContinueButton();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        browser.sleep(1000);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.enterAccountId(accountId, index);
        foundationCredentialsPage.enterAccessKey(accessKey, index);
        foundationCredentialsPage.enterSecretKey(secretKey, index);
        foundationCredentialsPage.selectRegionList(0);
        foundationCredentialsPage.clickConnectButton();
        foundationCredentialsPage.selectAssignedToGroup();
        foundationCredentialsPage.getTextOfAssignedGroupValue(index);
        foundationCredentialsPage.clickFinishButton();

    });

    xit("Verify clicking Continue button displays an error message for Account Name, Description, Service Type, Services", function () {
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.clickContinueButton();
        expect(foundationCredentialsPage.getAccountNameTextErrorMsg()).toEqual(messageStrings.accountNameErrorMessage);
        expect(foundationCredentialsPage.getDescriptionTextErrorMsg()).toEqual(messageStrings.descriptionErrorMessage);
        expect(foundationCredentialsPage.getServiceTypeTextErrorMsg()).toEqual(messageStrings.serviceTypeErrorMessage);
        expect(foundationCredentialsPage.getServiceTextErrorMsg()).toEqual(messageStrings.serviceErrorMessage);

    });

    xit("Verify entering more than 64 characters for Account Name textfield and clicking enter results in error message displayed 'An account name must be no more than 64 characters'", function () {
        var index = 1;
        foundationCredentialsPage.clickAddCredentials();
        var accountName = "Accnt_" + util.getRandomString(60);
        foundationCredentialsPage.enterAccountName(accountName, index);
        logger.info("Total Character Length of Account Name Entered as:- ", accountName.length);
        browser.actions().sendKeys(protractor.Key.TAB).perform();
        expect(foundationCredentialsPage.getAccountNameTextErrorMsg()).toEqual(messageStrings.accountNameErrorMessage);
    });

    xit("Verify entering more than 250 characters for Description textfield and clicking enter results in error message displayed 'A description must be no more than 250 characters'", function () {
        var index = 1;
        var description = "Desc_" + util.getRandomString(248);
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountDesc(description, index);
        logger.info("Total Character Length of Description Entered as:- ", description.length);
        browser.actions().sendKeys(protractor.Key.TAB).perform();
        expect(foundationCredentialsPage.getDescriptionTextErrorMsg()).toEqual(messageStrings.descriptionErrorMessage);
    });

    xit("Verify clicking Connect button displays an error message for textfields Access Key , Access Secret", function () {
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.clickContinueButton();
        foundationCredentialsPage.clickConnectButton();
        expect(foundationCredentialsPage.getAccessKeyTextErrorMsg()).toEqual(messageStrings.accessKeyErrorMessage);
        expect(foundationCredentialsPage.getAccessSecretTextErrorMsg()).toEqual(messageStrings.accessSecretErrorMessage);
    
    });

    xit("Verify only 20 characters are allowed in textfield Access Key mandatory field ", function () {
        var index = 1;
        var accessKeyExpectedLength = 20;
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.clickContinueButton();
        var accessKey = "Access_" + util.getRandomString(13);
        foundationCredentialsPage.enterAccountId(accessKey, index);
        logger.info("Total Character Length of Access Key Entered as:- ", accessKey.length);
        expect(accessKeyExpectedLength).toBe(accessKey.length);

    });

    xit("Verify entering more than 20 characters for Access Key textfield and clicking enter results in error message displayed 'An access Key must be no more than 20 characters'", function () {
        var index = 1;
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.clickContinueButton();
        var accessKey = "Access_" + util.getRandomString(15);
        foundationCredentialsPage.enterAccessKey(accessKey, index);
        logger.info("Total Character Length of Access Key Entered as:- ", accessKey.length);
        browser.actions().sendKeys(protractor.Key.TAB).perform();
        expect(foundationCredentialsPage.getAccessKeyTextErrorMsg()).toEqual(messageStrings.accessKeyErrorMessage);

    });

    xit("Verify only 40 characters are allowed in textfield Access Secret mandatory field ", function () {
        var index = 1;
        var accessSecretExpectedLength = 40;
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.clickContinueButton();
        var accessSecret = "AccessSecret_" + util.getRandomString(27);
        foundationCredentialsPage.enterAccessSecret(accessSecret, index);
        logger.info("Total Character Length of Access Secret Entered as:- ", accessSecret.length);
        expect(accessSecretExpectedLength).toBe(accessSecret.length);

    });
    xit("Verify entering more than 40 characters for Access Secret textfield and clicking enter results in error message displayed 'An access secret must be no more than 40 characters'", function () {
        var index = 1;
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.enterAccountName(accountName, index);
        foundationCredentialsPage.enterAccountDesc(accountDesc, index);
        foundationCredentialsPage.selectServiceTypeList(index);
        // foundationCredentialsPage.selectServiceList(index);
        foundationCredentialsPage.clickContinueButton();
        var accessSecret = "AccessSecret_" + util.getRandomString(29);
        foundationCredentialsPage.enterAccessSecret(accessSecret, index);
        logger.info("Total Character Length of Access Secret Entered as:- ", accessSecret.length);
        browser.actions().sendKeys(protractor.Key.TAB).perform();
        expect(foundationCredentialsPage.getAccessSecretTextErrorMsg()).toEqual(messageStrings.accessSecretErrorMessage);
    });

    xit("Verify clicking X closes the Account Details page and displays Credentials summary list  page", function () {
        foundationCredentialsPage.clickAddCredentials();
        foundationCredentialsPage.clickCloseXButton();
        expect(foundationCredentialsPage.getCredentialsSummaryPageTitle()).toBe(messageStrings.credentialsSummaryPageTitle);
    });
});
