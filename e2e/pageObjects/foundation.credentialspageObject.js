"use strict";

var extend = require('extend');
var url = browser.params.url;
var appUrls = require('../../testData/appUrls.json');
var logGenerator = require("../../helpers/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var timeout = require('../../testData/timeout.json');
var EC = protractor.ExpectedConditions;
var util = require('../../helpers/util.js');
const { element, by } = require('protractor');
const { get } = require('request');

var defaultConfig = {
    pageUrl: url + appUrls.homePageUrl,
    foundation: 'accordion-button-1',
    credentialsTab: '//a[@href="/credentials"]/div',
    addCredentials: '//*[contains(text(),"Add Credentials")]',
    credentialsSummaryPageTitle: '//h2[normalize-space()="Credentials"]',
    accountName: '(//*[@name="name"])',
    accountDesc: '(//*[@name="description"])',
    serviceType: '//*[@name="serviceType"]',
    // serviceTypeList: 'option',
    services: '//*[@name="service"]',
    // servicesList: 'option',
    continueButton: '//*[contains(text(),"CONTINUE")]',

    //************* Locators for Service Type Data source and Service AWS *********************
    accountId: '//*[@name="accountId"]',
    accessKey: '//*[@name="accessKey"]',
    accessSecret: '//*[@name="secretAccessKey"]',
    region: '//*[@class="chakra-select__wrapper css-42b2qy"]',
    regionList: '//*[@name="region"]/option[value="',

    //************ Locators for Service Type Sdk Token and Service Sdk Token ********************
    envName: '//*[@name="envName"]',
    clearSelectedButton: '//button[@aria-label="Clear Selected"]',
    generateTokenandSaveButton: '//button[normalize-space()="Generate TOKEN & SAVE"]',

    //************ Locators for Service Type Reporting Service and Service ********************
    url: '//*t[@name="url"]',
    apiKey: '//*[@name="apiKey"]',

    //************ Locators for Service Type Deployment Target and Service ClearBlade Edge & Kubernetes ********************
    platformUrl: '//*[@name="platformUrl"]',
    mqttPortNum: '//*[@name="portNumber"]',
    systemKey: '//*[@name="systemKey"]',
    systemSecret: '//*[@name="systemSecret"]',
    devEmail: '//*[@name="devEmail"]',
    devPassword: '//*[@name="devPassword"]',
    uploadConfRadioButton: '//label[1]//span[1]',
    pasteAsTextRadioButton: '//label[2]/span[@class="chakra-radio__control css-r7fm1d"]',
    uploadConfTextArea: '//*[@name="config"]',
    browseButton: '//label[normalize-space()="Browse"]',
    uploadConfFilePath: '//div[@class="css-1w5fzsj"]',

    //************ Locators for Service Type Monitoring and Service Gafana ********************
    gafanaUrl: '//*[@name="grafanaUrl"]',
    username: '//*[@name="username"]',
    password: '//*[@name="password"]',
    finishButton: '//button[contains(text() , "FINISH")]',

    showCredsCheckbox: '//span[@class="chakra-checkbox__control css-lqxafn"]',
    AssignedToGroup: '//div[@class="dropdown-container"]',
    AssignedToGroupList: '//*[@class="css-1hu0qob"]',
    dropDownOptionTag: 'option',
    connectButton: '//button[normalize-space()="CONNECT"]',
    closeXButton: '//*[@class="chakra-modal__close-btn css-1eh0eve"]',
    logout: '//button[@id="menu-button-11"]',


};

function foundationCredentials(selectorConfig) {
    if (!(this instanceof foundationCredentials)) {
        return new foundationCredentials(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

//*************BEGIN************** Functions for Clicking On Tab links ****************BEGIN*****************

foundationCredentials.prototype.clickFoundation = function () {
    return element(by.id(this.foundation)).click().then(function () {
        logger.info("clicked on Foundation...");
    });
};

foundationCredentials.prototype.clickCredentials = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.credentialsTab)))).then(function () {
        logger.info("Waiting for credentials tab to be clickable...");
    }).catch(function (err) {
        logger.info("credential tab is not clickable...");
    });
    return element(by.xpath(this.credentialsTab)).click().then(function () {
        logger.info("clicked on credentials tab ...");
    });
};

//************END*************** Functions for Clicking Tab links ******************END**************

//*************BEGIN************** Add Credentials section ****************BEGIN*****************

//*************BEGIN************** Function to use ENTER Value in text ****************BEGIN*****************

foundationCredentials.prototype.enterAccountName = function (accountName, index) {
    let accountNameObj = this.accountName + "\[" + index + "\]";
    return element(by.xpath(accountNameObj)).sendKeys(accountName).then(function () {
        logger.info("Entered Account Name Value of index " + index + " is :- " + accountName);
    });
};

foundationCredentials.prototype.enterAccountDesc = function (accountDesc, index) {
    let accountDescObj = this.accountDesc + "\[" + index + "\]";
    return element(by.xpath(accountDescObj)).sendKeys(accountDesc).then(function () {
        logger.info("Entered Account Name Value of index " + index + " is :- " + accountDesc);
    });
};
foundationCredentials.prototype.enterAccountName = function (accountName, index) {
    let accountNameObj = this.accountName + "\[" + index + "\]";
    return element(by.xpath(accountNameObj)).sendKeys(accountName).then(function () {
        logger.info("Entered Account Name Value of index " + index + " is :- " + accountName);
    });
};

foundationCredentials.prototype.enterAccountId = function (accountId, index) {
    let accountIdObj = this.accountId + "\[" + index + "\]";
    return element(by.xpath(accountIdObj)).sendKeys(accountId).then(function () {
        logger.info("Entered Account ID Value of index " + index + " is :- " + accountId);
    });
};

foundationCredentials.prototype.enterAccessKey = function (accessKey, index) {
    let accessKeyObj = this.accessKey + "\[" + index + "\]";
    return element(by.xpath(accessKeyObj)).sendKeys(accessKey).then(function () {
        logger.info("Entered Access Key Value of index " + index + " is :- " + accessKey);
    });
};

foundationCredentials.prototype.enterAccessSecret = function (accessSecret, index) {
    let accessSecretObj = this.accessSecret + "\[" + index + "\]";
    return element(by.xpath(accessSecretObj)).sendKeys(accessSecret).then(function () {
        logger.info("Entered Access Secret Value of index " + index + " is :- " + accessSecret);
    });
};

foundationCredentials.prototype.enterEnvName = function (envName, index) {
    let envNameObj = this.envName + "\[" + index + "\]";
    return element(by.xpath(envNameObj)).sendKeys(envName).then(function () {
        logger.info("Entered Environment name Value of index " + index + " is :- " + envName);
    });
};

foundationCredentials.prototype.enterUrl = function (url, index) {
    let urlObj = this.url + "\[" + index + "\]";
    return element(by.xpath(urlObj)).sendKeys(url).then(function () {
        logger.info("Entered Url Value of index " + index + " is :- " + url);
    });
};

foundationCredentials.prototype.enterApiKey = function (apiKey, index) {
    let apiKeyObj = this.apiKey + "\[" + index + "\]";
    return element(by.xpath(apiKeyObj)).sendKeys(apiKey).then(function () {
        logger.info("Entered Api Key Value of index " + index + " is :- " + apiKey);
    });
};

foundationCredentials.prototype.enterPlatformUrl = function (platformUrl, index) {
    let platformUrlObj = this.platformUrl + "\[" + index + "\]";
    return element(by.xpath(platformUrlObj)).sendKeys(platformUrl).then(function () {
        logger.info("Entered Platform Url Value of index " + index + " is :- " + platformUrl);
    });
};

foundationCredentials.prototype.enterMqttPortNumber = function (mqttPortNum, index) {
    let mqttPortNumObj = this.mqttPortNum + "\[" + index + "\]";
    return element(by.xpath(mqttPortNumObj)).sendKeys(mqttPortNum).then(function () {
        logger.info("Entered MQTT Port Number Value is :- " + mqttPortNum);
    });
};

foundationCredentials.prototype.enterSystemKey = function (systemKey, index) {
    let systemKeyObj = this.systemKey + "\[" + index + "\]";
    return element(by.xpath(systemKeyObj)).sendKeys(systemKey).then(function () {
        logger.info("Entered System Key Value of index " + index + " is :- " + systemKey);
    });
};

foundationCredentials.prototype.entersystemSecret = function (systemSecret, index) {
    let systemSecretObj = this.systemSecret + "\[" + index + "\]";
    return element(by.xpath(systemSecretObj)).sendKeys(systemSecret).then(function () {
        logger.info("Entered System Secret Value of index " + index + " is :- " + systemSecret);
    });
};

foundationCredentials.prototype.enterDevEmail = function (devEmail, index) {
    let devEmailObj = this.devEmail + "\[" + index + "\]";
    return element(by.xpath(devEmailObj)).sendKeys(devEmail).then(function () {
        logger.info("Entered Dev Email Value of index " + index + " is :- " + devEmail);
    });
};

foundationCredentials.prototype.enterDevPassword = function (devPassword, index) {
    let devPasswordObj = this.devPassword + "\[" + index + "\]";
    return element(by.xpath(devPasswordObj)).sendKeys(devPassword).then(function () {
        logger.info("Entered Dev Password Value of index " + index + " is :- " + devPassword);
    });
};

foundationCredentials.prototype.enterTextForConfigFile = function (uploadConfTextArea, index) {
    let uploadConfTextObj = this.uploadConfTextArea + "\[" + index + "\]";
    return element(by.xpath(devPasswordObj)).sendKeys(uploadConfTextArea).then(function () {
        logger.info("Entered config file text value of index " + index + " is :- " + uploadConfTextArea);
    });
};

foundationCredentials.prototype.enterGafanaUrl = function (gafanaUrl, index) {
    let devPasswordObj = this.gafanaUrl + "\[" + index + "\]";
    return element(by.xpath(devPasswordObj)).sendKeys(gafanaUrl).then(function () {
        logger.info("Entered Dev Password Value of index " + index + " is :- " + gafanaUrl);
    });
};

foundationCredentials.prototype.enterUsername = function (username, index) {
    let usernameObj = this.username + "\[" + index + "\]";
    return element(by.xpath(usernameObj)).sendKeys(username).then(function () {
        logger.info("Entered Username Value of index " + index + " is :- " + username);
    });
};

foundationCredentials.prototype.enterPassword = function (password, index) {
    let passwordObj = this.password + "\[" + index + "\]";
    return element(by.xpath(passwordObj)).sendKeys(password).then(function () {
        logger.info("Entered Password Value of index " + index + " is :- " + password);
    });
};

//*************END************** Function to use ENTER Value ****************END*****************

//*************BEGIN************** Function to Click/Submit button ****************BEGIN*****************

foundationCredentials.prototype.clickAddCredentials = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addCredentials)))).then(function () {
        logger.info("Waiting for add credentials Button to be clickable...");
    }).catch(function (err) {
        logger.info("add credentials Button is not clickable...");
    });
    return element(by.xpath(this.addCredentials)).click().then(function () {
        logger.info("clicked on add credentials Button...");
    });
};

foundationCredentials.prototype.clickContinueButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.continueButton)))).then(function () {
        logger.info("Waiting for Continue Button to be clickable...");
    }).catch(function (err) {
        logger.info("Continue Button is not clickable...");
    });
    return element(by.xpath(this.continueButton)).click().then(function () {
        logger.info("clicked on Continue Button...");
    });
};

foundationCredentials.prototype.clickConnectButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.connectButton)))).then(function () {
        logger.info("Waiting for Connect Button to be clickable...");
    }).catch(function (err) {
        logger.info("Connect Button is not clickable...");
    });
    return element(by.xpath(this.connectButton)).click().then(function () {
        logger.info("clicked on Connect Button...");
    });
};

foundationCredentials.prototype.clickGenerateSdkToken = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.generateTokenandSaveButton)))).then(function () {
        logger.info("Waiting for generateSdktToken Button to be clickable...");
    }).catch(function (err) {
        logger.info("generateSdktToken Button is not clickable...");
    });
    return element(by.xpath(this.generateTokenandSaveButton)).click().then(function () {
        logger.info("clicked on generateSdktToken Button...");
    });
};

foundationCredentials.prototype.clickBrowseButton = function () {
    let filePath = "/home/supriya/Privacera_sheets_transfer_task";
    let fpath = path.resolve(__dirname, filePath);
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.browseButton)))).then(function () {
        logger.info("Waiting for Browse Button to be clickable...");
    }).catch(function (err) {
        logger.info("Browse Button is not clickable...");
    });
    return element(by.xpath(this.browseButton)).sendKeys(fpath).then(function () {
        logger.info("clicked on Browse Button...");
    });
};

foundationCredentials.prototype.clickFinishButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.finishButton)))).then(function () {
        logger.info("Waiting for Finish Button to be clickable...");
    }).catch(function (err) {
        logger.info("Finish Button is not clickable...");
    });
    return element(by.xpath(this.finishButton)).click().then(function () {
        logger.info("Finish on Browse Button...");
    });
};

foundationCredentials.prototype.clickCloseXButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.closeXButton)))).then(function () {
        logger.info("Waiting for Close Button to be clickable...");
    }).catch(function (err) {
        logger.info("Close Button is not clickable...");
    });
    return element(by.xpath(this.closeXButton)).click().then(function () {
        logger.info("clicked on Close Button...");
    });
};

//*************END************** Function to Click/Submit button ****************END*****************

//************BEGIN*****************Function to select from dropdown ****************BEGIN******************/

foundationCredentials.prototype.selectServiceType = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.serviceType)))).then(function () {
        logger.info("Waiting for Service Type to be clickable...");
    }).catch(function (err) {
        logger.info("Service Type is not clickable...");
    });
    return element(by.xpath(this.serviceType)).click().then(function () {
        logger.info("clicked on Service Type...");
    });
};

foundationCredentials.prototype.selectServiceTypeList = function (index) {
    var serviceTypelistselectVal = "//*[@name='serviceType']";
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.serviceType))), 50000).then(function () {
        logger.info("Waiting for service Type to be selectable...");
    }).catch(function (err) {
        logger.info("Service Type is not selectable...");
    });
    return element.all(by.tagName(this.dropDownOptionTag)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i <= arr.length; i++) {
                let serviceTypeValueObj = serviceTypelistselectVal + "/option[@value=" + "'" + arr[i] + "'" + "]";
                return element(by.xpath(serviceTypeValueObj)).click().then(function () {
                    logger.info("Service Type as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let serviceTypeValueObj = serviceTypelistselectVal + "/option[@value=" + "'" + arr[i] + "'" + "]";
                return element(by.xpath(serviceTypeValueObj)).click().then(function () {
                    logger.info("Service Type as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};


// foundationCredentials.prototype.selectServiceList = function (index) {
//     var serviceslistselectVal = "//select[@id='field-323']";
//     browser.wait(EC.elementToBeClickable(element(by.xpath("//select[@id='field-323']"))), 50000).then(function () {
//         logger.info("Waiting for services to be selectable...");
//     }).catch(function (err) {
//         logger.info("Services are not selectable...");
//     });
//     return element.all(by.tagName(this.dropDownOptionTag)).getText().then(function (arr) {
//         if (index <= arr.length) {
//             for (var i = index; i <= arr.length; i++) {

//                 let serviceValueObj = serviceslistselectVal + "/option[@value=" + "'" + arr[i] + "'" + "]";
//                 console.log(serviceValueObj);
//                 return element(by.cssContainingText('option,kubernetes')).click().then(function () {
//                     logger.info("Service  as " + arr[i] + " is Selected...");
//                 });
//             }
//         }
//         else {
//             for (var i = 0; i < arr.length; i++) {
//                 let serviceValueObj = serviceslistselectVal + "/option[@value=" + "'" + arr[i] + "'" + "]";
//                 return element(by.xpath(serviceValueObj)).click().then(function () {
//                     logger.info("Service as " + arr[i] + " is Selected...");
//                 });
//             }
//         }
//     });
// };

foundationCredentials.prototype.selectAssignedToGroup = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.AssignedToGroup)))).then(function () {
        logger.info("Waiting for Assigned To Group to be clickable...");
    }).catch(function (err) {
        logger.info("Assigned To Group is not clickable...");
    });
    return element(by.xpath(this.AssignedToGroup)).click().then(function () {
        logger.info("clicked on Assigned To Group...");
    });
};

foundationCredentials.prototype.getTextOfAssignedGroupValue = function (index) {
    var assignedGroupXpathSelectingValue = '//*[@class="css-1hu0qob" and text()="'

    browser.wait(EC.elementToBeClickable(element(by.xpath(this.AssignedToGroupList))), 50000).then(function () {
        logger.info("Waiting for Value reflect to be select...");
    }).catch(function (err) {
        logger.info("Value is not Selectable...");
    });
    return element.all(by.xpath(this.AssignedToGroupList)).getText().then(function (arr) {
        console.log(arr[0]);
        console.log(arr[1]);
        if (index <= arr.length) {
            for (var i = index; i <= arr.length; i++) {
                let groupValueObj = assignedGroupXpathSelectingValue + arr[i] + "\")]";
                return element(by.xpath(groupValueObj)).click().then(function () {
                    logger.info("Value as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let groupValueObj = assignedGroupXpathSelectingValue + arr[i] + "\"]";

                // if(expect(element(by.xpath(groupValueObj)).isSelected()).toBeTruthy()){

                //     return logger.info("Element already selected");
                // }
                // else{
                return element(by.xpath(groupValueObj)).click().then(function () {
                    logger.info("Value as " + arr[i] + " is Selected...");
                });
                // return element(by.xpath(groupValueObj)).isSelected().then(function (selected) {
                //     logger.info("Selection Boolean:- ",selected)
                //     return selected
                // })
                // }
            }
        }
    });

}

foundationCredentials.prototype.selectRegionList = function (index) {
    var serviceTypelistselectVal = "//*[@name='region']";
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.region)))).then(function () {
        logger.info("Waiting for Region to be selectable...");
    }).catch(function (err) {
        logger.info("Region is not selectable...");
    });
    return element.all(by.tagName(this.dropDownOptionTag)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i <= arr.length; i++) {
                let regionValueObj = serviceTypelistselectVal + "/option[text()=" + "'" + arr[i] + "'" + "]";
                return element(by.xpath(regionValueObj)).click().then(function () {
                    logger.info("Region as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let regionValueObj = this.regionList + arr[i] + "'" + "]";
                return element(by.xpath(regionValueObj)).click().then(function () {
                    logger.info("Region as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};
//************END*****************Function to select from dropdown ****************END******************/

//************BEGIN*****************Function to select checkbox ****************BEGIN******************/

foundationCredentials.prototype.clickShowCredsCheckbox = function (index) {

    if (expect(element(by.xpath(this.showCredsCheckbox)).isSelected()).toBeFalsy()) {
        return element(by.xpath(this.showCredsCheckbox)).click().then(function () {
            logger.info("checkbox is selected");
        });
    }
    else {
        return element(by.xpath(this.showCredsCheckbox)).click().then(function () {
            logger.info("checkbox is unselected");
        });
    }
};

//************END*****************Function to select checkbox ****************END******************/

//************BEGIN*****************Function to select radio button ****************BEGIN******************/

foundationCredentials.prototype.selectuploadConfRadioButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.uploadConfRadioButton)))).then(function () {
        logger.info("Waiting for upload Config File radio button to be clickable...");
    }).catch(function (err) {
        logger.info("upload Config File radio button is not clickable...");
    });
    return element(by.xpath(this.uploadConfRadioButton)).click().then(function () {
        logger.info("clicked on upload Config File radio button ...");
    });
};

foundationCredentials.prototype.selectPasteAsTextRadioButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.pasteAsTextRadioButton)))).then(function () {
        logger.info("Waiting for paste as a text config file radio button to be clickable...");
    }).catch(function (err) {
        logger.info("paste as a text config file radio button is not clickable...");
    });
    return element(by.xpath(this.pasteAsTextRadioButton)).click().then(function () {
        logger.info("clicked on paste as a text config file radio button ...");
    });
};

//************END***************** Function to select radio button ****************END******************

//************END***************** Add Credentials Section ****************END******************

//************BEGIN***************** Function for positive testing ****************BEGIN******************

foundationCredentials.prototype.getAccessKeyText = function () {
    return element(by.xpath(this.accessKey)).getText().then(function (text) {
        console.log(element(by.xpath(this.accessKey)).getText());
        logger.info("Access Key text get successfully");
        return text;

}).catch(function (err) {
    logger.info("Access Key text didn't retrieved");
});
};

foundationCredentials.prototype.getCredentialsSummaryPageTitle = function () {
    let getCredentialsSummaryPageXpathObj = this.credentialsSummaryPageTitle;
    return element(by.xpath(getCredentialsSummaryPageXpathObj)).getText().then(function (title) {
        logger.info("Credentials Summery Page Title retrieved successfully");
        return title;
    });
};
//************END***************** Function for positive testing ****************END******************

//************BEGIN***************** Function for negative testing ****************BEGIN******************

foundationCredentials.prototype.getAccountNameTextErrorMsg = function () {
    return this.idAccNameElementLocator().then(function (idlocate) {
        var xpathOfAccountName = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfAccountName))), 5000).then(function () {
            logger.info("Waiting for error message to display for Account Name")
        }).catch(function (err) {
            logger.info("Error message for Account field is not showing");
        });
        return element(by.xpath(xpathOfAccountName)).getText().then(function (error) {
            logger.info("Error message for Account Name displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idAccNameElementLocator = function () {
    return element(by.xpath(this.accountName)).getAttribute("id").then(function (id) {
        return id
    });
};

foundationCredentials.prototype.getDescriptionTextErrorMsg = function () {
    return this.idDescElementLocator().then(function (idlocate) {
        var xpathOfDescription = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfDescription))), 5000).then(function () {
            logger.info("Waiting for error message to display for Description")
        }).catch(function (err) {
            logger.info("Error message for Description field is not showing");
        });
        return element(by.xpath(xpathOfDescription)).getText().then(function (error) {
            logger.info("Error message for Description displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idDescElementLocator = function () {
    return element(by.xpath(this.accountDesc)).getAttribute("id").then(function (id) {
        return id
    });
};

foundationCredentials.prototype.getServiceTypeTextErrorMsg = function () {
    return this.idServiceTElementLocator().then(function (idlocate) {
        var xpathOfServiceType = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfServiceType))), 5000).then(function () {
            logger.info("Waiting for error message to display for Service Type")
        }).catch(function (err) {
            logger.info("Error message for Service Type field is not showing");
        });
        return element(by.xpath(xpathOfServiceType)).getText().then(function (error) {
            logger.info("Error message for Service Type displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idServiceTElementLocator = function () {
    return element(by.xpath(this.serviceType)).getAttribute("id").then(function (id) {
        return id
    });
};

foundationCredentials.prototype.getServiceTextErrorMsg = function () {
    return this.idServiceElementLocator().then(function (idlocate) {
        var xpathOfService = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfService))), 5000).then(function () {
            logger.info("Waiting for error message to display for Services")
        }).catch(function (err) {
            logger.info("Error message for Services field is not showing");
        });
        return element(by.xpath(xpathOfService)).getText().then(function (error) {
            logger.info("Error message for Services displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idServiceElementLocator = function () {
    return element(by.xpath(this.services)).getAttribute("id").then(function (id) {
        return id
    });
};

foundationCredentials.prototype.getAccessKeyTextErrorMsg = function () {
    return this.idAccessKeyElementLocator().then(function (idlocate) {
        var xpathOfAccessKey = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfAccessKey))), 5000).then(function () {
            logger.info("Waiting for error message to display for Access Key")
        }).catch(function (err) {
            logger.info("Error message for Access Key field is not showing");
        });
        return element(by.xpath(xpathOfAccessKey)).getText().then(function (error) {
            logger.info("Error message for Access displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idAccessKeyElementLocator = function () {
    return element(by.xpath(this.accessKey)).getAttribute("id").then(function (id) {
        return id
    });
};

foundationCredentials.prototype.getAccessSecretTextErrorMsg = function () {
    return this.idAccessSecElementLocator().then(function (idlocate) {
        var xpathOfAccessSecret = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfAccessSecret))), 5000).then(function () {
            logger.info("Waiting for error message to display forAccess Secret")
        }).catch(function (err) {
            logger.info("Error message for Access Secretfield is not showing");
        });
        return element(by.xpath(xpathOfAccessSecret)).getText().then(function (error) {
            logger.info("Error message for Access Secret displayed successfully");
            return error;
        });
    });

};

foundationCredentials.prototype.idAccessSecElementLocator = function () {
    return element(by.xpath(this.accessSecret)).getAttribute("id").then(function (id) {
        return id
    });
};
//************END***************** Function for negative testing ****************END******************

module.exports = foundationCredentials;