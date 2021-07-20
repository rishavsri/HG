
"use strict";
const path = require('path');
var homedir = require('os').homedir();
//var finder = require('findit');  //.find(__dirname);
var fs = require('fs');
const { Logger } = require('log4js');
const { browser, promise } = require('protractor');
var dataScience = require('../../pageObjects/datascience.projectPageObject.js');
const { waitForLoadingOverlay } = require('../../../helpers/util.js');
var datascience_data = require('../../pageObjects/datascience.dataPageObject.js'),
        //async = require('async'),
        logGenerator = require("../../../helpers/logGenerator.js"),
        logger = logGenerator.getApplicationLogger(),
        appUrls = require('../../../testData/appUrls.json'),
        util = require('../../../helpers/util.js');

describe("Datascience - Data", function () {
        var datascienceDataPage;
        var datascienceProjectPage;
        var sourceName = "DemoDataSource" + util.getRandomString(4);
        var description = "DemoDescription" + util.getRandomString(4);
        var volumeName = "DemoVolumeName" + util.getRandomString(4);
        var messageStrings = {
                dataSourceNameMaxLimitError: 'A source name with no more than 64 characters is required',
                dataSourceNameError: 'Source name already exists, please rename to save',
                dataSourceDescriptionMaxLimitError: 'A description must be no more than 250 characters',
                volumeNameValidationError: 'A volume name is required',
                addDataSourceBtnStatus: 'true',
                dataSourceSummaryPageTitle: 'Data Sources',
                dataSourceSummaryPageUrl: appUrls.datasourcePageUrl,
                searchResultNotFoundMessage: 'No data available.',
        };

        beforeAll(function () {
                datascienceDataPage = new datascience_data();
                datascienceProjectPage = new dataScience();
                browser.driver.manage().window().maximize();
        });

        beforeEach(function () {
                expect(util.getCurrentURL()).toMatch(appUrls.homePageUrl);
                datascienceDataPage.clickDatascience();
                datascienceDataPage.clickData();  
                expect(util.getCurrentURL()).toMatch(appUrls.datasourcePageUrl); 
        });

        afterAll(function () {
                // logger.info("After all Method Executing");
                // datascienceProjectsPage.clickLogOutUser();
                // browser.close();
                // driver.quit();
        });

        xit("Verify clicking ADD DATA SOURCE button displays Add Data Source pop-up window displaying editable textfields and dropdowns 'SOURCE NAME' (mandatory), 'DESCRIPTION', 'PROJECT' (mandatory), 'ACCOUNT' (mandatory), 'VOLUME NAME' (mandatory), 'VOLUME REGION', 'x' to close pop-up and disabled ADD button", function () {
                var index = 1;

                datascienceDataPage.clickAddDataSource();
                //  browser.sleep(5000);
                datascienceDataPage.enterSourceName(sourceName, index);
                datascienceDataPage.enterDescription(description, index);
                datascienceDataPage.selectProjectDropdown();
                // browser.sleep(5000)
                datascienceDataPage.selectProjectList(index)
                datascienceDataPage.selectVolumeAccount();
                //  browser.sleep(5000)
                datascienceDataPage.selectVolumeAccountList(index);
                datascienceDataPage.selectVolumeRadioButton();
                datascienceDataPage.enterVolumeName(volumeName, index);
                datascienceDataPage.selectVolumeRegion();
                // browser.sleep(5000)
                datascienceDataPage.selectVolumeRegionList(index);
                datascienceDataPage.clickAdd();

        });

        xit("Verify editable 'Search Data Source' textfield displays below page title and will search results based off of source name, description", function () {
                let index = 1;
                var searchText;
                browser.sleep(4000);
                var totalCount = datascienceDataPage.getTotalCountOfDataSource();
                var randomSourceName =util.getRandomInteger(1,4)
                searchText =  datascienceDataPage.getRandomDataSourceName(randomSourceName);
                logger.info("searchText: "+searchText)
                browser.sleep(4000);
                datascienceDataPage.EnterSearchDataSource(searchText, index);
                datascienceDataPage.clickSearchDataSource();
                browser.sleep(4000);
                datascienceDataPage.checkSearchOutput(searchText);
                browser.sleep(4000);
                datascienceDataPage.clickClearSearchData();
                browser.sleep(4000);
                expect(datascienceDataPage.getTotalCountOfDataSource()).toEqual(totalCount);
        });

        xit("Verify entering search that has no matches results in a message to user 'No data available.'", function () {
                let index = 1;
                var searchText = util.getRandomString(10);
                datascienceDataPage.EnterSearchDataSource(searchText, index);
                expect(datascienceDataPage.getDataSourceSearchResultNotFound(index)).toMatch(messageStrings.searchResultNotFoundMessage);

        });

        xit("Verify clicking close button closes the Add Data Source pop-up window", function () {
                var index = 1;
                datascienceDataPage.clickAddDataSource();
                datascienceDataPage.clickCloseButton();
        });

        xit("Verify clicking Edit button displays pop-up 'Edit Datasource' along with editable SOURCE NAME and DESCRIPTION Textfields", function () {
                var index = 1;
                var updatedSourceName = "UpdatedDataSource" + util.getRandomString(6);
                var updatedDescription = "UpdatedDescription" + util.getRandomString(6);
                datascienceDataPage.clickEditDataSource()
                browser.sleep(5000)
                datascienceDataPage.resetDataSourceName();
                datascienceDataPage.EnterUpdatedDataSource(updatedSourceName, index);
                datascienceDataPage.resetDescription();
                datascienceDataPage.EnterUpdatedDescription(updatedDescription, index);
                datascienceDataPage.clickUpdate();

        });

        xit("Verify clicking trashcan icon displays pop-up 'Delete Data Source Are you sure you want to remove Sales Data? Any notebooks using this datasource will stop working.', along with clickable CANCEL and DELETE buttons", function () {
                datascienceDataPage.clickDeleteDataSource()
                browser.sleep(5000)
                datascienceDataPage.clickConfirmDeleteDataSource();

        });

        it("Verify clicking CANCEL button closes the delete datasource pop-up window", function () {
                datascienceDataPage.clickDeleteDataSource()
                browser.sleep(5000)
                datascienceDataPage.clickCancelDeleteDataSourceOperation();
        });

        xit("Verify clicking ADD DATA FROM FILE button displays Add Data From File pop-up window displaying 'DATA SOURCE' dropdown and 'FILE NAME' (mandatory) textfield with clickable BROWSE button next to field, 'x' to close pop-up and disabled ADD button", function () {
                var index = 1;
                var fileName = "demo.txt"
                browser.sleep(5000)
                datascienceDataPage.clickAddDataFromFile();
               // browser.sleep(5000)
                datascienceDataPage.selectDataSourceForAddDataFromFile();
              //  browser.sleep(3000)
                datascienceDataPage.selectDataSourceListForAddDataFromFile(index);
                //datascienceDataPage.clickBrowse();
                // browser.sleep(5000)
                datascienceDataPage.getFileForUploading(fileName)
                var absolutePath =homedir+"/"+fileName;
                datascienceDataPage.UploadFile(absolutePath);
                // browser.sleep(5000)
                datascienceDataPage.clickAddButton();
        });

        xit("Verify Source Name can not be already used or an error message will display to the user \"Source name already exists, please rename to save\"", function () {
                let index = 1;
                let randomSourceName =util.getRandomInteger(1,4)
                browser.sleep(5000)
                let sameSourceName = datascienceDataPage.getRandomDataSourceName(randomSourceName);
                let nm = promise.fullyResolved(sameSourceName);
                nm.then((name)=>{
                        logger.info('SOURCE NAME ############'+name);
                       
                })
                datascienceDataPage.clickAddDataSource();
                browser.sleep(5000);
                datascienceDataPage.enterSourceName(sameSourceName, index);
                browser.sleep(5000);
                expect(datascienceDataPage.getDataSourceNameTextErrorMsg(index)).toEqual(messageStrings.dataSourceNameError);
        });

        xit("Verify tabbing through blank editable textfield 'VOLUME NAME' displays error message \"A volume name is required\"", function () {
                let index = 1;
                let tabAction = '';
                datascienceDataPage.clickAddDataSource();
                browser.sleep(5000);
                datascienceDataPage.enterVolumeName(tabAction, index);
                browser.actions().sendKeys(protractor.Key.TAB).perform();
                expect(datascienceDataPage.getVolumeNameTextErrorMsg(index)).toEqual(messageStrings.volumeNameValidationError);
        });

        xit("Verify ADD button enables once text is entered into the SOURCE NAME and VOLUME NAME textfields", function () {
                let index = 1;
                datascienceDataPage.clickAddDataSource();
                browser.sleep(5000);
                datascienceDataPage.enterSourceName(sourceName, index);
                datascienceDataPage.enterVolumeName(volumeName, index);
                expect(datascienceDataPage.getAddDataSourceBtnStatus(index)).not.toEqual(messageStrings.addDataSourceBtnStatus)

        });

        xit("Verify removing SOURCE NAME or VOLUME NAME data from textfields disables the ADD button", function () {
                let index = 1;
                datascienceDataPage.clickAddDataSource();
                browser.sleep(5000);
                datascienceDataPage.enterSourceName(sourceName, index);
                datascienceDataPage.enterVolumeName(volumeName, index);
                browser.sleep(5000);
                datascienceDataPage.resetDataSourceName();
                expect(datascienceDataPage.getAddDataSourceBtnStatus(index), "Button is not disabled").toEqual(messageStrings.addDataSourceBtnStatus)
        });

        xit("Verify user is navigated to Data Sources Summary List page when clicking 'Data Science' > ‘Data’ options in left hand navigation", function () {
                let index = 1;
                browser.sleep(3000);
                logger.info("sourceURL: " + util.getCurrentURL());
                expect(util.getCurrentURL()).toMatch(messageStrings.dataSourceSummaryPageUrl);
                expect(datascienceDataPage.getDataSourceSummaryPageTitle(index)).toEqual(messageStrings.dataSourceSummaryPageTitle);
        });

        xit("Verify Data Sources title and clickable ADD DATA SOURCE and ADD DATA FROM FILE buttons display above table of listed data sources", function () {
                let index = 1;
                browser.sleep(3000);
                expect(datascienceDataPage.getDataSourceSummaryPageTitle(index)).toEqual(messageStrings.dataSourceSummaryPageTitle);
                expect(datascienceDataPage.getAddDataSourceButtonLocation(index)).toBeLessThan(datascienceDataPage.getDataSourceListLocation(index));
                expect(datascienceDataPage.getAddDataSourceFromFileButtonLocation(index)).toBeLessThan(datascienceDataPage.getDataSourceListLocation(index));
        });

        xit("Verify Source Name textfield allows character limit of 64 characters And Verify Description textfield allows character limit of 250 characters", function () {
                let index = 1;
                let datasourceName = "DemoDataSource" + util.getRandomString(65);
                let dataDescription = "DemoDescription" + util.getRandomString(251);
                datascienceDataPage.clickAddDataSource();
                browser.sleep(5000);
                datascienceDataPage.enterSourceName(datasourceName, index);
                datascienceDataPage.enterDescription(dataDescription, index);
                expect(datascienceDataPage.getDataSourceNameTextErrorMsg(index)).toMatch(messageStrings.dataSourceNameMaxLimitError);
                expect(datascienceDataPage.getDescriptionTextErrorMsg(index)).toMatch(messageStrings.dataSourceDescriptionMaxLimitError);
                browser.sleep(5000);
        });

        xit("Verify DATA SOURCE dropdown field includes list of all existing data sources displayed on Data Sources Summary List page", function () {
                let dataSourceDropdownListArray = [];
                let dataSourceSummaryPageListArray = [];
                browser.sleep(4000);
                browser.executeScript('window.scrollTo(0,5000);');
                browser.sleep(4000);
                dataSourceSummaryPageListArray = datascienceDataPage.getAllDetailsOfDataSource();
                let dataSourceSummaryListCount = datascienceDataPage.getTotalCountOfDataSource();
                datascienceDataPage.clickAddDataFromFile();
                browser.sleep(5000)
                datascienceDataPage.selectDataSourceForAddDataFromFile();
                dataSourceDropdownListArray = datascienceDataPage.getAllValuesInArrayOfDataSourceDropdown();
                Promise.all([dataSourceSummaryPageListArray, dataSourceDropdownListArray]).then((values) => {
                        console.log(values[0]);
                        console.log("==========================================================================================");
                        console.log(values[1]);
                        expect(values[0].map(ar => ar).sort()).toEqual(values[1].map(arr => arr).sort());
                });
                expect(datascienceDataPage.getTotalCountOfDataSourceDropdown()).toEqual(dataSourceSummaryListCount)
        });

        xit("Verify PROJECT dropdown field displays list of all projects existing on Projects Summary List page", function () {
                var projectSummaryPageListArray = [];
                var projectDropdownListArray = [];
                browser.sleep(5000);
                datascienceProjectPage.clickProjects();
                browser.sleep(4000);
                browser.executeScript('window.scrollTo(0,5000);');
                browser.sleep(5000)
                projectSummaryPageListArray = datascienceProjectPage.getAllRecordsOfProjectSummaryListPage();
                let projectCountFromProjectTab = datascienceProjectPage.getTotalProjectCount();
                datascienceDataPage.clickData();
                datascienceDataPage.clickAddDataSource();
                browser.sleep(4000);
                datascienceDataPage.selectProjectDropdown();
                browser.executeScript('window.scrollTo(0,2000);');
                browser.sleep(5000);
                projectDropdownListArray = datascienceDataPage.getAllValuesInArrayOfProjectDropdown();
                let projectCountFromProjectDropdownList = datascienceDataPage.getTotalCountOfProjectDropdownListItems();
                Promise.all([projectSummaryPageListArray, projectDropdownListArray]).then((values) => {
                        console.log(values[0]);
                        console.log("==========================================================================================");
                        console.log(values[1]);
                        expect(values[0].map(ar => ar).sort()).toEqual(values[1].map(arr => arr).sort());
                });
                expect(projectCountFromProjectDropdownList).toEqual(projectCountFromProjectTab);
        });

        xit("Verify ACCOUNT dropdown field displays list of all sources existing on Data Sources Summary List page", function () {
                let accountListArray = [];
                let dataSourceSummaryPageListArray = [];
                browser.sleep(4000);
                browser.executeScript('window.scrollTo(0,2000);');
                browser.sleep(4000);
                let dataSourceSummryListCount = datascienceDataPage.getTotalCountOfDataSource();
                dataSourceSummaryPageListArray = datascienceDataPage.getAllDetailsOfDataSource();
                datascienceDataPage.clickAddDataSource();
                browser.sleep(4000);
                datascienceDataPage.selectVolumeAccount();
                let dataSourceListCountUnderAccountDropdown = datascienceDataPage.getDataSourceTotalCountOfAccountDropdown();
                accountListArray = datascienceDataPage.getAllValuesInArrayOfAccountDropdown();
                Promise.all([dataSourceSummaryPageListArray, accountListArray]).then((values) => {
                        console.log(values[0] + "### ####" + values[1])
                        expect(values[0].map(ar => ar).sort()).toEqual(values[1].map(arr => arr).sort());
                });
                expect(dataSourceListCountUnderAccountDropdown).toEqual(dataSourceSummaryListCount);
        });
});
