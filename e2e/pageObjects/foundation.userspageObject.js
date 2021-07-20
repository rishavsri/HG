"use strict";

var extend = require('extend');
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
    foundation: 'accordion-button-1',
    usertab: '//a[@href="/users"]/div',
    addUser: '//*[contains(text(),"Add User")]',
    emailId: '(//*[@name="email"])',//(//*[@class="dropdown-heading"])
    groupDropdown: '(//*[@class="chakra-form-control css-1kxonj9"])[5]/label',
    group: '(//div[@class="dropdown-container"])',
    groupXpath: '//*[@class="css-1hu0qob" and text()="',//Marketing"]
    groupListXpath: '//*[@class="css-1hu0qob"]',
    boolSelectedGroup: '//*[@role="listbox"]/ul/li/label',//'//*[@aria-selected="false"]',
    // firstName:                  'firstName',
    firstName: '(//*[@name="firstName"])',
    lastName: '(//*[@name="lastName"])',
    addMore: '//button[contains(text(),"Add More")]',
    usersubmit: 'Invite User',
    userUpdate: 'Update User',
    invitationToast: "//li[@class='chakra-toast']//div[@class='chakra-alert__title css-1fhgib7']",
    updateToast: "//li[@class='chakra-toast']//div[@class='chakra-alert__title css-1fhgib7'][normalize-space()='User updated']",
    boolSelection: '(//*[@class="select-panel"]//li/label)',//'//*[@class="chakra-stack css-gmq9of"]//span',//'(//*[@class="chakra-stack css-gmq9of"]//span[@aria-hidden="true"])[1]',
    emailDuplicateError: "//li[@class='chakra-toast']//div[@id='1']", // auto_CiOK@gmail.com cannot be added
    // userIndexsubmit:			'Invite User', ------ //li[@class='chakra-toast']//*[@class="chakra-alert__title css-1fhgib7"]
    //div[contains(text(),"prakash.prabhat@hypergiant.com cannot be added")]
    // logout: '//button[normalize-space()="Log out user@example.com"]',
    existingEmailError: "(//div[contains(text(),'",
    // jason.job@hypergiant.com
    canNotBeAdded: " cannot be added')])[1]",
    logout: '//button[@id="menu-button-11"]',
    // editUser: '(//table[@role="table"]/tbody/tr)[3]//*[@aria-label="Edit User"]',
    tableBody: '(//table[@role="table"]/tbody/tr)',
    indexOfEdit: '//*[@aria-label="Edit User"]',
    updateUser: '//button[contains(text(),"Update User")]',
    indexOfDelete: '//*[@aria-label="Delete User"]',
    deleteButton: '//button[normalize-space()="Delete"]',
    cancelOfdeleteButton: '//button[normalize-space()="Cancel"]',
    deleteToast: "//li[@class='chakra-toast']//div[@class='chakra-alert__title css-1fhgib7'][normalize-space()='User deleted']",
    //=========================Locators for Manage Group BEGIN ====================
    manageGroup: '//button[normalize-space()="Manage Group"]',
    createNewGroup: '//button[normalize-space()="create New group"]',
    groupName: '//*[@name="groupName"]',
    groupDesc: '//*[@name="groupDescription"]',
    selectRole: '(//div[@class="dropdown-container"])',
    roleList: '//*[@class="css-1hu0qob"]',
    createGroup: '//button[normalize-space()="Create Group"]',
    tableBodyForManageGroup: '(//*[@class="chakra-modal__body css-55maf7"]//table[@role="table"]/tbody/tr)',
    indexOfEditGroup: '//*[@aria-label="Edit Group"]',
    indexOfDeleteGroup: '//*[@aria-label="Delete Group"]',
    groupCreatedXpath: "//li[@class='chakra-toast']//div[@class='chakra-alert__title css-1fhgib7'][normalize-space()='",//group22sdfs Group Created']",
    groupCreated: " Group Created']",
    searchUser: '//*[@class="chakra-input__group css-4302v8"]/input[@placeholder="Search users"]',
    searchedUser: '(//*[@role="group"]//table[@role="table"]/tbody/tr)[1]',
    searchedUserAdd: "//button[normalize-space()='Add']",
    groupCreated: 'Create Group',
    ////li[@class='chakra-toast']//div[@class='chakra-alert__title css-1fhgib7'][normalize-space()='group22sdfs Group Created']


};

function foundation(selectorConfig) {
    if (!(this instanceof foundation)) {
        return new foundation(selectorConfig);
    }
    extend(this, defaultConfig);

    if (selectorConfig) {
        extend(this, selectorConfig);
    }
}

//*************BEGIN************** Functions for Clicking On Tab links ****************BEGIN*****************

foundation.prototype.clickFoundation = function () {
    return element(by.id(this.foundation)).click().then(function () {
        logger.info("clicked on Foundation...");
    });
};

foundation.prototype.clickUser = function () {
    return element(by.xpath(this.usertab)).click().then(function () {
        logger.info("clicked on User...");
    });
};

foundation.prototype.clickLogOutUser = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.logout))), 10000).then(function () {
        logger.info("Waiting for Logout to be clickable...");
    }).catch(function (err) {
        logger.info("Logout is not clickable...");
    });
    return element(by.xpath(this.logout)).click().then(function () {
        logger.info("User Logged out Successfully...");
    });
};

//************END*************** Functions for Clicking Tab links ******************END**************

//*************BEGIN************** Function to use ENTER Value in text ****************BEGIN*****************
foundation.prototype.resetFirstName = function (firstName) {
    var elem = element(by.xpath(this.firstName));
    browser.wait(EC.elementToBeClickable(elem), 40000);
    // elem.clear();
    return elem.sendKeys(firstName).then(function () {
        logger.info("First Name is Set to : " + firstName);
    });
};

foundation.prototype.enterFirstName = function (firstName, index) {
    let firstNameObj = this.firstName + "\[" + index + "\]";
    return element(by.xpath(firstNameObj)).sendKeys(firstName).then(function () {
        logger.info("Entered First Name Value of index " + index + " is :- " + firstName);
    });
};

foundation.prototype.enterLastName = function (lastName, index) {
    let lastNameObj = this.lastName + "\[" + index + "\]";
    return element(by.xpath(lastNameObj)).sendKeys(lastName).then(function () {
        logger.info("Entered Last Name Value of index " + index + " is :- " + lastName);
    });
};

foundation.prototype.enterEmailID = function (emailId, index) {
    let emailIdObj = this.emailId + "\[" + index + "\]";
    return element(by.xpath(emailIdObj)).sendKeys(emailId).then(function () {
        logger.info("Entered Email ID value of index " + index + " is :- " + emailId);
    });
};

foundation.prototype.getTextOfFirstName = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.firstName))), 3000).then(function () {
        logger.info("Waiting for First Name to be Visible...");
    }).catch(function (err) {
        logger.info("First Name is not visible...");
    });
    return element(by.xpath(this.firstName)).getAttribute("value").then(function (text) {
        logger.info("Editing the User whose First Name was:- ", text);
    });
};

foundation.prototype.getTextOfLastName = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.lastName))), 3000).then(function () {
        logger.info("Waiting for Last Name to be Visible...");
    }).catch(function (err) {
        logger.info("Last Name is not visible...");
    });
    return element(by.xpath(this.lastName)).getAttribute("value").then(function (text) {
        logger.info("Editing the User whose Last Name was:- ", text);
    });
};

foundation.prototype.isInvitationSuccessMessage = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.invitationToast))), 10000).then(function () {
        logger.info("Waiting for Invitation Sent Message to be Display...");
    }).catch(function (err) {
        logger.info("Invitation Sent Message doesn't displayed correctly...");
    });
    return element(by.xpath(this.invitationToast)).isDisplayed().then(function () {
        logger.info("Invitation Sent Successfully message is displayed...");
    });
};

foundation.prototype.isUserUpdateSuccessMessage = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.updateToast))), 5000).then(function () {
        logger.info("Waiting for User Update Message to be Display...");
    }).catch(function (err) {
        logger.info("User Updated Message doesn't displayed correctly...");
    });
    return element(by.xpath(this.updateToast)).isDisplayed().then(function () {
        logger.info("User Updated message displayed Successfully...");
    });
};

foundation.prototype.isUserDeleteSuccessMessage = function () {
    browser.wait(EC.visibilityOf(element(by.xpath(this.deleteToast))), 5000).then(function () {
        logger.info("Waiting for User Delete Message to be Display...");
    }).catch(function (err) {
        logger.info("User Delete Message doesn't displayed correctly...");
    });
    return element(by.xpath(this.deleteToast)).isDisplayed().then(function () {
        logger.info("User Deleted message displayed Successfully...");
    });
};

foundation.prototype.emailExistingErrorMessage = function (email) {
    let existingEmailErrorObj = this.existingEmailError + email + this.canNotBeAdded;
    browser.wait(EC.visibilityOf(element(by.xpath(existingEmailErrorObj))), 3000).then(function () {
        logger.info("Waiting for Existing Email Error Message to be Display...");
    }).catch(function (err) {
        logger.info("Existing Email Error Message doesn't displayed correctly...");
    });
    return element(by.xpath(existingEmailErrorObj)).isDisplayed().then(function () {
        logger.info("Email " + email + " already Exist message is displayed...");
    });
};

//*************END************** Function to use ENTER Value ****************END*****************

//*************BEGIN************** Function to Click/Submit button ****************BEGIN*****************

foundation.prototype.clickInviteUser = function () {
    browser.switchTo().defaultContent();
    // util.waitForAngular();
    browser.wait(EC.elementToBeClickable(element(by.buttonText(this.usersubmit))), 5000).then(function () {
        logger.info("Waiting for Invite User to be clickable...");
    }).catch(function (err) {
        logger.info("Invite User is not clickable...");
    });
    return element(by.buttonText(this.usersubmit)).click().then(function () {
        logger.info("clicked on Invite User...");
    });
};

foundation.prototype.clickInviteIndexUser = function (index) {
    browser.wait(EC.elementToBeClickable(element(by.buttonText('Invite \(' + index + '\) Users'))), 160000).then(function () {
        logger.info("Waiting for " + 'Invite \(' + index + '\) Users' + " to be clickable...");
    }).catch(function (err) {
        logger.info('Invite \(' + index + '\) Users' + " is not clickable...");
    });
    return element(by.buttonText('Invite \(' + index + '\) Users')).click().then(function () {
        logger.info("clicked on " + 'Invite \(' + index + '\) Users' + "Button...");
    });
};

foundation.prototype.clickAddUser = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addUser))), 160000).then(function () {
        logger.info("Waiting for Add User Button to be clickable...");
    }).catch(function (err) {
        logger.info("Add User Button is not clickable...");
    });
    return element(by.xpath(this.addUser)).click().then(function () {
        logger.info("clicked on Add User Button...");
    });
};

foundation.prototype.clickSelectGroup = function (index) {
    let groupObj = this.group + "\[" + index + "\]";
    browser.wait(EC.elementToBeClickable(element(by.xpath(groupObj))), 5000).then(function () {
        logger.info("Waiting for Select Group " + index + " to be clickable...");
    }).catch(function (err) {
        logger.info("Select Group " + index + " is not clickable...");
    });
    return element(by.xpath(groupObj)).click().then(function () {
        logger.info("clicked on Select Group " + index + "...");
    });
};

foundation.prototype.clickUpdateUser = function () {
    // browser.switchTo().defaultContent();
    // util.waitForAngular();
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.updateUser))), 3000).then(function () {
        logger.info("Waiting for Update User to be clickable...");
    }).catch(function (err) {
        logger.info("Update User is not clickable...");
    });
    return element(by.xpath(this.updateUser)).click().then(function () {
        logger.info("clicked on Update User...");
    });
};

foundation.prototype.getTextOfSelectedGroupValue = function (index) {
    // let groupValueObj=this.groupXpath+value+"\"]";
    var groupXpathForSelectingValue = '//*[@class="css-1hu0qob" and text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.groupListXpath))), 50000).then(function () {
        logger.info("Waiting for Dropdown to be select...");
    }).catch(function (err) {
        logger.info("Dropdown doesn't Populate...");
    });
    var selectCheckBox = new foundation();

    return element.all(by.xpath(this.groupListXpath)).getText().then(function (arr) {
        if (index < arr.length) {
            for (var i = index; i <= arr.length; i++) {
                let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
                var j = i + 1
                return selectCheckBox.checkTagSelection(j).then(function (selected) {
                    if (selected == "true") {
                        logger.info("Dropdown " + arr[i] + " was already Selected")
                    }
                    else {
                        return element(by.xpath(groupValueObj)).click().then(function () {
                            logger.info("Dropdown as " + arr[i] + " is Selected...");
                        });
                    }

                })
            }
        }
        else {
            for (var i = 0; i <= 0; i++) {
                let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
                var j = i + 1
                return selectCheckBox.checkTagSelection(j).then(function (selected) {
                    if (selected == "true") {
                        logger.info("Dropdown " + arr[i] + " was already Selected")
                    }
                    else {
                        return element(by.xpath(groupValueObj)).click().then(function () {
                            logger.info("Dropdown as " + arr[i] + " is Selected...");
                        });
                    }

                })
            }
        }
    });
};

foundation.prototype.uncheckGroupValue = function (index) {
    // let groupValueObj=this.groupXpath+value+"\"]";
    var groupXpathForSelectingValue = '//*[@class="css-1hu0qob" and text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.groupListXpath))), 50000).then(function () {
        logger.info("Waiting for Dropdown to be select...");
    }).catch(function (err) {
        logger.info("Dropdown doesn't Populate...");
    });
    var selectCheckBox = new foundation();

    return element.all(by.xpath(this.groupListXpath)).getText().then(function (arr) {
        for (var i = 0; i <= arr.length - 1; i++) {
            let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
            var j = i + 1
            selectCheckBox.checkTagSelection(j).then(function (selected) {
                if (selected == "true") {
                    return element(by.xpath(groupValueObj)).click().then(function () {
                        logger.info("Dropdown as " + arr[i] + " is UnChecked...");
                    });
                }
                else {
                    logger.info("Dropdown as " + arr[i] + " was not checked before")
                }
            });
        }
    });
};

foundation.prototype.checkTagSelection = function (index) {
    var tagSelection = this.boolSelection + '[' + index + ']'
    browser.wait(EC.visibilityOf(element(by.xpath(tagSelection))), 50000).then(function () {
        logger.info("Waiting for Dropdown Checkbox to appear...");
    }).catch(function (err) {
        logger.info("Dropdown checkbox is not appearing...");
    });
    return element(by.xpath(tagSelection)).getAttribute("aria-selected").then(function (value) {
        return value
    });
};

foundation.prototype.checkAllGroupValue = function () {
    // let groupValueObj=this.groupXpath+value+"\"]";
    var groupXpathForSelectingValue = '//*[@class="css-1hu0qob" and text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.groupListXpath))), 5000).then(function () {
        logger.info("Waiting for All Dropdown to be select...");
    }).catch(function (err) {
        logger.info("Dropdown doesn't Populate...");
    });

    return element.all(by.xpath(this.groupListXpath)).getText().then(function (arr) {
        for (var i = 0; i <= arr.length -1; i++) {
            let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
                   element(by.xpath(groupValueObj)).click().then(function () {
                        logger.info("Dropdown is Selected...");
                    });
        }
    });
};


// foundation.prototype.clickTextOfSelectedGroupValue = function (index) {
//     var current = this;
//     return this.getTextOfSelectedGroupValue(index).then(function () {
//         element(by.xpath(current.buttonSelectAddAccountCss)).click();
//         console.log("Clicked select button for" + blueprintAccountName)
//     })
// };


foundation.prototype.clickAddMore = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.addMore))), 50000).then(function () {
        logger.info("Waiting for Add More to be clickable...");
    }).catch(function (err) {
        logger.info("Add More is not clickable...");
    });
    return element(by.xpath(this.addMore)).click().then(function () {
        logger.info("clicked on Add More...");
    });
};

foundation.prototype.clickOnEditUser = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]" + this.indexOfEdit;
    browser.wait(EC.elementToBeClickable(element(by.xpath(editUserWithIndexCheck))), 5000).then(function () {
        logger.info("Waiting for Edit User to be clickable...");
    }).catch(function (err) {
        logger.info("Edit User is not clickable...");
    });
    this.getEmailTextOfEditableRow(index);
    this.getRoleTextOfEditableRow(index);
    this.getGroupTextOfEditableRow(index);
    this.getFullNameTextOfEditableRow(index);
    this.getStatusTextOfEditableRow(index);
    return element(by.xpath(editUserWithIndexCheck)).click().then(function () {
        logger.info("clicked on Edit User...");
    });
};

foundation.prototype.verifyDetailsofUser1 = function () {
    var editUserWithIndexCheck = this.tableBody;
    logger.info("available user list:- ", editUserWithIndexCheck);
    logger.info("Length of available user list:- ", editUserWithIndexCheck.length);
    // browser.wait(EC.elementToBeClickable(element(by.xpath(editUserWithIndexCheck))), 5000).then(function () {
    //     logger.info("Waiting for Edit User to be clickable...");
    // }).catch(function (err) {
    //     logger.info("Edit User is not clickable...");
    // });
    // this.getEmailTextOfEditableRow(index);
    // this.getRoleTextOfEditableRow(index);
    // return element(by.xpath(editUserWithIndexCheck)).click().then(function () {
    //     logger.info("clicked on Edit User...");
    // });
};

foundation.prototype.verifyDetailsofUser = function () {
    // let groupValueObj=this.groupXpath+value+"\"]";
    var editUserWithIndexCheck = this.tableBody;
    // logger.info("available user list:- ",editUserWithIndexCheck);
    // logger.info("Length of available user list:- ",editUserWithIndexCheck.length);
    // var groupXpathForSelectingValue = '//*[@class="css-1hu0qob" and text()="'
    browser.wait(EC.visibilityOf(element(by.xpath(editUserWithIndexCheck))), 50000).then(function () {
        logger.info("Waiting for Table to visible...");
    }).catch(function (err) {
        logger.info("Table is not Visible...");
    });
    element.all(by.xpath(editUserWithIndexCheck)).getSize().then(function (arr) {//this return gives only one or first data, only removing this return gives 1 data
        // if (index <= arr.length) {
        logger.info("Array length available user list:- ", arr.length);
        for (var i = 1; i <= arr.length; i++) {
            let groupValueObj = editUserWithIndexCheck + "[" + i + "]";
            // console.log("Table data is:- ",element(by.xpath(groupValueObj)).getAttribute("value"))
            return element(by.xpath(groupValueObj)).getText().then(function (value) {//top and this return gives only one or first data, if remove this return and put top return then gives all 10 data
                logger.info("Table is " + value + " is visible...");
                return value // Only This return, gives me all the row array value with 10 seperate Data
            });
        }
        // }
        // else {
        //     for (var i = 0; i <= arr.length; i++) {
        //         let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
        //         return element(by.xpath(groupValueObj)).click().then(function () {
        //             logger.info("Role as " + arr[i] + " is Selected...");
        //         });
        //     }
        // }
    });
};

foundation.prototype.clickDeleteUser = function (index) {
    var deleteUserWithIndex = this.tableBody + "[" + index + "]" + this.indexOfDelete;
    browser.wait(EC.elementToBeClickable(element(by.xpath(deleteUserWithIndex))), 5000).then(function () {
        logger.info("Waiting for Delete User to be clickable...");
    }).catch(function (err) {
        logger.info("Delete User is not clickable...");
    });
    return element(by.xpath(deleteUserWithIndex)).click().then(function () {
        logger.info("clicked on Delete User...");
    });
};

foundation.prototype.clickDelete = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.deleteButton))), 160000).then(function () {
        logger.info("Waiting for Delete Button to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Button is not clickable...");
    });
    return element(by.xpath(this.deleteButton)).click().then(function () {
        logger.info("User Deleted Successfully...");
    });
};

foundation.prototype.clickCancelOfDelete = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.cancelOfdeleteButton))), 3000).then(function () {
        logger.info("Waiting for Cancel Button to be clickable...");
    }).catch(function (err) {
        logger.info("Cancel Button is not clickable...");
    });
    return element(by.xpath(this.cancelOfdeleteButton)).click().then(function () {
        logger.info("Cancel button clicked successfully...");
    });
};

foundation.prototype.getFullNameTextOfEditableRow = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]"
    var xpathForFullName = "(" + editUserWithIndexCheck + "/td)[1]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForFullName))), 3000).then(function () {
        logger.info("Waiting for Name to be Visible...");
    }).catch(function (err) {
        logger.info("Name is not visible...");
    });
    return element(by.xpath(xpathForFullName)).getText().then(function (arr) {
        logger.info("Editing the User whose Name was:- ", arr);
    });
};

foundation.prototype.getEmailTextOfEditableRow = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]"
    var xpathForEmail = "(" + editUserWithIndexCheck + "/td)[2]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForEmail))), 3000).then(function () {
        logger.info("Waiting for Email to be Visible...");
    }).catch(function (err) {
        logger.info("Email is not visible...");
    });
    return element(by.xpath(xpathForEmail)).getText().then(function (arr) {
        logger.info("Editing the User whose Email ID is:- ", arr);
    });
};

foundation.prototype.getRoleTextOfEditableRow = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]"
    var xpathForRole = "(" + editUserWithIndexCheck + "/td)[3]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForRole))), 3000).then(function () {
        logger.info("Waiting for Role to be Visible...");
    }).catch(function (err) {
        logger.info("Role is not visible...");
    });
    return element(by.xpath(xpathForRole)).getText().then(function (arr) {
        logger.info("Editing the User whose Role is:- ", arr);
    });
};

foundation.prototype.getGroupTextOfEditableRow = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]"
    var xpathForGroup = "(" + editUserWithIndexCheck + "/td)[4]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForGroup))), 3000).then(function () {
        logger.info("Waiting for Group to be Visible...");
    }).catch(function (err) {
        logger.info("Group is not visible...");
    });
    return element(by.xpath(xpathForGroup)).getText().then(function (arr) {
        logger.info("Editing the User whose Group was:- ", arr);
    });
};

foundation.prototype.getStatusTextOfEditableRow = function (index) {
    var editUserWithIndexCheck = this.tableBody + "[" + index + "]"
    var xpathForStatus = "(" + editUserWithIndexCheck + "/td)[5]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForStatus))), 3000).then(function () {
        logger.info("Waiting for Status to be Visible...");
    }).catch(function (err) {
        logger.info("Status is not visible...");
    });
    return element(by.xpath(xpathForStatus)).getText().then(function (arr) {
        logger.info("Editing the User whose Status was:- ", arr);
    });
};


//*************END************** Function to Click/Submit button ****************END*****************

//***************BEGIN***************Function For Negative Testing************BEGIN*****************
foundation.prototype.getEmailTextErrorMsg = function (index) {
    return this.idEmailElementLocator(index).then(function (idlocate) {
        var xpathOfEmail = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfEmail))), 5000).then(function () {
            logger.info("Waiting for error message to display for Email")
        }).catch(function (err) {
            logger.info("Error message for Email field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathOfEmail)).getText().then(function (error) {
            logger.info("Error message for Email displayed successfully");
            return error;
        });
    });

};

foundation.prototype.idEmailElementLocator = function (index) {
    let emailIDObj = this.emailId + "\[" + index + "\]";
    return element(by.xpath(emailIDObj)).getAttribute("id").then(function (id) {
        return id
    });
};


foundation.prototype.getFirstNameTextErrorMsg = function (index) {
    return this.idFNameElementLocator(index).then(function (idlocate) {
        var firstNameErrorLocator = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(firstNameErrorLocator))), 5000).then(function () {
            logger.info("Waiting for error message to display for First Name")
        }).catch(function (err) {
            logger.info("Error message for First Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(firstNameErrorLocator)).getText().then(function (error) {
            logger.info("Error message for First Name displayed successfully");
            return error;
        });

    });
};

foundation.prototype.idFNameElementLocator = function (index) {
    let firstNameObj = this.firstName + "\[" + index + "\]";
    return element(by.xpath(firstNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};

foundation.prototype.getLastNameTextErrorMsg = function (index) {
    return this.idLNameElementLocator(index).then(function (idlocate) {
        var lastNameErrorLocator = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(lastNameErrorLocator))), 5000).then(function () {
            logger.info("Waiting for error message to be display for Last Name")
        }).catch(function (err) {
            logger.info("Error message for Last Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(lastNameErrorLocator)).getText().then(function (error) {
            logger.info("Error message for Last Name displayed successfully");
            return error;
        });

    });
};

foundation.prototype.idLNameElementLocator = function (index) {
    let lastNameObj = this.lastName + "\[" + index + "\]";
    return element(by.xpath(lastNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};

foundation.prototype.getGroupTextErrorMsg = function () {
    return this.idGroupElementLocator().then(function (idlocate) {
        var xpathOfGroupError = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfGroupError))), 5000).then(function () {
            logger.info("Waiting for error message to display for Group")
        }).catch(function (err) {
            logger.info("Error message for group dropdown field is not showing");
        });
        return element(by.xpath(xpathOfGroupError)).getText().then(function (error) {
            logger.info("Error message for Group displayed successfully if none group selected");
            return error;
        });
    });

};

foundation.prototype.idGroupElementLocator = function () {
    let groupIDObj = this.groupDropdown;
    return element(by.xpath(groupIDObj)).getAttribute("for").then(function (id) {
        return id
    });
};

foundation.prototype.checkInviteUser = function () {
    // browser.switchTo().defaultContent();
    // util.waitForAngular();
    browser.wait(EC.visibilityOf(element(by.buttonText(this.usersubmit))), 1000).then(function () {
        logger.info("Waiting for Invite User to be Enable...");
    }).catch(function (err) {
        logger.info("Invite User is not Enabled...");
    });
    return element(by.buttonText(this.usersubmit)).isEnabled().then(function (result) {
        logger.info("Invite User is Disabled...");
        return result
    });
};

foundation.prototype.checkUpdateUser = function () {
    // browser.switchTo().defaultContent();
    // util.waitForAngular();
    browser.wait(EC.visibilityOf(element(by.buttonText(this.userUpdate))), 3000).then(function () {
        logger.info("Waiting for Update User to be Enable...");
    }).catch(function (err) {
        logger.info("Update User is not Enabled...");
    });
    return element(by.buttonText(this.userUpdate)).isEnabled().then(function (result) {
        logger.info("Update User is Disabled...");
        return result
    });
};
//***************END***************Function For Negative Testing************END*****************

//========================Manage Group Section======================================================================

//*************BEGIN************** Fucntion to click on Button ****************BEGIN*****************

foundation.prototype.clickManageGroup = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.manageGroup))), 160000).then(function () {
        logger.info("Waiting for Manage Group Button to be clickable...");
    }).catch(function (err) {
        logger.info("Manage Group Button is not clickable...");
    });
    return element(by.xpath(this.manageGroup)).click().then(function () {
        logger.info("clicked on Manage Group Button...");
    });
};

foundation.prototype.clickCreateNewGroup = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.createNewGroup))), 160000).then(function () {
        logger.info("Waiting for Create New Group Button to be clickable...");
    }).catch(function (err) {
        logger.info("Create New Group Button is not clickable...");
    });
    return element(by.xpath(this.createNewGroup)).click().then(function () {
        logger.info("clicked on Create New Group Button...");
    });
};

foundation.prototype.submitCreateGroup = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.createGroup))), 5000).then(function () {
        logger.info("Waiting to Submit Create Group Button to be clickable...");
    }).catch(function (err) {
        logger.info("Create Group Button is not clickable...");
    });
    return element(by.xpath(this.createGroup)).click().then(function () {
        logger.info("Submitted to Create Group Button...");
    });
};


foundation.prototype.clickEditGroup = function (index) {
    var editgroupWithIndex = this.tableBodyForManageGroup + "[" + index + "]" + this.indexOfEditGroup;
    browser.wait(EC.elementToBeClickable(element(by.xpath(editgroupWithIndex))), 5000).then(function () {
        logger.info("Waiting for Edit Group to be clickable...");
    }).catch(function (err) {
        logger.info("Edit Group is not clickable...");
    });
    return element(by.xpath(editgroupWithIndex)).click().then(function () {
        logger.info("clicked on Edit Group...");
    });
};

foundation.prototype.clickDeleteGroup = function (index) {
    var deleteUserWithIndex = this.tableBodyForManageGroup + "[" + index + "]" + this.indexOfDeleteGroup;
    browser.wait(EC.elementToBeClickable(element(by.xpath(deleteUserWithIndex))), 5000).then(function () {
        logger.info("Waiting for Delete Group to be clickable...");
    }).catch(function (err) {
        logger.info("Delete Group is not clickable...");
    });
    return element(by.xpath(deleteUserWithIndex)).click().then(function () {
        logger.info("clicked on Delete Group...");
    });
};

foundation.prototype.clickOnAddAfterSearchingUser = function (userName) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.searchedUserAdd))), 5000).then(function () {
        logger.info("Waiting for Add to be clickable after searching the user...");
    }).catch(function (err) {
        logger.info("Add is not clickable after searching the user...");
    });
    return element(by.xpath(this.searchedUserAdd)).click().then(function () {
        logger.info("clicked on Add after searching the user with ",userName);
    });
};

//*************END************** Fucntion to click on Button ****************END*****************

//*************BEGIN************** Function to use ENTER Value in text ****************BEGIN*****************
foundation.prototype.enterGroupName = function (groupName) {
    return element(by.xpath(this.groupName)).sendKeys(groupName).then(function () {
        logger.info("Entered Group Name Value is :- " + groupName);
    });
};

foundation.prototype.enterGroupDesc = function (groupDesc) {
    return element(by.xpath(this.groupDesc)).sendKeys(groupDesc).then(function () {
        logger.info("Entered Group Name Value is :- " + groupDesc);
    });
};

foundation.prototype.enterToSearchUsers = function (userName) {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.searchUser))), 5000).then(function () {
        logger.info("Waiting for Search User Text field to be clickable...");
    }).catch(function (err) {
        logger.info("Search User Text field is not clickable...");
    });
    return element(by.xpath(this.searchUser)).sendKeys(userName).then(function () {
        logger.info("Entered User Details to Search is :- " + userName);
    });
};

//*************END************** Function to use ENTER Value in text ****************END*****************

//*************BEGIN************** Function to Select from Dropdown ****************BEGIN*****************

foundation.prototype.clickSelectRole = function () {
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.selectRole))), 50000).then(function () {
        logger.info("Waiting for Select Role to be clickable...");
    }).catch(function (err) {
        logger.info("Select Role is not clickable...");
    });
    return element(by.xpath(this.selectRole)).click().then(function () {
        logger.info("clicked on Select Role...");
    });
};

foundation.prototype.selectListRole = function (index) {
    // let groupValueObj=this.groupXpath+value+"\"]";
    var groupXpathForSelectingValue = '//*[@class="css-1hu0qob" and text()="'
    browser.wait(EC.elementToBeClickable(element(by.xpath(this.roleList))), 50000).then(function () {
        logger.info("Waiting for Select Role as to be select...");
    }).catch(function (err) {
        logger.info("Role is not Selectable...");
    });
    return element.all(by.xpath(this.roleList)).getText().then(function (arr) {
        logger.info("Array Length:- ",arr.length)
        logger.info("Index:- ",index)
        if (index <= arr.length) {
            for (var i = index-1; i <= arr.length; i++) {
                let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(groupValueObj)).click().then(function () {
                    logger.info("Role as " + arr[i] + " is Selected...");
                });
            }
        }
        else {
            for (var i = 0; i <= arr.length; i++) {
                let groupValueObj = groupXpathForSelectingValue + arr[i] + "\"]";
                return element(by.xpath(groupValueObj)).click().then(function () {
                    logger.info("Role as " + arr[i] + " is Selected...");
                });
            }
        }
    });
};

//*************END************** Function to Select from Dropdown ****************END*****************

//*************BEGIN************** Function for Message *************************BEGIN*****************


foundation.prototype.isGroupCreatedSuccessMessage = function (groupName) {
    var createGroupXpath = this.groupCreatedXpath+groupName+this.groupCreated;
    browser.wait(EC.visibilityOf(element(by.xpath(createGroupXpath))), 5000).then(function () {
        logger.info("Waiting for Group Created Message to be Display...");
    }).catch(function (err) {
        logger.info("Group Created Message doesn't displayed correctly...");
    });
    return element(by.xpath(createGroupXpath)).isDisplayed().then(function () {
        logger.info("Group Created message displayed Successfully...");
    });
};

foundation.prototype.getGroupNameErrorMsg = function (index) {
    return this.idGroupNameElementLocator(index).then(function (idlocate) {
        var xpathOfgroupName = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfgroupName))), 5000).then(function () {
            logger.info("Waiting for error message to display for Group Name")
        }).catch(function (err) {
            logger.info("Error message for Group Name field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathOfgroupName)).getText().then(function (error) {
            logger.info("Error message for Group Name displayed successfully");
            return error;
        });
    });

};

foundation.prototype.idGroupNameElementLocator = function (index) {
    let groupNameObj = this.groupName + "\[" + index + "\]";
    return element(by.xpath(groupNameObj)).getAttribute("id").then(function (id) {
        return id
    });
};

foundation.prototype.getGroupDescErrorMsg = function (index) {
    return this.idGroupDescElementLocator(index).then(function (idlocate) {
        var xpathOfgroupDesc = "//div[@id='" + idlocate + "-feedback']";
        browser.wait(EC.visibilityOf(element(by.xpath(xpathOfgroupDesc))), 5000).then(function () {
            logger.info("Waiting for error message to display for Group Description")
        }).catch(function (err) {
            logger.info("Error message for Group Description field is not showing after entering incorrect value/Length");
        });
        return element(by.xpath(xpathOfgroupDesc)).getText().then(function (error) {
            logger.info("Error message for Group Description displayed successfully");
            return error;
        });
    });

};

foundation.prototype.idGroupDescElementLocator = function (index) {
    let groupDescObj = this.groupDesc + "\[" + index + "\]";
    return element(by.xpath(groupDescObj)).getAttribute("id").then(function (id) {
        return id
    });
};

//*************END************** Function for Message *************************END*****************

//*************BEGIN************** Function to get the value *************************BEGIN*****************



foundation.prototype.getNameAfterSearching = function () {
    var userNameFromTableIndex = this.searchedUser //+ "[" + index + "]"
    var xpathForSearchedName = "(" + userNameFromTableIndex + "/td)[1]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForSearchedName))), 3000).then(function () {
        logger.info("Waiting for Name to be Visible...");
    }).catch(function (err) {
        logger.info("Name is not Available...");
    });
    return element(by.xpath(xpathForSearchedName)).getText().then(function (arr) {
        logger.info("User whose Name is:- ", arr);
    });
};

foundation.prototype.getGroupDetailsAfterSearching = function () {
    var userNameFromTableIndex = this.searchedUser //+ "[" + index + "]"
    var xpathForSearchedName = "(" + userNameFromTableIndex + "/td)[2]";
    browser.wait(EC.visibilityOf(element(by.xpath(xpathForSearchedName))), 3000).then(function () {
        logger.info("Waiting for Group to be Visible...");
    }).catch(function (err) {
        logger.info("Group is not Available...");
    });
    return element(by.xpath(xpathForSearchedName)).getText().then(function (arr) {
        logger.info("User whose Group is:- ", arr);
    });
};

foundation.prototype.checkCreateGroupButton = function () {
    // browser.switchTo().defaultContent();
    // util.waitForAngular();
    browser.wait(EC.visibilityOf(element(by.buttonText(this.groupCreated))), 1000).then(function () {
        logger.info("Waiting for Create Group to be Enable...");
    }).catch(function (err) {
        logger.info("Create Group is not Enabled...");
    });
    return element(by.buttonText(this.groupCreated)).isEnabled().then(function (result) {
        logger.info("Create Group is Disabled...");
        return result
    });
};


//*************END************** Function to get the value *************************END*****************


module.exports = foundation;