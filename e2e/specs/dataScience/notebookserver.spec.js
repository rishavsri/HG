/* 
Spec Name : datascience.notebookserver.spec.js
Decription : This spec will cover functions for notebook server tab.
Author : Zalak Mistry
*/

"use strict";

const { browser, Browser, ExpectedConditions, ProtractorExpectedConditions, element } = require('protractor');

const dataScience = require('../../pageObjects/datascience.notebookserversPageObject.js');
var datascience_notebookserver = require('../../pageObjects/datascience.notebookserversPageObject.js'),
        async = require('async'),
        logGenerator = require("../../../helpers/logGenerator.js"),
        logger = logGenerator.getApplicationLogger(),
        appUrls = require('../../../testData/appUrls.json'),
        util = require('../../../helpers/util.js');

describe('Datascience - Notebookserver', function () {
        var datascienceNotebookserverPage;
        
        var allStrings = {
                getProjectSummeryPageTitle : 'Notebook Servers',
                serverNameErr : 'A notebook server name with no more than 64 characters is required',
                serverCPUErr: 'A valid cpu unit must be provided and greater than 1',
                serverMemoryErr:'A valid memory value must be provided in the form {value}Gi',
                nameDescription:'Specify the name of the notebook server and the project it will belong to.',
                imageDescription:'A starter Jupyter docker image with a baseline deployment and typical ML packages',
        
        };
        beforeAll(function () {
            datascienceNotebookserverPage = new datascience_notebookserver();
            browser.driver.manage().window().maximize();
            // browser.manage().window().setSize(1920,1080);
        });

        beforeEach(function () {
                // expect(util.getCurrentURL()).toMatch(appUrls.homePageUrl);
                datascienceNotebookserverPage.clickDatascience();
                datascienceNotebookserverPage.clickNotebookServer();
                datascienceNotebookserverPage.clicks
                // browser.executeScript('window.scrollTo(0,0);');
                browser.sleep(5000);
        });
  

        afterAll(function () {
                logger.info("After all Method Executing");
                // datascienceProjectsPage.clickLogOutUser();
                browser.close();
                // driver.quit();
        });

        it("Verify User is naviagated to Notebook Servers Page ", function () {
                        
            expect(browser.getTitle()).toContain('HyperDrive');
        });

        it("Verify ServerName is clickable on Notebook Servers Page ", function () {
                        
            expect(datascienceNotebookserverPage.clickServerName()).toBe(true);
        });

        it("Verify Project Name is clickable on Notebook Servers Page ", function () {
                        
            expect(datascienceNotebookserverPage.clickProjectName()).toBe(true);
        });

        it("Verify Customer is clickable on Notebook Servers Page ", function () {
                        
            expect(datascienceNotebookserverPage.clickCustomer()).toBe(true);
        });

        it("Verify Status is clickable on Notebook Servers Page ", function () {
                        
            expect(datascienceNotebookserverPage.clickStatus()).toBe(true);
        });

        it("Verify Date Created is clickable on Notebook Servers Page ", function () {
                        
            expect(datascienceNotebookserverPage.clickDateCreated()).totoBe(true);
        });

        it("Verify clicking on Server Name displays ↑ arrow ", function () {
            datascienceNotebookserverPage.clickServerName();
            expect(datascienceNotebookserverPage.UpArrow()).totoBe(true);
        });

        it("Verify clicking on Project Name displays ↑ arrow ", function () {
            datascienceNotebookserverPage.clickProjectName();
            expect(datascienceNotebookserverPage.UpArrow()).totoBe(true);
        });

        it("Verify clicking on Customer displays ↑ arrow ", function () {
            datascienceNotebookserverPage.clickCustomer();
            expect(datascienceNotebookserverPage.UpArrow()).totoBe(true);
        });

        it("Verify clicking on Status displays ↑ arrow ", function () {
            datascienceNotebookserverPage.clickStatus();
            expect(datascienceNotebookserverPage.UpArrow()).totoBe(true);
        });

        it("Verify clicking on Date Created displays ↑ arrow", function () {
            datascienceNotebookserverPage.clickDateCreated();
            expect(datascienceNotebookserverPage.UpArrow()).totoBe(true);
        });

        it("Verify clicking on Server Name displays ↓ arrow  ", function () {
            datascienceNotebookserverPage.clickServerName();
            expect(datascienceNotebookserverPage.downArrow()).totoBe(true);
        });

        it("Verify clicking on Project Name displays ↓ arrow  ", function () {
            datascienceNotebookserverPage.clickProjectName();
            expect(datascienceNotebookserverPage.downArrow()).totoBe(true);
        });

        it("Verify clicking on Customer displays ↓ arrow ", function () {
            datascienceNotebookserverPage.clickCustomer();
            expect(datascienceNotebookserverPage.downArrow()).totoBe(true);
        });

        it("Verify clicking on Status displays ↓ arrow  ", function () {
            datascienceNotebookserverPage.clickStatus();
            expect(datascienceNotebookserverPage.downArrow()).totoBe(true);
        });

        it("Verify clicking on Date Created displays ↓ arrow  ", function () {
            datascienceNotebookserverPage.clickDateCreated();
            expect(datascienceNotebookserverPage.downArrow()).totoBe(true);
        });

        it("Verify Jupyter button is clickable ", function () {
            
            expect(datascienceNotebookserverPage.clickJupyter()).totoBe(true);
        });

        it("Verify Jupyter Lab button is clickable ", function () {
            
            expect(datascienceNotebookserverPage.clickJupyterLab()).totoBe(true);
        });

        it("Verify Trash Can is clickable ", function () {
            
            expect(datascienceNotebookserverPage.clickTrashCan()).totoBe(true);
        });

        it("Verify Jupyter and Jupyter Lab button is clickable when status is online ", function () {
            if (datascienceNotebookserverPage.getStatus() == "Online") 
            {
                expect(datascienceNotebookserverPage.clickJupyter()).totoBe(true);
                expect(datascienceNotebookserverPage.clickJupyterLab()).totoBe(true);
            } else 
            {
                expect(datascienceNotebookserverPage.clickJupyter()).totoBe(false);
                expect(datascienceNotebookserverPage.clickJupyterLab()).totoBe(false);
            }
            
        });

        it("Verify Pop Up displays when clicking on create Server button", function () {

            datascienceNotebookserverPage.clickCreateServer();
            expect(datascienceNotebookserverPage.clickLaunchBtn()).totoBe(true);
            expect(datascienceNotebookserverPage.clickcancelbtn()).totoBe(true);
            expect(datascienceProjectsPage.getNoteBookServer()).toEqual("CREATE NEW NOTEBOOK SERVER");

        });

        it("Verify Name, Image, CPU/RAM, GPU is displayed in popup when clicking on create Server button", function () {
            
            datascienceNotebookserverPage.clickCreateServer();
            expect(datascienceProjectsPage.getNoteBookName()).toEqual("Name");
            expect(datascienceProjectsPage.getNoteBookImage()).toEqual("Image");
            expect(datascienceProjectsPage.getNoteCPU()).toEqual("CPU / RAM");
            expect(datascienceProjectsPage.getNoteGPU()).toEqual("GPUs");

        });


        it("Verify total numbers of servers on page", function () {
            datascienceNotebookserverPage.getTotalServerCount();
            
            // expect(datascienceNotebookserverPage.getProjectSummeryPageTitle()).toEqual(allStrings.getProjectSummeryPageTitle);
            expect(browser.getCurrentUrl()).toContain('/notebooks');
        });
        
        it("Verify page titles ", function () {
                datascienceNotebookserverPage.getTotalServerCount();
                
                expect(datascienceNotebookserverPage.getServerSummeryPageTitle()).toEqual(allStrings.getProjectSummeryPageTitle);
                
            });
        it('Verify Cancel Button is clicked', function() {
            datascienceNotebookserverPage.clickDeleteServer();
            datascienceNotebookserverPage.clickCancelDeleteServer();
           
            expect(browser.getCurrentUrl()).toContain('/notebooks');
        
            //Assertion for pop up is not present
    });

        it('Delete Notebook Server Functionality', function() {
            datascienceNotebookserverPage.clickDeleteServer();
            browser.sleep(2000);
            datascienceNotebookserverPage.clickTerminate();
            
            expect(browser.getCurrentUrl()).toContain('/notebooks');
            //Assertion for user got deleted
    });
    it("Verify navigates Create Server page", function () {    
        datascienceNotebookserverPage.clickCreateServer();
        browser.sleep(2000); 
        datascienceNotebookserverPage.clickCancelServer();
        expect(browser.getCurrentUrl()).toContain('/notebooks');
            
    });

    it('Verify Cancel Button on create server is clicked', function() {
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.clickCancelServer();
        browser.sleep(2000); 
        expect(browser.getCurrentUrl()).toContain('/notebooks');
    });
    it('Verify Launch Button on create server is clicked', function() {
       
        var index = 1;
        var ServerName = "Test server " + util.getRandomString(4);
        var cpuValue = util.getRandomNumber(1) + ".5";
        var memoryValue = util.getRandomNumber(1) + ".5Gi";
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterServertName(ServerName, index);
        datascienceNotebookserverPage.enterCpuValue(cpuValue, index);
        datascienceNotebookserverPage.enterMemoryValue(memoryValue, index);
        browser.sleep(2000);
        datascienceNotebookserverPage.clickLaunchBtn();
        expect(browser.getCurrentUrl()).toContain('/notebooks');
        
    });
    xit("Verify NAME textfield allows character limit of 64 characters' 'Server Name' (mandatory) textfield", function () {
       
        var index = 1;
        var ServerName = "Test " + util.getRandomString(60);
        var cpuValue = util.getRandomNumber(1) + ".5";
        var memoryValue = util.getRandomNumber(1) + ".5Gi";
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterServertName(ServerName, index);
        datascienceNotebookserverPage.enterCpuValue(cpuValue, index);
        datascienceNotebookserverPage.enterMemoryValue(memoryValue, index);
        browser.sleep(2000);
        datascienceNotebookserverPage.clickLaunchBtn();
        expect(browser.getCurrentUrl()).toContain('/notebooks');
    });
    it("Verify entering and removing the name from NAME textfield displays error message' 'Server Name' (mandatory) textfield", function () {
       
        var index = 1;
        var ServerName = "Test Server" + util.getRandomString(4);
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterServertName(ServerName, index);
        datascienceNotebookserverPage.clearServertName();
        browser.sleep(2000);
        expect(datascienceNotebookserverPage.getServerNameTextErrorMsg(index)).toBe(allStrings.serverNameErr);
        datascienceNotebookserverPage.clickCancelServer();
    });
    it("Verify entering more than 64 characters into NAME textfield displays error message' 'Server Name' (mandatory) textfield", function () {
       
        var index = 1;
        var ServerName = "Test server " + util.getRandomString(65);
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterServertName(ServerName, index);
        browser.sleep(2000); 
        expect(datascienceNotebookserverPage.getServerNameTextErrorMsg(index)).toBe(allStrings.serverNameErr);
        datascienceNotebookserverPage.clickCancelServer();
   });
   it("Verify only A valid cpu unit must be provided and greater than 1' 'cpu' (mandatory) textfield", function () {
       
        var index = 1;
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterCpuValue("@#$12", index);
        datascienceNotebookserverPage.clearCpuValue();
        browser.sleep(2000); 
        expect(datascienceNotebookserverPage.getCPUTextErrorMsg(index)).toBe(allStrings.serverCPUErr);
        datascienceNotebookserverPage.clickCancelServer();
   });
   it("Verify only A valid memory value must be provided in the form {value}Gi' 'Memory' (mandatory) textfield", function () {
       
        var index = 1;
        datascienceNotebookserverPage.clickCreateServer();
        datascienceNotebookserverPage.enterMemoryValue("12", index);
        browser.sleep(2000); 
        expect(datascienceNotebookserverPage.getServerMemoryTextErrorMsg(index)).toBe(allStrings.serverMemoryErr);
        datascienceNotebookserverPage.clickCancelServer();
   });
   it("Verify Name section displays instruction' 'Name' (mandatory) textfield", function () {
       
        datascienceNotebookserverPage.clickCreateServer();
        browser.sleep(2000); 
        expect(datascienceNotebookserverPage.getNameDescription()).toBe(allStrings.nameDescription);
        datascienceNotebookserverPage.clickCancelServer();
    });
   it("Verify Image section displays instruction' 'Image' (mandatory) textfield", function () {
       
        datascienceNotebookserverPage.clickCreateServer();
        browser.sleep(2000); 
        expect(datascienceNotebookserverPage.getImageDescription()).toBe(allStrings.imageDescription);
        datascienceNotebookserverPage.clickCancelServer();
    });
  
    });