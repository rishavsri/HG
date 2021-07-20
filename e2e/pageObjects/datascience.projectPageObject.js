"use strict"
const { element, browser } = require('protractor');
var extend = require('extend');
var url = browser.params.url;
var appUrls = require('../../testData/appUrls.json');
var logGenerator = require("../../helpers/logGenerator.js"),
    logger = logGenerator.getApplicationLogger();
var timeout = require('../../testData/timeout.json');
var EC = protractor.ExpectedConditions;
var util = require('../../helpers/util.js');


var defaultConfig = {

    pageUrl: url + appUrls.homePageUrl,
    dataScience: 'accordion-button-2',
    projectsTab: '//a[@href="/projects"]/div',
    projectListXpath: '//tbody//tr',
    allProjectNameOnProjectSummaryPage: '//table//tbody//tr//td[1]',
    statusOfProject: '//table//tbody//tr//td[3]',
    EditProjectRecordXpath: '//table[@role="table"]//tbody/tr[',
    trashcanIconToDeleteProject: '//table[@role="table"]//tbody/tr[',

    //*******************Locators for "Create Project" ********************************
    createProject: '//a[@href="/projects/create"]',
    projectName: '//input[@placeholder="Project Name"]',
    customerName: '//input[@name="clientName"]',
    projectGoal: '//textarea[@name="projectGoal"]',
    projectKpis: '//div[@class="rmsc css-0"]/div[1]',
    projectKpisValue: '//div[contains(text(),"',
    clearSelectedKpis: '//button[@aria-label="Clear Selected"]//*[local-name()="svg"]',
    projectKpisPlaceholderXpath: '//div[@class="dropdown-container"]/div[@class="dropdown-heading"]/div/span[1]',
    getProjectKpisList: '//*[@class="css-1hu0qob"]',
    businessComponent: '//*[@name="businessComponent"]',
    businessProcess: '//*[@name="businessProcess"]',
    businessFunction: '//*[@name="businessFunction"]',
    saveProjectDetails: '//button[normalize-space()="Save"]',
    SaveAndActivateButtonXpath: '//button[normalize-space()="Save & Activate"]',
    projectNameErrorTextXpath : '//div[contains(text(),"A project name with no more")]',
    //********************* Locators for Delete Project Confirmation PopUp**********************
    confirmDeleteProject: '//button[normalize-space()="Delete"]',
    cancelBtnXpathForProjectDeleteOperation: '//button[normalize-space()="Cancel"]',

    //******************* Locators for Unsaved Changes popup window ****************************
    arrowForBackNavigation: '//button[@class="chakra-button css-14nzubv"]',
    continueButtonXpath: '//button[normalize-space()="Continue"]',
    cancelButtonXpath: '//button[normalize-space()="Cancel"]',
    unsavedChangesTitleXpath: '//header[normalize-space()="Unsaved changes"]',

    //******************* Locators for Update project section *****************************   
    projectUpdatedToastMessage: '//li[@class="chakra-toast"]//div[@class="chakra-alert__title css-1fhgib7"]',
    projectNamewithStatusXpath: '//table//tbody//tr[',

    //******************** Locators for Collaborator Tab*******************************************
    collaboratorsButtonXpath: '//button[normalize-space()="Collaborators"]',
    addRemoveCollaboratorsButtonXpath: '//button[normalize-space()="Add/Remove Collaborators"]',
    trashcanToDeleteCollaboratorsXpath: '//table[@role="table"]//tbody//tr[',
    collaboratorsList: '//table[@role="table"]//tbody//tr//td[1]',
    confirmDeleteButtonForCollaboratorsXpath: '//section[@role="dialog"]//footer/button[contains(text(),"Delete")]',
    cancelBtnForCollaboratorsDeletionProcess: '//section[@role="dialog"]/footer[@class="chakra-modal__footer css-d239oe"]/button[1]',

    //********************Locators For Add Collaborators To Project window*****************
    collaboratorsGroupDropdown: '//div[@role="group"]/div/select[1]',
    collaboratorsGroupList: '//select[@name="group"]//option',
    addCollaboratorsButtonXpath: '//button[normalize-space()="Add Collaborators"]',
    searchCollaboratorsTextfieldXpath: '//input[@name="search"]',
    closeAddCollaboratorsWindowXpath: '//button[@aria-label="Close"]//*[local-name()="svg"]',
    addcollaboratorsFromCollaboratorsGroup: '//form[@class="chakra-stack css-1z0ruq5"]/div[4]/div[',
    selectAllCheckBoxXpath: '//span[@class="chakra-checkbox__control css-lqxafn"]',
    loggedInUserNameXpath: '//div[@class="css-19zotg7"]//button[@id="menu-button-11"]',
    //******************* Locators for Logout Dropdown options ****************************
    logout: '//button[@id="menu-button-11"]',
    btnPrivacyAndTerms: '//*[@id="menuitem-5"]/button[contains(text(), "Privacy & Terms")]',
    btnSupport: '//*[@id="menuitem-8"]/button[contains(text(), "Support")]',
    btnLogout: '//*[@id="menuitem-9"]/button[contains(text(), "Log out")]',

    //*************** Locators use to get text ***********************************
    getProjectsSummaryPageTitleXpath: '//div[@class="css-x6bmus"]/h2[contains(text(),Projects)]',


    //*************** Locators use to get text ***********************************
    getProjectsSummaryPageTitleXpath: '//div[@class="css-x6bmus"]/h2[contains(text(),Projects)]',
};

function dataScience(selectorConfig) {
    if (!(this instanceof dataScience)) {
        return new dataScience(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

//*************BEGIN******** Functions for Clicking On Tab links *********BEGIN***********

dataScience.prototype.clickDatascience = function () {
    return element(by.id(this.dataScience)).click().then(function () {
        logger.info("clicked on Data Science...");
    });
};

dataScience.prototype.clickProjects = function () {
    return element(by.xpath(this.projectsTab)).click().then(function () {
        logger.info("clicked on Projects...");
    });
};

dataScience.prototype.clickLogOutUser = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.logout))), 10000).then(function () {
        logger.info("Waiting for dropdown for Logout to be clickable...");
    }).catch(function (err) {
        logger.info("dropdown for Logout is not clickable...");
    });

    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnLogout))), 10000).then(function () {
        logger.info("Waiting for Logout button to be clickable...");
    }).catch(function (err) {
        logger.info("Logout button is not clickable...");
    });

    return element(by.xpath(this.btnLogout)).click().then(function () {
        logger.info("User Logged out Successfully...");
    });
};

//*******END********** Functions for Clicking Tab links ***********END************

//************************* CREATE PROJECT SECTION *****************************************
//********BEGIN******Functions use to Enter value in textbox *******BEGIN*******************

dataScience.prototype.resetProjectName = function (projectName) {
    var elem_project_name = element(by.xpath(this.projectName));
    browser.wait(EC.elementToBeClickable(elem_project_name), 40000);
    return elem_project_name.sendKeys(projectName).then(function () {
        logger.info("Project Name has Set to : " + ProjectName);
    });
};

dataScience.prototype.enterProjectName = function (projectName, index) {
    let projectNameObj = this.projectName + "\[" + index + "\]";
    return element(by.xpath(projectNameObj)).sendKeys(projectName).then(function () {
        logger.info("Entered project Name Value of index " + index + " is :- " + projectName);
    });
};

dataScience.prototype.enterCustomerName = function (customerName, index) {
    let customerNameObj = this.customerName + "\[" + index + "\]";
    return element(by.xpath(customerNameObj)).sendKeys(customerName).then(function () {
        logger.info("Entered Customer Name Value of index " + index + " is :- " + customerName);
    });
};

dataScience.prototype.enterProjectGoal = function (projectGoal, index) {
    let projectGoalObj = this.projectGoal + "\[" + index + "\]";
    return element(by.xpath(projectGoalObj)).sendKeys(projectGoal).then(function () {
        logger.info("Entered project Goal Value of index " + index + " is :- " + projectGoal);
    });
};

dataScience.prototype.enterBusinessComponent = function (businessComponent, index) {
    let businessComponentObj = this.businessComponent + "\[" + index + "\]";
    return element(by.xpath(businessComponentObj)).sendKeys(businessComponent).then(function () {
        logger.info("Entered Business Component Value of index " + index + " is :- " + businessComponent);
    });
};

dataScience.prototype.enterBusinessProcess = function (businessProcess, index) {
    let businessProcessObj = this.businessProcess + "\[" + index + "\]";
    return element(by.xpath(businessProcessObj)).sendKeys(businessProcess).then(function () {
        logger.info("Entered Business Process of index " + index + " is :- " + businessProcess);
    });
};

dataScience.prototype.enterBusinessFunction = function (businessFunction, index) {
    let businessFunctionObj = this.businessFunction + "\[" + index + "\]";
    return element(by.xpath(businessFunctionObj)).sendKeys(businessFunction).then(function () {
        logger.info("Entered Business Function of index " + index + " is :- " + businessFunction);
    });
};
//***********End ************* Functions use to Enter value in textbox ********End*****************************


//*************BEGIN************** Functions use to Click button ****************BEGIN*****************

dataScience.prototype.clickCreateProject = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.createProject))), 5000).then(function () {
        logger.info("Waiting for create project Button to be clickable...");
    }).catch(function (err) {
        logger.info("Create Project Button is not clickable...");
    });
    return element(by.xpath(this.createProject)).click().then(function () {
        logger.info("clicked on Create Project Button...");
    });
};

dataScience.prototype.clickSaveProjectDetails = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.saveProjectDetails))), 5000).then(function () {
        logger.info("Waiting for Save Button to be clickable...");
    }).catch(function (err) {
        logger.info("Save Button is not clickable...");
    });
    return element(by.xpath(this.saveProjectDetails)).click().then(function () {
        logger.info("clicked on Save Button...");
    });
};

dataScience.prototype.clickSaveAndActivateProject = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.SaveAndActivateButtonXpath))), 5000).then(function () {
        logger.info("Waiting for SaveAndActivate Button to be clickable...");
    }).catch(function (err) {
        logger.info("SaveAndActivate Button is not clickable...");
    });
    return element(by.xpath(this.SaveAndActivateButtonXpath)).click().then(function () {
        logger.info("clicked on SaveAndActivate Button...");
    });
};


dataScience.prototype.clickArrowForBackNavigation = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.arrowForBackNavigation))), 5000).then(function () {
        logger.info("Waiting for Back Navigation to be clickable...");
    }).catch(function (err) {
        logger.info("Back Navigation button is not clickable...");
    });
    return element(by.xpath(this.arrowForBackNavigation)).click().then(function () {
        logger.info("clicked on Back Navigation button...");
    });
};

dataScience.prototype.clickXToRemoveSelectedKpisValues = function (index) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.clearSelectedKpis))), 5000).then(function () {
        logger.info("Waiting for 'X' to be clickable...");
    }).catch(function (err) {
        logger.info("'X' button for Project Kpis selected values is not clickable...");
    });
    return element(by.xpath(this.clearSelectedKpis)).click().then(function () {
        logger.info("clicked on 'X' Button");
    });
};

dataScience.prototype.clickProjectKpis = function (index) {
    let projectKpiObj = this.projectKpis + "\[" + index + "\]";
    browser.wait(EC.elementToBeClickable(element(by.xpath(projectKpiObj))), 5000).then(function () {
        logger.info("Waiting for Select project KPIs" + index + " to be clickable...");
    }).catch(function (err) {
        logger.info("Project KPIs" + index + " is not clickable...");
    });
    return element(by.xpath(this.projectKpis)).click().then(function () {
        logger.info("clicked on project KPIs " + index + "...");
    });
};

dataScience.prototype.selectProjectKpisValue = function (index) {
    let projectKpisValueObj = this.projectKpisValue
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.projectKpisValue))), 10000).then(function () {
        logger.info("Waiting for Select Project KPis Value as to be select...");
    }).catch(function (err) {
        logger.info("Value is not Selectable...");
    });
    return element.all(by.xpath(this.getProjectKpisList)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i <= arr.length; i++) {
                let kpiValueObj = projectKpisValueObj + arr[i] + "\")]";
                return element(by.xpath(kpiValueObj)).click().then(function () {
                    logger.info("Project KPIs as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 1; i <= arr.length; i++) {
                let kpiValueObj = projectKpisValueObj + arr[i] + "\")]";
                return element(by.xpath(kpiValueObj)).click().then(function () {
                    logger.info("Project KPIs as " + arr[i] + " is Selected...");
                });
            }
        }

    });
};

dataScience.prototype.clickTrashcanToDeleteProject = function (index) {
    let deleteProjectDetailsXpathObj = this.trashcanIconToDeleteProject
    browser.wait(EC.visibilityOf(element(by.xpath(this.allProjectNameOnProjectSummaryPage))), 50000).then(function () {
        logger.info("All Projects are visible.");
    }).catch(function (err) {
        logger.info("Error: projects are not visible..");
    });
    return element.all(by.xpath(this.allProjectNameOnProjectSummaryPage)).count().then(function (count) {
        if (count > 0) {
            if (index <= count) {
                for (var i = index; i <= count; i++) {
                    let deleteProjectXpathObj = deleteProjectDetailsXpathObj + index + "]/td[5]/button[1]";
                    browser.wait(EC.visibilityOf(element(by.xpath(deleteProjectXpathObj))), 5000).then(function () {
                        logger.info("Waiting for Trashcan to be visible.");
                    }).catch(function (err) {
                        logger.info("Error: Trashcan is not visible..");
                    });
                    return element(by.xpath(deleteProjectXpathObj)).click().then(function () {
                        logger.info("clicked on Trashcan to delete project");
                    });
                }
            }
            else {
                for (let i = 1; i <= count; i++) {
                    let deleteProjectXpathObj = deleteProjectDetailsXpathObj + i + "]/td[5]/button[1]";
                    browser.wait(EC.visibilityOf(element(by.xpath(deleteProjectXpathObj))), 5000).then(function () {
                        logger.info("Waiting for Trashcan to be visible.");
                    }).catch(function (err) {
                        logger.info("Error: Trashcan is not visible..");
                    });
                    return element(by.xpath(deleteProjectXpathObj)).click().then(function () {
                        logger.info("clicked on Trashcan to delete project");
                    });
                }
            }
        }
        else {
            logger.info("No projects available.." + count);
        }
    });
};
//*************END************** Functions use to Click button ****************END***************************

//****************************** CONFIRM DELETE PROJECT SECTION ***************************************************
//*************BEGIN************ Functions use to click Button ****************BEGIN***************************
dataScience.prototype.clickDeleteButton = function (index) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.confirmDeleteProject))), 5000).then(function () {
        logger.info("Waiting for Delete Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Button is not clickable...");
    });
    return element(by.xpath(this.confirmDeleteProject)).click().then(function () {
        logger.info("clicked on Delete Button...");
    });
};

dataScience.prototype.clickCancelButton = function (index) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.cancelBtnXpathForProjectDeleteOperation))), 5000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.cancelBtnXpathForProjectDeleteOperation)).click().then(function () {
        logger.info("clicked on Cancel Button...");
    });
};
//*************END************ Functions use to click Button ****************END***************************

//******************************* UPDATE PROJECT SECTION *******************************************************
//*************BEGIN************** Functions use to Click button ****************BEGIN*************************
dataScience.prototype.clickOnProjectFromProjectListToEdit = function (index) {
    let editProjectXpathObj = this.EditProjectRecordXpath + index + "]/td[1]";
    browser.wait(EC.elementToBeClickable(element(by.xpath(editProjectXpathObj))), 5000).then(function () {
        logger.info("Waiting for Project details to be clickable...");
    }).catch(function (err) {
        logger.info("Project details is not clickable...");
    });
    return element(by.xpath(editProjectXpathObj)).click().then(function () {
        logger.info("clicked on project details...");
    });
};
//*************END************** Functions use to Click button ****************END*****************************

//***************BEGIN************ Functions use to get Text from Confirmation toast **************BEGIN******************
dataScience.prototype.getProjectUpdatedConfirmationToastText = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.projectUpdatedToastMessage))), 20000).then(function () {
        logger.info("Waiting for Project Updation Confirmation Toast Message to be Visible...");
    }).catch(function (err) {
        logger.info("Project Updation Confirmation Toast Message is not Visible...");
    });
    return element(by.xpath(this.projectUpdatedToastMessage)).getText().then(function (text) {
        logger.info("Project Updation Confirmation Toast Message is Visible");
        return text;
    });
};
//***********END*****************Functions use to get Text from Confirmation toast*******************END**********************************************************

//************************** COLLABORATORS SECTION UNDER UPDATE PROJECT *******************************************************************
//************************** Functions use to Search Collaborators **************************************************************
dataScience.prototype.searchCollaboratorName = function (name, index) {
    let searchCollaboratorsObj = this.searchCollaboratorsTextfieldXpath + "\[" + index + "\]";
    return element(by.xpath(searchCollaboratorsObj)).sendKeys(name).then(function () {
        logger.info("Entered project Goal Value of index " + index + " is :- " + name);
    });
};

//***********BEGIN********Functions Use to click Button ***********************BEGIN*************************************
dataScience.prototype.clickAddOrRemoveCollaborators = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addRemoveCollaboratorsButtonXpath))), 160000).then(function () {
        logger.info("Waiting for AddOrRemoveCollaborators Button to be clickable...");
    }).catch(function (err) {
        logger.info("AddOrRemoveCollaborators Button is not clickable...");
    });
    return element(by.xpath(this.addRemoveCollaboratorsButtonXpath)).click().then(function () {
        logger.info("clicked on AddOrRemoveCollaborators Button...");
    });
};

dataScience.prototype.clickCollaborators = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.collaboratorsButtonXpath))), 5000).then(function () {
        logger.info("Waiting for Collaborators Button to be clickable...");
    }).catch(function (err) {
        logger.info("Collaborators Button is not clickable...");
    });
    return element(by.xpath(this.collaboratorsButtonXpath)).click().then(function () {
        logger.info("clicked on Collaborators Button...");
    });
};

dataScience.prototype.clickAddButton = function (num) {
   let addCollaboratorFromGroupObj = this.addcollaboratorsFromCollaboratorsGroup+num+"]/button[1]";
    browser.wait(EC.elementToBeClickable(element(by.xpath(addCollaboratorFromGroupObj))), 10000).then(function () {
        logger.info("Waiting for add Button to be clickable...");
    }).catch(function (err) {
        logger.info("add Button is not clickable...");
    });
    return element(by.xpath(addCollaboratorFromGroupObj)).click().getText().then(function (buttonText) {
        logger.info("clicked on add Button...");
        logger.info("Button Text #####: " + buttonText)
        return buttonText;
    });
};

dataScience.prototype.clickAddCollaborator = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addCollaboratorsButtonXpath))), 5000).then(function () {
        logger.info("Waiting for Add Collaborators Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add Collaborators Button is not clickable...");
    });
    return element(by.xpath(this.addCollaboratorsButtonXpath)).click().then(function () {
        logger.info("clicked on Add Collaborators Button..."); 
    });
};

dataScience.prototype.clickTrashcanIconToDeleteCollaborators = function () {
    let trashcanXpathObj = this.trashcanToDeleteCollaboratorsXpath;
    let collaboratorsListobj = this.collaboratorsList;
    browser.wait(EC.visibilityOf(element(by.xpath(this.collaboratorsList))), 50000).then(function () {
        logger.info("Waiting for ..");
    }).catch(function (err) {
        logger.info("collaborator list is not visible");
    });
    return this.getLoggedInUserName().then(function (loggedInUser) {
        return element.all(by.xpath(collaboratorsListobj)).getText().then(function (userNameArray) {
            if (userNameArray.length != 1) {
                for (let i = 1; i < userNameArray.length; i++) {
                    if (userNameArray[i] != loggedInUser) {
                        return element(by.xpath(trashcanXpathObj + (i + 1) + "]/td[5]/button[1]")).click().then(function () {
                            logger.info("Clicked on Trashcan icon for collaborators");
                        })
                    }
                }
            }
            else {
                logger.error("You Cannot delete LoggedIn User...");
            }
        });
    });
};

dataScience.prototype.clickDeleteBtnToConfirmDeleteCollaborators = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.confirmDeleteButtonForCollaboratorsXpath))), 5000).then(function () {
        logger.info("Waiting for Delete Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Button is not clickable...");
    });
    return element(by.xpath(this.confirmDeleteButtonForCollaboratorsXpath)).click().then(function () {
        logger.info("clicked on Delete Button...");
    });
};

dataScience.prototype.clickCancelBtnForConfirmDeleteCollaboratorsPopup = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.cancelBtnForCollaboratorsDeletionProcess))), 5000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.cancelBtnForCollaboratorsDeletionProcess)).click().then(function () {
        logger.info("clicked on Cancel Button...");
    });
};


dataScience.prototype.clickSelectAllCheckBox = function () {
    browser.wait(EC.elementToBeSelected(element(by.xpath(this.selectAllCheckBoxXpath))), 5000).then(function () {
        logger.info("Waiting for SelectAll checkbox to be Selectable...");
    }).catch(function (err) {
        logger.info("SelectAll checkbox is not Selectable...");
    });
    return element(by.xpath(this.selectAllCheckBoxXpath)).click().then(function () {
        logger.info("SelectAll checkbox is in Checked Status...");
    });
};



dataScience.prototype.clickCloseButtonOnAddCollaboratorPopUp = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.closeAddCollaboratorsWindowXpath))), 5000).then(function () {
        logger.info("Waiting for CloseButton to be clickable...");
    }).catch(function (err) {
        logger.info(" CloseButton is not clickable...");
    });
    return element(by.xpath(this.closeAddCollaboratorsWindowXpath)).click().then(function () {
        logger.info(" clicked on CloseButton...");
    });
};
//**************END*******Functions Use to click Button ***********************END*************************************

//*************BEGIN******Functions Use to Select dropdown values *************BEGIN***********************************************
dataScience.prototype.clickFilterByGroupDropdown = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.collaboratorsGroupDropdown)))).then(function () {
        logger.info("Waiting for FilterByGroup dropdown to be clickable...");
    }).catch(function (err) {
        logger.info("FilterByGroup is not clickable...");
    });
    return element(by.xpath(this.collaboratorsGroupDropdown)).click().then(function () {
        logger.info("clicked on FilterByGroup dropdown...");
    });
};

dataScience.prototype.selectFromGroupList = function (index) {
    var collaboratorsGroupXpathForSelectingValue = this.collaboratorsGroupDropdown + "//option[text()=\"";
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.collaboratorsGroupList))), 5000).then(function () {
        logger.info("Waiting for Group as to be select...");
    }).catch(function (err) {
        logger.info("Group is not selectable...");
    });
    return element.all(by.xpath(this.collaboratorsGroupList)).getText().then(function (arr) {
        if (index <= arr.length) {
            for (var i = index; i < arr.length; i++) {
                let collaboratorsGroupObj = collaboratorsGroupXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(collaboratorsGroupObj)).click().then(function () {
                    logger.info("Group as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 1; i < arr.length; i++) {
                let collaboratorsGroupObj = collaboratorsGroupXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(collaboratorsGroupObj)).click().then(function () {
                    logger.info("Group as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};
//***************END*********Functions Use to Select dropdown values ********************END****************************************

//****************************** Unsaved Changes pop window Section **********************************************
//*************BEGIN************** Functions use to Click button ****************BEGIN**************************
dataScience.prototype.clickContinueForUnsavedChages = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.continueButtonXpath))), 5000).then(function () {
        logger.info("Waiting for Continue Button to be clickable...");
    }).catch(function (err) {
        logger.info("continue Button is not clickable...");
    });
    return element(by.xpath(this.continueButtonXpath)).click().then(function () {
        logger.info("clicked on Continue Button...");
    });
};

dataScience.prototype.clickCancelForUnsavedChages = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.cancelButtonXpath))), 5000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("cancel Button is not clickable...");
    });
    return element(by.xpath(this.cancelButtonXpath)).click().then(function () {
        logger.info("clicked on Cancel Button...");
    });
};
//*************END************** Functions use to click Button ****************END***************************

//***************BEGIN***************** Functions For Negative Testing ********************BEGIN****************
dataScience.prototype.getProjectNameTextErrorMsg = function () {
        var xpathForProjectNameErr = this.projectNameErrorTextXpath;
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForProjectNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for Project Name")
        }).catch(function (err) {
            logger.info("Error message for Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForProjectNameErr)).getText().then(function (error) {
            logger.info("Error message for Project Name displayed successfully");
            return error;
        });
};

dataScience.prototype.getCustomerNameTextErrorMsg = function (index) {
    return this.idCustomerNameElementLocator(index).then(function (idlocate) {
        var xpathForCustomerNameErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForCustomerNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for customer Name")
        }).catch(function (err) {
            logger.info("Error message for customer Name field is not displayed after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForCustomerNameErr)).getText().then(function (error) {
            logger.info("Error message for customer Name displayed successfully");
            return error;
        });
    });
};

dataScience.prototype.idCustomerNameElementLocator = function (index) {
    let customerNameObj = this.customerName + "\[" + index + "\]";
    return element(by.xpath(customerNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};
//***************END*********** Functions For Negative Testing *************END****************

//********************************Functions use to Get Text ****************************************************
dataScience.prototype.getProjectSummaryPageTitle = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.getProjectsSummaryPageTitle)), 'Projects'), 5000).then(function () {
        logger.info("project Summary Page Title is present..")
    }).catch(function () {
        logger.info("Project Summary Page Title is not Present..")
    });
    return element(by.xpath(this.getProjectsSummaryPageTitleXpath)).getText().then(function (title) {
        logger.info("Project Summary Page Title is fetched successfully.." + title + "###############")
        return title;
    })
};

dataScience.prototype.getProjectKpisDropdownPlaceholderText = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.projectKpisPlaceholderXpath)), 'Project KPIs'), 5000).then(function () {
        logger.info("project Kpis placeholder value is present..")
    }).catch(function () {
        logger.info("project Kpis placeholder value is not present..")
    });
    return element(by.xpath(this.projectKpisPlaceholderXpath)).getText().then(function (placeholderValue) {
        logger.info("Project Kpis Placeholder value has been Received..####### " + placeholderValue + " ########")
        return placeholderValue;
    })
};

//****************** Function uses to count Total Projects In List *****************************************
dataScience.prototype.getTotalProjectCount = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.projectListXpath))), 5000).then(function () {
        logger.info("project Summary List is Visible..")
    }).catch(function () {
        logger.info("project Summary List is Not Visible..")
    });
    return element.all(by.xpath(this.projectListXpath)).count().then(function (count) {
        logger.info("project count is " + count)
        return count;
    });
};

//************************Functions use to get Arrays **************************************
dataScience.prototype.getAllRecordsOfProjectSummaryListPage = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.allProjectNameOnProjectSummaryPage))), 5000).then(function () {
        logger.info("Waiting for Project list as to be visible.");
    }).catch(function (err) {
        logger.info("Project list is not visible..");
    });
    return element.all(by.xpath(this.allProjectNameOnProjectSummaryPage)).getText().then(function (projectNameArray) {
        logger.info("Project summary page ProjectName column all values  : " + projectNameArray)
        return projectNameArray;
    });
};

//************************** Functions use to Check Status(Active/Draft) of Added Project******************************************
dataScience.prototype.selectProjectNameAsPerStatus = function (matchStatus) {
    let projectWithStatusXpathObj = this.projectNamewithStatusXpath
    browser.wait(EC.visibilityOf(element(by.xpath(this.statusOfProject))), 10000).then(function () {
        logger.info("Waiting for project List as to be visible")
    }).catch(function (err) {
        logger.info("Project List Is Not Visible.")
    });
    return element.all(by.xpath(this.statusOfProject)).getText().then(function (projectStatusArray) {
        logger.info("STATUS:## "+projectStatusArray)
        for (let i = 0; i < projectStatusArray.length; i++) {
            if (projectStatusArray[i] == matchStatus) {
                logger.info("Status Matched...!!!")
                let projectWithStatusObj = projectWithStatusXpathObj + (i + 1) + "]/td[1]"
                return element(by.xpath(projectWithStatusObj)).click().getText().then(function (projectName) {
                    logger.info("Clicked on Project Name with Status### "+matchStatus+" And project name is : ###### " + projectName)
                });
            };
        };
    });
};

dataScience.prototype.getStatusOfProject = function (matchName) {
    let projectStatusXpathObj = this.statusOfProject;
    browser.wait(EC.visibilityOf(element(by.xpath(this.allProjectNameOnProjectSummaryPage))), 5000).then(function () {
        logger.info("Waiting for project status as to be visible")
    }).catch(function (err) {
        logger.info("Project Status Is Not Visible.")
    });
    return element.all(by.xpath(this.allProjectNameOnProjectSummaryPage)).getText().then(function (projectNameArray) {
        for (let i = 0; i < projectNameArray.length; i++) {
            if (projectNameArray[i] == matchName) {
                return element(by.xpath(projectStatusXpathObj)).getText().then(function (txt) {
                    logger.info("Status of project is: ###### " + txt)
                    return txt;
                });
            };
        };
    });
};

dataScience.prototype.getSaveButtonStatus = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.saveProjectDetails))), 5000).then(function () {
        logger.info("Waiting for Save Button as to be visible");
    }).catch(function (err) {
        logger.info("Save Button Is Not Visible.");
    });
    return element(by.xpath(this.saveProjectDetails)).getAttribute("disabled").then(function (buttonStatus) {
        logger.info("Got the value of Save button"+buttonStatus);
        return buttonStatus;
    });
};

//************************ Functions use to get Text **************************************************
dataScience.prototype.getLoggedInUserName = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.loggedInUserNameXpath))), 5000).then(function () {
        logger.info("Waiting for LoggedIn User Name as to be visible.");
    }).catch(function (err) {
        logger.info("LoggedIn User Name is not visible..");
    });
    return element(by.xpath(this.loggedInUserNameXpath)).getText().then(function (txt) {
        logger.info("LoggedIn User Name fetched : " + txt)
        return txt;
    });
};

module.exports = dataScience;