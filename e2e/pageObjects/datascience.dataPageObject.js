"use strict"

var extend = require('extend');
const path = require('path');
var homedir = require('os').homedir();
//var finder = require('findit');  //.find(__dirname);
var fs = require('fs');
var url = browser.params.url;
var appUrls = require('../../testData/appUrls.json');
var logGenerator = require("../../helpers/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var timeout = require('../../testData/timeout.json');
var EC = protractor.ExpectedConditions;
var util = require('../../helpers/util.js');
const { element } = require('protractor');

var defaultConfig = {

    pageUrl: url + appUrls.homePageUrl,
    dataScience: '//button[normalize-space()="Data Science"]',//'accordion-button-2',
    dataTab: '//a[@href="/datasources"]',      //'//div[@class="css-86um4p"][normalize-space()="Data"]',
    btnAddDataSource: '//button[normalize-space()="Add Data Source"]',  //button text
    btnAddDataFromFile: '//button[normalize-space()="Add data from file"]',
    txtSearchDataSource: '//input[@placeholder="Search Data Source"]',
    btnSearchDataSource: '//button[@aria-label="Search Data Source"]//*[local-name()="svg"]',
    txtSearchOutput: '//table[@role="table"]/tbody/tr/td[1]',
    btnClearSeachData: '//button[@aria-label="Clear search value"]//*[local-name()="svg"]',
    btnEditDataSource: '//table[@role="table"]/tbody/tr[1]/td/button[1]',
    deleteBtnForDataSource: '//table[@role="table"]/tbody/tr[1]/td/button[2]',
    dataSourceListXpath: '//tbody//tr',
    allSourceNameOnDataSourceSummaryPage: '//table//tbody//tr//td[1]',
    getRandomSourceNameforSearching: '//table//tbody//tr[',
    // btnDeleteDataSourceRecord : '//button[contains(@aria-label,"Delete dataRepo Energy Predictors")]//*[local-name()="svg"]//*[name()="path" and contains(@d,"M3.5 0v2.7")]'

    //********** Locators for Add data source page ************************
    txtSourceName: '//input[@name="name"]',
    txtDescriptionForAddDataSource: '//input[@name="description"]',
    projectDropdown: '//div[@role="group"]//div[@class="chakra-select__wrapper css-42b2qy"]/select[@name="projectId"]',
    projectOptions: '//select[@name="projectId"]//option',
    volumeAccountDropdown: '//div[@role="group"]//div[@class="chakra-select__wrapper css-42b2qy"]/select[@name="volumeAccount"]',
    volumeAccountOptions: '//select[@name="volumeAccount"]//option',
    RadioBtnForExistingVolume: '//p[normalize-space()="Existing Volume"]',
    RadioBtnForNewVolume: '//p[normalize-space()="New Volume"]',
    volumeRegionDropdown: '//div[@role="group"]//div[@class="chakra-select__wrapper css-42b2qy"]/select[@name="volumeRegion"]',
    volumeRegionOption: '//select[@name="volumeRegion"]//option',
    txtVolumeName: '//input[@name="volumeName"]',
    addButtonForDataSource: '//button[@class="chakra-button css-fkmwzk"]',
    closeButtonForAddDataSourcePage: '//button[@aria-label="Close"]//*[local-name()="svg"]',


    //**************** Locators for  Add Data From File ************************************
    dataSourceDropdown: '//select[@name="dataRepoId"]',
    dataSourceOptionInDropdown: '//select[@name="dataRepoId"]/option',
    buttonForBrowseFileName: '//label[normalize-space()="Browse"]',
    uploadFileXpath: '//*[@class="chakra-stack css-84zodg"]//input[@type="file"]',
    addButtonForSubmitDataFromFile: '//button[normalize-space()="Add"]',
    closeButtonForAddDataFromFilePage: '//button[@aria-label="Close"]//*[local-name()="svg"]//*[name()="path" and contains(@fill,"currentCol")]',

    //***************** Locators for Update data source record *****************************************************************
    txtsourceName: '//form[@class="chakra-stack css-1z0ruq5"]/div[@role="group"]/input[@name="name"]',
    txtDescription: '//form[@class="chakra-stack css-1z0ruq5"]//div[@role="group"]/input[@name="description"]',
    btnUpdateDataSource: '//button[normalize-space()="Update"]',
    btnCloseEditDataSourceWindow: '//button[@aria-label="Close"]//*[local-name()="svg"]//*[name()="path" and contains(@fill,"currentCol")]',

    //***************** Locators For Delete Data Source Record ******************************************************************
    btnForDeleteDatasourceConfirmation: '//section//footer[@justify="space-between"]/button[text()="Delete"]',
    btnForCancelDeleteDatasourceOperation: '//section//footer[@justify="space-between"]/button[text()="Cancel"]',

    //********************** Locators Use to get Text ******************************************
    dataSourceSummaryPageTitleXpath: '//h2[normalize-space()="Data Sources"]',

    dataSourceListLocationXpath: '//*[@class="css-cjt79g"]/table',

};

function dataScience_data(selectorConfig) {
    if (!(this instanceof dataScience_data)) {
        return new dataScience_data(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

//*************BEGIN******** Functions for Clicking On Tab links *********BEGIN***********

dataScience_data.prototype.clickDatascience = function () {
    return element(by.xpath(this.dataScience)).click().then(function () {
        logger.info("clicked on Data Science...");
    });
};

dataScience_data.prototype.clickData = function () {
    return element(by.xpath(this.dataTab)).click().then(function () {
        logger.info("clicked on Data...");
    });
};
//*************End******** Functions for Clicking On Tab links *********End***********

//***************************** DATA PAGE SECTION **********************************************
//************ BEGIN ***** Functions use to ENTER text *********************BEGIN***************

dataScience_data.prototype.EnterSearchDataSource = function (searchDataSource, index) {
    let sourceNameObj = this.txtSearchDataSource + "\[" + index + "\]";
    return element(by.xpath(sourceNameObj)).sendKeys(searchDataSource).then(function () {
        logger.info("Entered Source Name Value of index " + index + " is :- " + searchDataSource);
    });
};
//************ End ***** Functions use to ENTER a text **********************End********************

//************ BEGIN ***** Functions use to Click Button *********************BEGIN***************
dataScience_data.prototype.clickSearchDataSource = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnSearchDataSource))), 5000).then(function () {
        logger.info("Waiting for SearchDataSource Button to be clickable...");
    }).catch(function (err) {
        logger.info("SearchDataSource Button is not clickable...");
    });
    return element(by.xpath(this.btnSearchDataSource)).click().then(function () {
        logger.info("clicked on SearchDataSource...");
    });
};

dataScience_data.prototype.clickClearSearchData = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnClearSeachData))), 5000).then(function () {
        logger.info("Waiting for Clear Search Data Button to be clickable...");
    }).catch(function (err) {
        logger.info("Clear Search Data Button is not clickable...");
    });
    return element(by.xpath(this.btnClearSeachData)).click().then(function () {
        logger.info("clicked on Clear Search Data...");
    });
};


//************** Funtion for checking output of search functionality *******************
dataScience_data.prototype.checkSearchOutput = function (searchtxt) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.txtSearchOutput))), 5000).then(function () {
        logger.info("Waiting for SearchDataSource Button to be clickable...");
    }).catch(function (err) {
        logger.info("SearchDataSource Button is not clickable...");
    });
    return element(by.xpath(this.txtSearchOutput)).getText().then(function (txt) {
        if (txt == searchtxt) {
            logger.info("searching functionality working correctly");
        }
        else {
            logger.info("searching functionality not working properly");
        }
    })
};
//************ BEGIN ***** Functions use to Click Button *********************BEGIN***************


//***************************** ADD DATA SOURCE SECTION **********************************************
//*************BEGIN*********** Functions use to ENTER text ******************************BEGIN********
dataScience_data.prototype.enterSourceName = function (sourceName, index) {
    let sourceNameObj = this.txtSourceName + "\[" + index + "\]";
    return element(by.xpath(sourceNameObj)).sendKeys(sourceName).then(function () {
        logger.info("Entered Source Name Value of index " + index + " is :- " + sourceName);
    });
};

dataScience_data.prototype.enterDescription = function (description, index) {
    let descriptionObj = this.txtDescriptionForAddDataSource + "\[" + index + "\]";
    return element(by.xpath(descriptionObj)).sendKeys(description).then(function () {
        logger.info("Entered Description value of index " + index + " is : " + description)
    });
};

dataScience_data.prototype.enterVolumeName = function (volumeName, index) {
    let volumeNameObj = this.txtVolumeName + "\[" + index + "\]";
    return element(by.xpath(volumeNameObj)).sendKeys(volumeName).then(function () {
        logger.info("Entered Volume Name value of index " + index + " is : " + volumeName)
    });
};
//*************End******** Function to use ENTER text  ***********************End***********


//*************BEGIN******** Functions for Clicking Buttons/Submits*********BEGIN**************
dataScience_data.prototype.clickAddDataSource = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnAddDataSource))), 5000).then(function () {
        logger.info("Waiting for Add Data Source Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add Data Source Button is not clickable...");
    });
    return element(by.xpath(this.btnAddDataSource)).click().then(function () {
        logger.info("clicked on Add Data Source Button...");
    });
};

dataScience_data.prototype.clickAdd = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addButtonForDataSource))), 5000).then(function () {
        logger.info("Waiting for Add Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add Button is not clickable...");
    });
    return element(by.xpath(this.addButtonForDataSource)).click().then(function () {
        logger.info("clicked on Add...");
    });
};

dataScience_data.prototype.clickCloseButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.closeButtonForAddDataSourcePage))), 5000).then(function () {
        logger.info("Waiting for X Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add X is not clickable...");
    });
    return element(by.xpath(this.closeButtonForAddDataSourcePage)).click().then(function () {
        logger.info("clicked on X");
    });
};

//*************End******** Functions for Clicking Buttons/Submits *********End**************


//*************BEGIN******** Functions to select Option For Add Data Source *********BEGIN**************

dataScience_data.prototype.selectProjectDropdown = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.projectDropdown))), 5000).then(function () {
        logger.info("Waiting for Project dropdown to be clickable...");
    }).catch(function (err) {
        logger.info("Project dropdown is not clickable...");
    });
    return element(by.xpath(this.projectDropdown)).click().then(function () {
        logger.info("clicked on Project dropdown...");
    });
};

dataScience_data.prototype.selectProjectList = function (index) {
    var projectXpathForSelectingValue = this.projectDropdown + '//option[text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.projectOptions))), 5000).then(function () {
        logger.info("Waiting for Project Name as to be select...");
    }).catch(function (err) {
        logger.info("Project Name is not selectable...");
    });
    return element.all(by.xpath(this.projectOptions)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i < arr.length; i++) {
                let projectNameValueObj = projectXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(projectNameValueObj)).click().then(function () {
                    logger.info("Project Name as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let projectNameValueObj = projectXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(projectNameValueObj)).click().then(function () {
                    logger.info("Project Name as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};

dataScience_data.prototype.selectVolumeAccount = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.volumeAccountDropdown))), 5000).then(function () {
        logger.info("Waiting for volume account dropdown to be clickable...");
    }).catch(function (err) {
        logger.info("volume account dropdown is not clickable...");
    });
    return element(by.xpath(this.volumeAccountDropdown)).click().then(function () {
        logger.info("clicked on volume account dropdown...");
    });
};

dataScience_data.prototype.selectVolumeAccountList = function (index) {
    var VolAccountXpathForSelectingValue = this.volumeAccountDropdown + '//option[text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.volumeAccountOptions))), 5000).then(function () {
        logger.info("Waiting for volume account as to be select...");
    }).catch(function (err) {
        logger.info("volume account is not selectable...");
    });
    return element.all(by.xpath(this.volumeAccountOptions)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i < arr.length; i++) {
                let VolumeAccountValueObj = VolAccountXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(VolumeAccountValueObj)).click().then(function () {
                    logger.info("account as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let VolumeAccountValueObj = VolAccountXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(VolumeAccountValueObj)).click().then(function () {
                    logger.info("account as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};

dataScience_data.prototype.selectVolumeRegion = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.volumeRegionDropdown))), 5000).then(function () {
        logger.info("Waiting for Volume Region dropdown to be clickable...");
    }).catch(function (err) {
        logger.info("Volume Region dropdown is not clickable...");
    });
    return element(by.xpath(this.volumeRegionDropdown)).click().then(function () {
        logger.info("clicked on Volume Region dropdown...");
    });
};

dataScience_data.prototype.selectVolumeRegionList = function (index) {
    var VolumeRegionXpathForSelectingValue = this.volumeRegionDropdown + '//option[text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.volumeRegionOption))), 5000).then(function () {
        logger.info("Waiting for Volume Region as to be select...");
    }).catch(function (err) {
        logger.info("Volume Region is not selectable...");
    });
    return element.all(by.xpath(this.volumeRegionOption)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i < arr.length; i++) {
                let VolumeRegionValueObj = VolumeRegionXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(VolumeRegionValueObj)).click().then(function () {
                    logger.info("Volume Region as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let VolumeRegionValueObj = VolumeRegionXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(VolumeRegionValueObj)).click().then(function () {
                    logger.info("Volume Region as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};
//*************End******** Functions to select Option For Add Data Source *********End**************

//********************* Function to select Radio Button *******************************************

dataScience_data.prototype.selectVolumeRadioButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.RadioBtnForExistingVolume))), 5000).then(function () {
        logger.info("Waiting for Volume radio button to be clickable...");
    }).catch(function (err) {
        logger.info("Volume radio button is not clickable...");
    });
    return element(by.xpath(this.RadioBtnForExistingVolume)).click().then(function () {
        logger.info("clicked on Volume radio button ...");
    });
};




//***************************** ADD DATA FROM FILE SECTION **********************************************
//**************BEGIN********** Functions use to select Option From Dropdown*******BEGIN***********************

dataScience_data.prototype.selectDataSourceForAddDataFromFile = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.dataSourceDropdown))), 5000).then(function () {
        logger.info("Waiting for data Source dropdown to be clickable...");
    }).catch(function (err) {
        logger.info("data Source dropdown is not clickable...");
    });
    return element(by.xpath(this.dataSourceDropdown)).click().then(function () {
        logger.info("clicked on data Source dropdown...");
    });
};

dataScience_data.prototype.selectDataSourceListForAddDataFromFile = function (index) {
    var dataSourceXpathForSelectingValue = this.dataSourceDropdown + '//option[text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.dataSourceOptionInDropdown))), 5000).then(function () {
        logger.info("Waiting for Data Source as to be select...");
    }).catch(function (err) {
        logger.info("Data Source is not selectable...");
    });
    return element.all(by.xpath(this.dataSourceOptionInDropdown)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i < arr.length; i++) {
                let dataSourceValueObj = dataSourceXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(dataSourceValueObj)).click().then(function () {
                    logger.info("Data Source as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                let dataSourceValueObj = dataSourceXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(dataSourceValueObj)).click().then(function () {
                    logger.info("data Source as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};
//**************End********** Functions to select Option From Dropdown *******End***********************

//*************BEGIN******** Functions to Click Button *********BEGIN***********

dataScience_data.prototype.clickAddDataFromFile = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnAddDataFromFile))), 5000).then(function () {
        logger.info("Waiting for Add_Data_From_File Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add_Data_From_File Button is not clickable...");
    });
    return element(by.xpath(this.btnAddDataFromFile)).click().then(function () {
        logger.info("clicked on Add_Data_From_File Button...");
    });
};

dataScience_data.prototype.clickBrowse = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.buttonForBrowseFileName))), 5000).then(function () {
        logger.info("Waiting for Browse Button to be clickable...");
    }).catch(function (err) {
        logger.info("Browse Button is not clickable...");
    });
    return element(by.xpath(this.buttonForBrowseFileName)).click().then(function () {
        logger.info("clicked on Browse...");
    });
};

dataScience_data.prototype.clickAddButton = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addButtonForSubmitDataFromFile))), 5000).then(function () {
        logger.info("Waiting for Add Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add Button is not clickable...");
    });
    return element(by.xpath(this.addButtonForSubmitDataFromFile)).click().then(function () {
        logger.info("clicked on Add...");
    });
};

dataScience_data.prototype.UploadFile = function (absolutePath) {
    return element(by.xpath(this.uploadFileXpath)).sendKeys(absolutePath).then(function () {
        logger.info("File has Uploaded...");

    });
};
//*************END******** Functions to Click Button *********END***********


//************************ EDIT DATA SOURCE SECTION ************************
//**********BEGIN******* Functions use to Reset TextBox ***********BEGIN********************
dataScience_data.prototype.resetDataSourceName = function () {
    var elem = element(by.xpath(this.txtsourceName));
    browser.wait(EC.elementToBeClickable(elem), 4000);
    return elem.clear().then(function () {
        logger.info("Data Source Name is clear ");
    });
};

dataScience_data.prototype.resetDescription = function () {
    var elem = element(by.xpath(this.txtDescription));
    browser.wait(EC.elementToBeClickable(elem), 4000);
    return elem.clear().then(function () {
        logger.info("Description is clear ");
    });
};
//**********END********* Functions use to Reset TextBox ************END*********************

//**********BEGIN********* Functions use to Enter text ***************************************
dataScience_data.prototype.EnterUpdatedDataSource = function (dataSource, index) {
    let UpdatedDataSourceNameObj = this.txtsourceName + "\[" + index + "\]";
    return element(by.xpath(UpdatedDataSourceNameObj)).sendKeys(dataSource).then(function () {
        logger.info("Entered Source Name Value of index " + index + " is :- " + dataSource);
    });
};

dataScience_data.prototype.EnterUpdatedDescription = function (description, index) {
    let descriptionObj = this.txtDescription + "\[" + index + "\]";
    return element(by.xpath(descriptionObj)).sendKeys(description).then(function () {
        logger.info("Entered Description Value of index " + index + " is :- " + description);
    });
};
//**********END********* Functions use to Enter text **************END**********************

//**********BEGIN******* Functions use to click buttons ***********BEGIN********************
dataScience_data.prototype.clickUpdate = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnUpdateDataSource))), 5000).then(function () {
        logger.info("Waiting for Update Button to be clickable...");
    }).catch(function (err) {
        logger.info("Update Button is not clickable...");
    });
    return element(by.xpath(this.btnUpdateDataSource)).click().then(function () {
        logger.info("clicked on Update...");
    });
};

dataScience_data.prototype.clickEditDataSource = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnEditDataSource))), 5000).then(function () {
        logger.info("Waiting for Edit Button to be clickable...");
    }).catch(function (err) {
        logger.info("Edit Button is not clickable...");
    });
    return element(by.xpath(this.btnEditDataSource)).click().then(function () {
        logger.info("clicked on Edit Button...");
    });
};
//**********END******* Functions use to click buttons ***********END***********************

//*************************DELETE DATA SOURCE SECTION***************************************
//**********BEGIN******* Functions use to click buttons ***********BEGIN************************
dataScience_data.prototype.clickDeleteDataSource = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.deleteBtnForDataSource))), 5000).then(function () {
        logger.info("Waiting for Delete Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Button is not clickable...");
    });
    return element(by.xpath(this.deleteBtnForDataSource)).click().then(function () {
        logger.info("clicked on Delete Button...");
    });
};

dataScience_data.prototype.clickConfirmDeleteDataSource = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnForDeleteDatasourceConfirmation))), 5000).then(function () {
        logger.info("Waiting for Delete Confirmation Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Confirmation Button is not clickable...");
    });
    return element(by.xpath(this.btnForDeleteDatasourceConfirmation)).click().then(function () {
        logger.info("clicked on Delete Confirmation Button...");
    });
};

dataScience_data.prototype.clickCancelDeleteDataSourceOperation = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnForCancelDeleteDatasourceOperation))), 5000).then(function () {
        logger.info("Waiting for Cancel Button Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.btnForCancelDeleteDatasourceOperation)).click().then(function () {
        logger.info("clicked on Cancel Button Button...");
    });
};
//**********END******* Functions use to click buttons ***********END************************


//***************BEGIN***************** Functions For Negative Testing ********************BEGIN****************
dataScience_data.prototype.getDataSourceNameTextErrorMsg = function (index) {
    return this.idDataSourceElementLocator(index).then(function (idlocate) {
        var xpathForDataSourceNameErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForDataSourceNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for data source Name")
        }).catch(function (err) {
            logger.info("Error message for source Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForDataSourceNameErr)).getText().then(function (error) {
            logger.info("Error message for Data source Name displayed successfully");
            return error;
        });
    });
};

dataScience_data.prototype.idDataSourceElementLocator = function (index) {
    let sourceNameObj = this.txtSourceName + "\[" + index + "\]";
    return element(by.xpath(sourceNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};

dataScience_data.prototype.getDescriptionTextErrorMsg = function (index) {
    return this.idDescriptionElementLocator(index).then(function (idlocate) {
        var xpathForDescriptionError = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForDescriptionError))), 5000).then(function () {
            logger.info("Waiting for error message to display for Descritption")
        }).catch(function (err) {
            logger.info("Error message for Descritption field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForDescriptionError)).getText().then(function (error) {
            logger.info("Error message for Descritption displayed successfully");
            return error;
        });
    });
};

dataScience_data.prototype.idDescriptionElementLocator = function (index) {
    let descriptionObj = this.txtDescriptionForAddDataSource + "\[" + index + "\]";
    return element(by.xpath(descriptionObj)).getAttribute("id").then(function (id) {
        return id
    });
};

dataScience_data.prototype.getVolumeNameTextErrorMsg = function (index) {
    return this.idVElementLocator(index).then(function (idlocate) {
        var xpathForVolumeNameErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForVolumeNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for data Volume Name")
        }).catch(function (err) {
            logger.info("Error message for Volume Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForVolumeNameErr)).getText().then(function (error) {
            logger.info("Error message for Volume Name displayed successfully");
            return error;
        });
    });
};

dataScience_data.prototype.idVElementLocator = function (index) {
    let volumeNameObj = this.txtVolumeName + "\[" + index + "\]";
    return element(by.xpath(volumeNameObj)).getAttribute("id").then(function (id) {
        return id;
    });
};
//***************END***************** Functions For Negative Testing ********************END****************

//************************Functions use to get text *********************************************************
dataScience_data.prototype.getAddDataSourceBtnStatus = function (index) {
    let addDataSourceBtnObj = this.addButtonForDataSource + "\[" + index + "\]";
    return element(by.xpath(addDataSourceBtnObj)).getAttribute("disabled").then(function (btnStatus) {
        return btnStatus;
    });
};
dataScience_data.prototype.getDataSourceSummaryPageTitle = function (index) {
    let dataSourceTitleXpathObj = this.dataSourceSummaryPageTitleXpath + "\[" + index + "\]";
    return element(by.xpath(dataSourceTitleXpathObj)).getText().then(function (title) {
        logger.info("summary Page Title is : " + title)
        return title;
    });
};

dataScience_data.prototype.getDataSourceSearchResultNotFound = function (index) {
    let dataSourceSearchResultNotFoundXpathObj = this.dataSourceListXpath + "\[" + index + "\]";
    return element(by.xpath(dataSourceSearchResultNotFoundXpathObj)).getText().then(function (msg) {
        logger.info("Data Source Search result Not Found message : " + msg)
        return msg;
    });
};

dataScience_data.prototype.getDataSourceRecord = function (index) {
    let dataSourceSearchResultNotFoundXpathObj = this.dataSourceListXpath + "\[" + index + "\]";
    return element(by.xpath(dataSourceSearchResultNotFoundXpathObj)).getText().then(function (msg) {
        logger.info("Data Source Search result Not Found message : " + msg)
        return msg;
    });
};

//***************************Functions use to give position of web element on web page ********************
dataScience_data.prototype.getDataSourceListLocation = function (index) {
    let dataSourceTitleXpathObj = this.dataSourceListLocationXpath + "\[" + index + "\]";
    return element(by.xpath(dataSourceTitleXpathObj)).getLocation().then(function (Location) {
        logger.info("Vertical Location Of dataSource List Table 'Y-axis' : " + Location.y)
        return Location.y;
    });
};

dataScience_data.prototype.getAddDataSourceButtonLocation = function (index) {
    let addDataSourceButtonXpathObj = this.btnAddDataSource + "\[" + index + "\]";
    return element(by.xpath(addDataSourceButtonXpathObj)).getLocation().then(function (Location) {
        logger.info("Vertical Location Of addDataSource 'Y-axis' : " + Location.y)
        return Location.y;
    });
};
dataScience_data.prototype.getAddDataSourceFromFileButtonLocation = function (index) {
    let addSourceFromFileButtonXpathObj = this.btnAddDataFromFile + "\[" + index + "\]";
    return element(by.xpath(addSourceFromFileButtonXpathObj)).getLocation().then(function (Location) {
        logger.info("Vertical Location Of addDataSourceFromFile 'Y-axis' : " + Location.y)
        return Location.y;
    });
};

//********************** functions use to count Total Data Source records ********************************
dataScience_data.prototype.getTotalCountOfDataSource = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.dataSourceListXpath))), 5000).then(function () {
        logger.info("Waiting for data source list is visible...");
    }).catch(function (err) {
        logger.info("data source list is not visible..");
    });
    return element.all(by.xpath(this.dataSourceListXpath)).count().then(function (dataSourceTotalCount) {
        logger.info("Datasource Summary Page list Total Count is " + dataSourceTotalCount)
        return dataSourceTotalCount;
    });

};
dataScience_data.prototype.getDataSourceTotalCountOfAccountDropdown = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.volumeAccountOptions))), 5000).then(function () {
        logger.info("Waiting for volume accounts to be visible...");
    }).catch(function (err) {
        logger.info("volume accounts is not visible...");
    });
    return element.all(by.xpath(this.volumeAccountOptions)).count().then(function (count) {
        logger.info("Account Dropdown Total list Item Count : " + count)
        return count;
    });
};

dataScience_data.prototype.getTotalCountOfDataSourceDropdown = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.dataSourceOptionInDropdown))), 5000).then(function () {
        logger.info("Waiting for Data Source List to be visible...");
    }).catch(function (err) {
        logger.info("Data Source List is not visible...");
    });
    return element.all(by.xpath(this.dataSourceOptionInDropdown)).count().then(function (count) {
        logger.info("data source Dropdown Total list Item Count On Add Data From File pop-up window : " + count)
        return count;
    });
};


dataScience_data.prototype.getTotalCountOfProjectDropdownListItems = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.projectOptions))), 5000).then(function () {
        logger.info("Waiting for project List to be visible...");
    }).catch(function (err) {
        logger.info("Project List is not visible...");
    });
    return element.all(by.xpath(this.projectOptions)).count().then(function (count) {
        logger.info("Project Dropdown Total list Item Count On Add Data Source pop-up window : " + count)
        return count - 1;
    });
};

//**************************Functions use to work on arrays ***************************************
dataScience_data.prototype.getAllValuesInArrayOfAccountDropdown = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.volumeAccountOptions))), 5000).then(function () {
        logger.info("Waiting for Account List to be visible...");
    }).catch(function (err) {
        logger.info("Account List is not visible...");
    });
    return element.all(by.xpath(this.volumeAccountOptions)).getText().then(function (accountDropdownListArray) {
        logger.info("Account Dropdown value array : " + accountDropdownListArray)
        return accountDropdownListArray;
    });
};

dataScience_data.prototype.getAllDetailsOfDataSource = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.allSourceNameOnDataSourceSummaryPage))), 5000).then(function () {
        logger.info("Waiting for data source list is visible...");
    }).catch(function (err) {
        logger.info("data source list is not visible..");
    });
    return element.all(by.xpath(this.allSourceNameOnDataSourceSummaryPage)).getText().then(function (dataSourceArray) {
        logger.info("data source summary page SourceName column all values : " + dataSourceArray)
        return dataSourceArray;
    });
};

dataScience_data.prototype.getRandomDataSourceName = function (index) {
    let randomDataSourceName = this.getRandomSourceNameforSearching;
    return element.all(by.xpath(this.allSourceNameOnDataSourceSummaryPage)).count().then(function (cnt) {
        if (cnt > 0 && index <= cnt) {
            var randomSourceNameXpathobj = randomDataSourceName + index + "]/td[1]"
            return element(by.xpath(randomSourceNameXpathobj)).getText().then(function (txt) {
                logger.info("Random SourceName values : " + txt)
                return txt;
            });
        }
        else {
            logger.info("No data source availabel..");
        }
    });
};


dataScience_data.prototype.getAllValuesInArrayOfProjectDropdown = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.projectOptions))), 5000).then(function () {
        logger.info("Waiting for Project List to be visible...");
    }).catch(function (err) {
        logger.info("Project List is not visible...");
    });
    return element.all(by.xpath(this.projectOptions)).getText().then(function (ProjectDropdownListArray) {
        logger.info("Project Dropdown value array : " + ProjectDropdownListArray)
        let arr = [];
        let j = 0;
        for (let i = 0; i < ProjectDropdownListArray.length; i++) {
            if (ProjectDropdownListArray[i] != "-- Select Project") {
                arr[j] = ProjectDropdownListArray[i]
                j++;
            }
        }
        return arr;
    });
};

dataScience_data.prototype.getAllValuesInArrayOfDataSourceDropdown = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.dataSourceOptionInDropdown))), 5000).then(function () {
        logger.info("Waiting for Data Source List to be visible...");
    }).catch(function (err) {
        logger.info("Data Source List is not visible...");
    });
    return element.all(by.xpath(this.dataSourceOptionInDropdown)).getText().then(function (DataSourceDropdownListArray) {
        logger.info("DataSource Dropdown value array : " + DataSourceDropdownListArray)
        return DataSourceDropdownListArray;
    });
};

//********************************Function uses to get File to upload***********************************
dataScience_data.prototype.getFileForUploading = function (fName) {
    var fileUploadingPath = homedir;
    var fileName = fName;
    var flag = 0;
    let dirContent = Buffer.from(fileUploadingPath);
    fs.readdir(dirContent, function (err, files) {
        if (err) { console.log(err.message); }
        else {
            for (let i = 0; i < files.length; i++) {
                if (files[i] == fileName) {
                    flag = 1;
                    console.log('File exists:####### ');
                }
            }
            if (flag == 0) {
                fs.writeFile(homedir + "/" + fName, 'A new file created for data source', (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log('New File created successfully:####### ');
                    }
                });
            }
        }
    });
};

module.exports = dataScience_data;