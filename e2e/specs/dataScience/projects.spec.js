/*  info related spec  */
"use strict";

const { browser, promise } = require('protractor');

var datascienceProjects = require('../../pageObjects/datascience.projectPageObject.js'),
        async = require('async'),
        logGenerator = require("../../../helpers/logGenerator.js"),
        logger = logGenerator.getApplicationLogger(),
        appUrls = require('../../../testData/appUrls.json'),
        util = require('../../../helpers/util.js');


describe('Datascience - Projects', function () {
        var datascienceProjectsPage;

        var messageStrings = {
                getProjectSummaryPageTitle: 'Projects',
                projectNameError: 'A project name with no more than 255 characters is required',
                customerNameError: 'A customer name with no more than 255 characters is required',
                projectUpdationConfirmationText: 'Project updated',
                projectStatus: 'Active',
                projectKpisPlaceholderValue: 'Project KPIs',
        };
        beforeAll(function () {
                datascienceProjectsPage = new datascienceProjects();
                browser.driver.manage().window().maximize();
        });

        beforeEach(function () {
                expect(util.getCurrentURL()).toMatch(appUrls.homePageUrl);
                datascienceProjectsPage.clickDatascience();
                datascienceProjectsPage.clickProjects();
                expect(util.getCurrentURL()).toMatch(appUrls.projectsPageUrl);
               // browser.sleep(3000)
        });

        afterAll(function () {
                // logger.info("After all Method Executing");
                // datascienceProjectsPage.clickLogOutUser();
                // browser.close();
                // driver.quit();
        });

        it(" 1. Verify clicking CREATE PROJECT button navigates user to the new project page, displaying editable Project Name textfield, Back arrow and disabled SAVE & ACTIVATE and SAVE buttons in top section of page", function () {
                let index = 1;
                let projectName = "ppDemoproject" + util.getRandomString(4);
                let customerName = "Democustomer" + util.getRandomString(4);
                let projectGoal = "Demogoal" + util.getRandomString(4);
                let businessComponent = "DemoBusinessComp" + util.getRandomString(4);
                let businessProcess = "DemoBusinessProc" + util.getRandomString(4);
                let businessFunction = "DemoBusinessFunct" + util.getRandomString(4);
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.enterProjectName(projectName, index);
                datascienceProjectsPage.enterCustomerName(customerName, index);
                datascienceProjectsPage.enterProjectGoal(projectGoal, index);
                datascienceProjectsPage.enterBusinessComponent(businessComponent, index);
                datascienceProjectsPage.enterBusinessProcess(businessProcess, index);
                datascienceProjectsPage.enterBusinessFunction(businessFunction, index);
                datascienceProjectsPage.clickProjectKpis(index);
                browser.sleep(5000)
                datascienceProjectsPage.selectProjectKpisValue(util.getRandomNumber(1));
                datascienceProjectsPage.clickSaveProjectDetails();
        });

        it("2. Verify clicking SAVE & ACTIVATE button saves the project and puts the project in an Active status", function () {
                let index = 1;
                let projectName = "Demoproject" + util.getRandomString(4);
                let customerName = "Democustomer" + util.getRandomString(4);
                let projectGoal = "Demogoal" + util.getRandomString(4);
                let businessComponent = "DemoBusinessComp" + util.getRandomString(4);
                let businessProcess = "DemoBusinessProc" + util.getRandomString(4);
                let businessFunction = "DemoBusinessFunct" + util.getRandomString(4);
                browser.sleep(5000);
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.enterProjectName(projectName, index);
                datascienceProjectsPage.enterCustomerName(customerName, index);
                datascienceProjectsPage.enterProjectGoal(projectGoal, index);
                datascienceProjectsPage.enterBusinessComponent(businessComponent, index);
                datascienceProjectsPage.enterBusinessProcess(businessProcess, index);
                datascienceProjectsPage.enterBusinessFunction(businessFunction, index);
                datascienceProjectsPage.clickProjectKpis(index);
                browser.sleep(5000)
                datascienceProjectsPage.selectProjectKpisValue(util.getRandomNumber(1));
                datascienceProjectsPage.clickSaveAndActivateProject();
                browser.sleep(4000)
                browser.executeScript('window.scrollTo(0,10000);');
                browser.sleep(4000)
                expect(datascienceProjectsPage.getStatusOfProject(projectName)).toMatch(messageStrings.projectStatus);
        });

        it("3. Verify clicking any of the row details navigates user to the project details page for editing any of the project information along with disabled SAVE & ACTIVATE and SAVE butttons", function () {
                let index = 1;
                let randomNo = util.getRandomInteger(2, 5);
                let customerName = "UpdatedDemocustomer" + util.getRandomString(4);
                let projectGoal = "updatedDemogoal" + util.getRandomString(4);
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                browser.sleep(4000);
                datascienceProjectsPage.enterCustomerName(customerName, index);
                datascienceProjectsPage.enterProjectGoal(projectGoal, index);
                datascienceProjectsPage.clickSaveProjectDetails();
                browser.sleep(4000);
                expect(datascienceProjectsPage.getProjectUpdatedConfirmationToastText()).toEqual(messageStrings.projectUpdationConfirmationText)

        });

        it("4. Verify clicking Back arrow with text entered into Project Name textfield displays a pop-up that leaving the screen will delete all entered information, along with clickable Continue and Cancel buttons", function () {
                let index = 1;
                let projectName = "ppDemoproject" + util.getRandomString(4);
                let customerName = "Democustomer" + util.getRandomString(4);
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.enterProjectName(projectName, index);
                datascienceProjectsPage.enterCustomerName(customerName, index);
                datascienceProjectsPage.clickArrowForBackNavigation();
                browser.sleep(4000);
                datascienceProjectsPage.clickContinueForUnsavedChages();
                browser.sleep(4000);
                expect(datascienceProjectsPage.getProjectSummaryPageTitle()).toEqual(messageStrings.getProjectSummaryPageTitle);
        });

        it("5. Verify only 255 characters are allowed within the editable 'Project Name' (mandatory) textfield", function () {
                let index = 1;
                let projName = "Demoproject" + util.getRandomString(251);
                datascienceProjectsPage.clickCreateProject();
                datascienceProjectsPage.enterProjectName(projName, index);
                browser.sleep(3000)
                expect(datascienceProjectsPage.getProjectNameTextErrorMsg()).toEqual(messageStrings.projectNameError);
                browser.sleep(2000)
                datascienceProjectsPage.clickArrowForBackNavigation();
                datascienceProjectsPage.clickContinueForUnsavedChages();
        });

        it("6. Verify only 255 characters are allowed within the 'Customer name' (mandatory) textfield", function () {
                let index = 1;
                let custName = "Democustomer" + util.getRandomString(256);
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.enterCustomerName(custName, index);
                expect(datascienceProjectsPage.getCustomerNameTextErrorMsg(index)).toEqual(messageStrings.customerNameError);
                datascienceProjectsPage.clickArrowForBackNavigation();
                browser.sleep(1000)
                datascienceProjectsPage.clickContinueForUnsavedChages();
        });

        it("7. Verify clicking Trashcan icon displays confirmation pop-up window \"Confirm Delete Are you sure you want to delete this project?\", along with clickable CANCEL and DELETE buttons", function () {
                let index = util.getRandomNumber(1);
                datascienceProjectsPage.clickTrashcanToDeleteProject(index);
                // browser.sleep(5000);
                datascienceProjectsPage.clickDeleteButton();
        });

        it("8. Verify clicking CANCEL button closes the Project Deletion confirmation pop-up window", function () {
                let index = util.getRandomNumber(1);
                datascienceProjectsPage.clickTrashcanToDeleteProject(index);
                datascienceProjectsPage.clickCancelButton();
        });

        it("9. Verify making a change to any field for a project in ACTIVE status enables the SAVE button", function () {
                let index = 1;
                let status = "Active"
                let custName = "Democustomer" + util.getRandomString(4);
                let projectGoal = "Demogoal" + util.getRandomString(4);
                browser.sleep(5000);
                browser.executeScript('window.scrollTo(0,10000);');
                browser.sleep(5000);
                datascienceProjectsPage.selectProjectNameAsPerStatus(status);
                browser.sleep(4000);
                datascienceProjectsPage.enterCustomerName(custName, index);
              //  browser.sleep(4000)
                browser.actions().sendKeys(protractor.Key.TAB).perform();
               // datascienceProjectsPage.enterProjectGoal(projectGoal, index);
               // browser.sleep(4000)
                expect(datascienceProjectsPage.getSaveButtonStatus()).not.toEqual("true");
                browser.sleep(4000)
                datascienceProjectsPage.clickArrowForBackNavigation();
                datascienceProjectsPage.clickContinueForUnsavedChages();
        });

       it("10. Verify making a change to any field for a project in DRAFT status enables the SAVE button", function () {
                let index = 1;
                let status = "Draft"
                let custName = "Democustomer" + util.getRandomString(4);
                let projectGoal = "Demogoal" + util.getRandomString(4);
                browser.sleep(5000)
                datascienceProjectsPage.selectProjectNameAsPerStatus(status);
                browser.sleep(5000);
                datascienceProjectsPage.enterCustomerName(custName, index);
                datascienceProjectsPage.enterProjectGoal(projectGoal, index);
                browser.sleep(4000)
                expect(datascienceProjectsPage.getSaveButtonStatus()).not.toEqual("true");
                datascienceProjectsPage.clickArrowForBackNavigation();
                datascienceProjectsPage.clickContinueForUnsavedChages();
        });


        it("11. Verify clicking ‘x’ in textfield removes options and displays Project KPIs placeholder text", function () {
                let index = 1;
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.clickProjectKpis(index);
                browser.sleep(3000)
                datascienceProjectsPage.selectProjectKpisValue(util.getRandomNumber(1));
                datascienceProjectsPage.selectProjectKpisValue(util.getRandomNumber(1));
                datascienceProjectsPage.selectProjectKpisValue(util.getRandomNumber(1));
                datascienceProjectsPage.clickXToRemoveSelectedKpisValues();
                expect(datascienceProjectsPage.getProjectKpisDropdownPlaceholderText()).toEqual(messageStrings.projectKpisPlaceholderValue)

        });

        it("12. Verify clicking ADD/REMOVE COLLABORATORS button displays a pop-up window titled Add Collaborators to the Project, along with clickable 'x' to close pop-up and ADD COLLABORATORS button", function () {
                let num = 1;
                let randomNo = util.getRandomInteger(2,5);
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                datascienceProjectsPage.clickCollaborators();
                datascienceProjectsPage.clickAddOrRemoveCollaborators();
                datascienceProjectsPage.clickFilterByGroupDropdown();
                browser.sleep(3000)
                datascienceProjectsPage.selectFromGroupList(num);
                browser.executeScript('window.scrollTo(0,4000);');
                datascienceProjectsPage.clickAddButton(randomNo);
                browser.sleep(4000);
                datascienceProjectsPage.clickAddCollaborator();
                browser.sleep(7000);
        });

      
        it("13. Verify clicking trashcan icon on Collaborators List page to remove a selected user displays pop-up Confirm Delete Are you sure you want to delete this collaborator?, along with clickable CANCEL and DELETE buttons", function () {
                let randomNo = util.getRandomInteger(4, 5);
                browser.sleep(5000)
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                browser.sleep(4000);
                datascienceProjectsPage.clickCollaborators();
                browser.sleep(4000);
                datascienceProjectsPage.clickTrashcanIconToDeleteCollaborators();
                browser.sleep(5000)
                datascienceProjectsPage.clickDeleteBtnToConfirmDeleteCollaborators();
        });

        it("14. Verify clicking CANCEL buttton closes pop-up window and user stays on Collaborators List page", function () {
                let randomNo = util.getRandomInteger(4, 5);
                browser.sleep(5000)
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                browser.sleep(4000);
                datascienceProjectsPage.clickCollaborators();
                browser.sleep(4000);
                datascienceProjectsPage.clickTrashcanIconToDeleteCollaborators();
                browser.sleep(5000)
                datascienceProjectsPage.clickCancelBtnForConfirmDeleteCollaboratorsPopup();
        });

        it("15. Verify entering text into search field displays list of results that match showing first and last name along with email address and clickable ADD button, for each name", function () {
                let index = 1;
                let collaboratorName = "Erik Hencier";
                let num = 5;
                let randomNo = util.getRandomInteger(2, 5);
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                datascienceProjectsPage.clickCollaborators();
                datascienceProjectsPage.clickAddOrRemoveCollaborators();
                datascienceProjectsPage.clickFilterByGroupDropdown();
                datascienceProjectsPage.selectFromGroupList(num);
                browser.sleep(4000);
                datascienceProjectsPage.searchCollaboratorName(collaboratorName, index);
                datascienceProjectsPage.clickCloseButtonOnAddCollaboratorPopUp();
                datascienceProjectsPage.clickArrowForBackNavigation();

        });

        it("16. Verify de-selecting 'Select All' checkbox, changes user's toggle button from REMOVE to ADD (only for user's that were not previously existing on project)", function () {
                let num = 5;
                let randomNo = util.getRandomInteger(2, 5);
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                datascienceProjectsPage.clickCollaborators();
                datascienceProjectsPage.clickAddOrRemoveCollaborators();
                datascienceProjectsPage.clickFilterByGroupDropdown();
                browser.sleep(4000)
                datascienceProjectsPage.selectFromGroupList(num);
                browser.sleep(4000);
                datascienceProjectsPage.clickSelectAllCheckBox();
                browser.sleep(4000);
                datascienceProjectsPage.clickSelectAllCheckBox();
                datascienceProjectsPage.clickCloseButtonOnAddCollaboratorPopUp();
        });

        it("17. Verify clicking REMOVE button updates the button back to ADD",function(){
                let num = 1;
                let randomNo = util.getRandomInteger(2, 5);
                datascienceProjectsPage.clickOnProjectFromProjectListToEdit(randomNo);
                datascienceProjectsPage.clickCollaborators();
                datascienceProjectsPage.clickAddOrRemoveCollaborators();
                datascienceProjectsPage.clickFilterByGroupDropdown();
                browser.sleep(4000)
                datascienceProjectsPage.selectFromGroupList(num);
                browser.sleep(4000);
                browser.executeScript('window.scrollTo(0,2500);');
                datascienceProjectsPage.clickAddButton(randomNo);
                browser.sleep(4000);
                let btnText = datascienceProjectsPage.clickAddButton(randomNo);
                browser.sleep(4000);
                expect(btnText).toEqual("ADD")
                browser.sleep(4000);
                datascienceProjectsPage.clickCloseButtonOnAddCollaboratorPopUp();
        });

        it(" 18. Verify clicking Cancel button closes pop-up and displays create new project page", function () {
                let index = 1;
                let projectName = "ppDemoproject" + util.getRandomString(4);
                let customerName = "Democustomer" + util.getRandomString(4);
                datascienceProjectsPage.clickCreateProject();
                browser.sleep(5000);
                datascienceProjectsPage.enterProjectName(projectName, index);
                datascienceProjectsPage.enterCustomerName(customerName, index);
                datascienceProjectsPage.clickArrowForBackNavigation();
                browser.sleep(4000);
                datascienceProjectsPage.clickCancelForUnsavedChages();
        });
});