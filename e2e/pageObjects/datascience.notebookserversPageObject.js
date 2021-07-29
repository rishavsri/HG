/* 
PageObject Name : datascience.notebookserverPageObject.js
Decription : This PageObject will cover functions for notebook server tab.
Author : Zalak Mistry
*/


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
    notebookserverTab:'//a[@href="/notebooks"]/div',
    notebookServerListXpath: '//tbody//tr',
   
//===============================Locators for Delete Server=================================
 
deleteServer:'//button[@type="button" and @class="chakra-button css-15i3zxu"]',


btnCancel:'//button[contains(text(),"Cancel")]',
btnDelete : '//button[text()="Terminate"]',


//===============================Locators for Create Server=================================
createServer: '//button[@type="button" and @class="chakra-button css-17licj3"] ',
launchBtn:'//button[@type="button" and @class="chakra-button css-1fq756u"]',
cancelbtn:'//button[@type="button" and @class="chakra-button css-ipdisk"]',
serverName:'//input[//@id="name"]',
serverErr:'//*[@id="name-feedback"]',
cpuValue:'//input[@id="cpu"]',
//'//input[//@id="cpu" and @name="cpu"]',
memoryValue:'//input[//@id="memory" and @name="memory"]',
//=========================================
getNotebookServerSummeryPageTitle: '//div[@class="css-x6bmus"]/h2[contains(text(),Notebook)]',
getServerNameCol:'',

getNameDescriptionxpath:'//*[text()="Specify the name of the notebook server and the project it will belong to."]',
getImageDescriptionxpath:'//*[text()="A starter Jupyter docker image with a baseline deployment and typical ML packages"]',
ServerName = "//div[text()='Server Name']",
ProjectName = "//div[text()='Project Name']",
Customer = "//div[text()='Customer']",
Status = "//div[text()='Status']",
DateCreated = "//div[text()='Date Created']",

UpArrow = "//div[normalize-space()='Server Name']//div[@class='css-1cnxdvx']",
DownArrow = "//div[normalize-space()='Server Name']//div[@class='css-1cnxdvx']//*[local-name()='svg']",

jupyter = "//a[text()='Jupyter']",
jupyterLab = "//a[text()='Jupyter Lab']",
deleteTestServer = "//button[@aria-label='Delete notebook server Test server AFVH']",

status = "//p[text()='Online']",

notebookServerText = "//div[@class='css-20lp4v']",
notebookName = "//p[text()='Name']",
notebookImage = "//p[text()='Image']",
notebookCpu = "//p[text()='CPU / RAM']",
notebookGPU = "GPUs"
};


function datascience_notebookserver(selectorConfig) {
    if (!(this instanceof datascience_notebookserver)) {
        return new datascience_notebookserver(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

//*************BEGIN******** Functions for Clicking On Tab links *********BEGIN***********

datascience_notebookserver.prototype.clickDatascience = function () {
    return element(by.id(this.dataScience)).click().then(function () {
        logger.info("clicked on Data Science...");
    });
};

datascience_notebookserver.prototype.clickJupyter = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.jupyter))), 160000).then(function () {
        logger.info("Waiting for jupyter to be clickable...");
    }).catch(function (err) {
        logger.info("Jupyter is not clickable...");
    });
    return element(by.xpath(this.jupyter)).click().then(function () {
        logger.info("clicked on jupyter......");
    });
};

datascience_notebookserver.prototype.clickJupyterLab = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.jupyterLab))), 160000).then(function () {
        logger.info("Waiting for jupyterLab to be clickable...");
    }).catch(function (err) {
        logger.info("Jupyter Lab is not clickable...");
    });
    return element(by.xpath(this.jupyterLab)).click().then(function () {
        logger.info("clicked on jupyter Lab......");
    });
};

datascience_notebookserver.prototype.clickTrashCan = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.deleteTestServer))), 160000).then(function () {
        logger.info("Waiting for TrashCan to be clickable...");
    }).catch(function (err) {
        logger.info("Trash Can is not clickable...");
    });
    return element(by.xpath(this.deleteTestServer)).click().then(function () {
        logger.info("clicked on Trash Can......");
    });
};


datascience_notebookserver.prototype.clickServerName = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.serverName))), 160000).then(function () {
        logger.info("Waiting for ServerName to be clickable...");
    }).catch(function (err) {
        logger.info("Server Name is not clickable...");
    });
    return element(by.xpath(this.serverName)).click().then(function () {
        logger.info("clicked on Server Name......");
    });
};

datascience_notebookserver.prototype.upArrow = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.UpArrow))), 160000).then(function () {
        logger.info("Waiting for UpArrow to be clickable...");
    }).catch(function (err) {
        logger.info("Up Arrow is not clickable...");
    });
    return element(by.xpath(this.UpArrow)).click().then(function () {
        logger.info("clicked on Up Arrow......");
    });
};

datascience_notebookserver.prototype.downArrow = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.DownArrow))), 160000).then(function () {
        logger.info("Waiting for DownArrow to be clickable...");
    }).catch(function (err) {
        logger.info("Down Arrow is not clickable...");
    });
    return element(by.xpath(this.DownArrow)).click().then(function () {
        logger.info("clicked on Down Arrow......");
    });
};
datascience_notebookserver.prototype.clickProjectName = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.ProjectName))), 160000).then(function () {
        logger.info("Waiting for ProjectName to be clickable...");
    }).catch(function (err) {
        logger.info("Project Name is not clickable...");
    });
    return element(by.xpath(this.ProjectName)).click().then(function () {
        logger.info("clicked on Project Name......");
    });
};

datascience_notebookserver.prototype.clickCustomer = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.Customer))), 160000).then(function () {
        logger.info("Waiting for Customer to be clickable...");
    }).catch(function (err) {
        logger.info("Customer is not clickable...");
    });
    return element(by.xpath(this.Customer)).click().then(function () {
        logger.info("clicked on Customer......");
    });
};

datascience_notebookserver.prototype.clickStatus = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.Status))), 160000).then(function () {
        logger.info("Waiting for Status to be clickable...");
    }).catch(function (err) {
        logger.info("Status is not clickable...");
    });
    return element(by.xpath(this.Status)).click().then(function () {
        logger.info("clicked on Status......");
    });
};

datascience_notebookserver.prototype.clickDateCreated = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.DateCreated))), 160000).then(function () {
        logger.info("Waiting for DateCreated to be clickable...");
    }).catch(function (err) {
        logger.info("DateCreated is not clickable...");
    });
    return element(by.xpath(this.DateCreated)).click().then(function () {
        logger.info("clicked on DateCreated......");
    });
};



datascience_notebookserver.prototype.clickNotebookServer = function () {
        
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.notebookserverTab))), 160000).then(function () {
        logger.info("Waiting for notebook server to be clickable...");
    }).catch(function (err) {
        logger.info("notebook server is not clickable...");
    });
    return element(by.xpath(this.notebookserverTab)).click().then(function () {
        logger.info("clicked on notebook server......");
    });
};

datascience_notebookserver.prototype.clickCreateServer = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.createServer))), 160000).then(function () {
        logger.info("Waiting for create server Button to be clickable...");
    }).catch(function (err) {
        logger.info("Create server Button is not clickable...");
    });
    return element(by.xpath(this.createServer)).click().then(function () {
        logger.info("clicked on Create server Button...");
    });
};

datascience_notebookserver.prototype.clickLaunchBtn = function () {
    browser.switchTo().defaultContent();
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.launchBtn))), 160000).then(function () {
        logger.info("Waiting for Save Button to be clickable...");
    }).catch(function (err) {
        logger.info("Save Button is not clickable...");
    });
    return element(by.xpath(this.launchBtn)).click().then(function () {
        logger.info("clicked on Save Button...");
    });
};

datascience_notebookserver.prototype.getServerSummeryPageTitle = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.getNotebookServerSummeryPageTitle)), 'Notebook Servers'), 5000).then(function () {
        logger.info("Notebook Server Summery Page Title is present..")
    }).catch(function () {
        logger.info("Notebook Server Page Title is not Present..")
    });
    return element(by.xpath(this.getNotebookServerSummeryPageTitle)).getText().then(function (title) {
        logger.info("Notebook Server Page Title is fetched successfully.." + title + "###############")
        return title;
    })
};



//=========================Delete function===================
datascience_notebookserver.prototype.clickDeleteServer = function (index) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.deleteServer))), 160000).then(function () {
        logger.info("Waiting for Delete Project to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Project is not clickable...");
    });
    return element(by.xpath(this.deleteServer)).click().then(function () {
        logger.info("clicked on Delete Project...");
    });
};
//Cancel button on Delete popup
datascience_notebookserver.prototype.clickCancelDeleteServer = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnCancel))), 160000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.btnCancel)).click().then(function () {
        logger.info("Cancelled Successfully...");
    });
};

datascience_notebookserver.prototype.clickTerminate = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.btnDelete))), 160000).then(function () {
        logger.info("Waiting for Delete Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Button is not clickable...");
    });
    return element(by.xpath(this.btnDelete)).click().then(function () {
        logger.info("User Deleted Successfully...");
        
    });
};

//Cancel button on Create Server

datascience_notebookserver.prototype.clickCancelServer = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.cancelbtn))), 160000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.cancelbtn)).click().then(function () {
        logger.info("Cancelled Successfully...");
    });
};
//****************** Function uses to count Total Projects In List *****************************************
datascience_notebookserver.prototype.getTotalServerCount = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.getNotebookServerSummeryPageTitle))), 160000).then(function () {
        logger.info("project Summary List is Visible..")
    }).catch(function () {
        logger.info("project Summary List is Not Visible..")
    });
    return element.all(by.xpath(this.getNotebookServerSummeryPageTitle)).count().then(function (count) {
        logger.info("project count is: " + count)
    });
};


//********start******Functions to use Enter value in textbox *******start**********

datascience_notebookserver.prototype.enterServertName = function (serverName, index) {
    let serverNameObj = this.serverName + "\[" + index + "\]";
    return element(by.xpath(serverNameObj)).sendKeys(serverName).then(function () {
        logger.info("Entered server Name Value of index " + index + " is :- " + serverName);
    });
};

datascience_notebookserver.prototype.clearServertName = function () {
    
    return element(by.xpath(this.serverName)).clear().then(function () {
        logger.info("Clear server Name  " );
    });
};
datascience_notebookserver.prototype.enterCpuValue = function (cpuValue, index) {
    let cpuValueObj = this.cpuValue + "\[" + index + "\]";
    return element(by.xpath(cpuValueObj)).sendKeys(cpuValue).then(function () {
        logger.info("Entered cpu Value of index " + index + " is :- " + cpuValue);
    });
};

datascience_notebookserver.prototype.clearCpuValue = function () {
    
    return element(by.xpath(this.cpuValue)).clear().then(function () {
        logger.info("Clear cpuValue  " );
    });
};
datascience_notebookserver.prototype.enterMemoryValue = function (memoryValue, index) {
    let memoryValueObj = this.memoryValue + "\[" + index +"\]" ;
    return element(by.xpath(memoryValueObj)).sendKeys(memoryValue).then(function () {
        logger.info("Entered memory Value of index " + index + " is :- " + memoryValue);
    });
};



datascience_notebookserver.prototype.columnServerName = function () {
    
    return element(by.xpath(this.getServerNameCol)).getText().then(function (title) {
            logger.info("Server Name column is fetched successfully.." + title + "###############")
            return title;
    });
};



//***********End ************ 
//*************** Function For Negative Testing********
//Server Name negative test
datascience_notebookserver.prototype.getServerNameTextErrorMsg = function (index) {
    return this.idServerNameElementLocator(index).then(function (idlocate) {
        var xpathForServerNameErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForServerNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for Server Name")
        }).catch(function (err) {
            logger.info("Error message for Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForServerNameErr)).getText().then(function (error) {
            logger.info("Error message for Server Name displayed successfully");
            return error;
        });
    });
   
};
datascience_notebookserver.prototype.idServerNameElementLocator = function (index) {
    let serverNameObj = this.serverName + "\[" + index + "\]";
    return element(by.xpath(serverNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};

//CPU negative test

datascience_notebookserver.prototype.getCPUTextErrorMsg = function (index) {
    
    return this.idCPUElementLocator(index).then(function (idlocate) {
        var xpathForCPUErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForCPUErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for CPU value")
        }).catch(function (err) {
            logger.info("Error message for CPU  field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForCPUErr)).getText().then(function (error) {
            logger.info("Error message for CPU value displayed successfully");
            return error;
        });
    });
   
};
datascience_notebookserver.prototype.idCPUElementLocator = function (index) {
    let cpuObj = this.cpuValue + "\[" + index + "\]";
    return element(by.xpath(cpuObj)).getAttribute("id").then(function (id) {
        return id
    });
};
//Memory negative test
datascience_notebookserver.prototype.getServerMemoryTextErrorMsg = function (index) {
    return this.idMemoryElementLocator(index).then(function (idlocate) {
        var xpathForMemoryNameErr = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathForMemoryNameErr))), 5000).then(function () {
            logger.info("Waiting for error message to display for Server Name")
        }).catch(function (err) {
            logger.info("Error message for Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathForMemoryNameErr)).getText().then(function (error) {
            logger.info("Error message for Server Name displayed successfully");
            return error;
        });
    });
   
};
datascience_notebookserver.prototype.idMemoryElementLocator = function (index) {
    let serverMemoryObj = this.memoryValue + "\[" + index + "\]";
    return element(by.xpath(serverMemoryObj)).getAttribute("id").then(function (id) {
        return id
    });
};

/*******************************End*****************************/


//****************** Function uses to count Total Projects In List *****************************************
datascience_notebookserver.prototype.getTotalProjectCount = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.projectListXpath))), 160000).then(function () {
        logger.info("project Summery List is Visible..")
    }).catch(function () {
        logger.info("project Summery List is Not Visible..")
    });
    return element.all(by.xpath(this.projectListXpath)).count().then(function (count) {
        logger.info("project count is @@@" + count)
    });
};


//********************************Functions use to Get Text ****************************************************
//Name section text
datascience_notebookserver.prototype.getNameDescription = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.getNameDescription)), 'Projects'), 5000).then(function () {
        logger.info("Image section Description is present..")
    }).catch(function () {
        logger.info("Image section Description is not Present..")
    });
    return element(by.xpath(this.getNameDescriptionxpath)).getText().then(function (title) {
        logger.info("Image section Description is fetched successfully.." + title + "###############")
        return title;
    })
};

//Image Section text
datascience_notebookserver.prototype.getImageDescription = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.getImageDescription)), 'Projects'), 5000).then(function () {
        logger.info("Image section Description is present..")
    }).catch(function () {
        logger.info("Image section Description is not Present..")
    });
    return element(by.xpath(this.getImageDescriptionxpath)).getText().then(function (title) {
        logger.info("Image section Description is fetched successfully.." + title + "###############")
        return title;
    })
};

datascience_notebookserver.prototype.getStatus = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.status)), 'Projects'), 5000).then(function () {
        logger.info("Status is present..")
    }).catch(function () {
        logger.info("Status is not Present..")
    });
    return element(by.xpath(this.status)).getText().then(function (Status) {
        logger.info("Status is fetched successfully.." + Status + "###############")
        return Status;
    })
};

datascience_notebookserver.prototype.getNoteBookServer = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.notebookServerText)), 'Projects'), 5000).then(function () {
        logger.info("Status is present..")
    }).catch(function () {
        logger.info("Status is not Present..")
    });
    return element(by.xpath(this.notebookServerText)).getText().then(function (text) {
        logger.info("Status is fetched successfully.." + text + "###############")
        return text;
    })
};

datascience_notebookserver.prototype.getNoteBookName = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.notebookName)), 'Projects'), 5000).then(function () {
        logger.info("NoteBook Name is present..")
    }).catch(function () {
        logger.info("NoteBook Name is not Present..")
    });
    return element(by.xpath(this.notebookName)).getText().then(function (text) {
        logger.info("Notebook Name is fetched successfully.." + text + "###############")
        return text;
    })
};

datascience_notebookserver.prototype.getNoteBookImage = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.notebookImage)), 'Projects'), 5000).then(function () {
        logger.info("NoteBook Image is present..")
    }).catch(function () {
        logger.info("NoteBook Image is not Present..")
    });
    return element(by.xpath(this.notebookImage)).getText().then(function (text) {
        logger.info("Notebook Image is fetched successfully.." + text + "###############")
        return text;
    })
};

datascience_notebookserver.prototype.getNoteCPU = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.notebookCpu)), 'Projects'), 5000).then(function () {
        logger.info("NoteBook CPU is present..")
    }).catch(function () {
        logger.info("NoteBook CPU is not Present..")
    });
    return element(by.xpath(this.notebookCpu)).getText().then(function (text) {
        logger.info("Notebook CPU is fetched successfully.." + text + "###############")
        return text;
    })
};

datascience_notebookserver.prototype.getNoteGPU = function () {
    browser.wait(EC.textToBePresentInElement(element(by.xpath(this.notebookGPU)), 'Projects'), 5000).then(function () {
        logger.info("NoteBook GPU is present..")
    }).catch(function () {
        logger.info("NoteBook GPU is not Present..")
    });
    return element(by.xpath(this.notebookGPU)).getText().then(function (text) {
        logger.info("Notebook GPU is fetched successfully.." + text + "###############")
        return text;
    })
};

//********************************End Functions use to Get Text******************/
module.exports = datascience_notebookserver;

