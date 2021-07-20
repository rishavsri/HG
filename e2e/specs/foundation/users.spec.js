/*
Spec_Name: users.spec.js 
Description: This spec will cover E2E testing of User Management, including of Edit and Delete User".   
Author: Prakash Prabhat
*/

"use strict";

const { browser } = require('protractor');

var foundationUsers = require('../../pageObjects/foundation.userspageObject.js'),
        async = require('async'),
        logGenerator = require("../../../helpers/logGenerator.js"),
        logger = logGenerator.getApplicationLogger(),
        appUrls = require('../../../testData/appUrls.json'),
        util = require('../../../helpers/util.js'),
        userTemplate = require('../../../testData/Foundation/UserDetails.json')
        ;

describe('Foundation - Users', function () {
        var foundationUsersPage;
        var messageStrings = {
                enableInviteUser:false,
                emailErrorMessage: "Enter a valid email with no more than 64 characters",
                firstNameErrorMessage: "Enter a valid First Name with no more than 50 characters",
                lastNameErrorMessage: "Enter a valid Last Name with no more than 50 characters",
                groupErrorMessage: "Atleast 1 group is required",
                groupDescErrorMessage: "A description must be no more than 250 characters",
                groupNameErrorMessage: "A group name with no more than 64 characters is required",
        };


        beforeAll(function () {
                foundationUsersPage = new foundationUsers();
                browser.driver.manage().window().maximize();
        });

        beforeEach(function () {
                expect(util.getCurrentURL()).toMatch(appUrls.homePageUrl);
                element(By.xpath('//button[@aria-label="Close"]')).isPresent().then(function (result) {
                        if (result) {
                                element(By.xpath('//button[@aria-label="Close"]')).click().then(function () {
                                        logger.info("clicked on Close X Button Successfully...");
                                });
                        } else {
                                foundationUsersPage.clickFoundation();
                                foundationUsersPage.clickUser();
                        }
                });
        });

        afterAll(function () {
                element(By.xpath('//button[@aria-label="Close"]')).isPresent().then(function (result) {
                        if (result) {
                                element(By.xpath('//button[@aria-label="Close"]')).click().then(function () {
                                        logger.info("clicked on Close X Button Successfully...");
                                        // foundationUsersPage.clickLogOutUser();
                                        // browser.close();
                                });
                        } else {
                                logger.info("Afterall...");
                                // foundationUsersPage.clickLogOutUser();
                                // browser.close();
                        }
                });
        });

        it("Verify clicking ADD USER button displays Add New Users pop-up window displaying editable textfields 'EMAIL', 'FIRST NAME', 'LAST NAME', 'GROUP' dropdown field all mandatory, and able to Invite User successfully", function () {
                var index = 1;
                var userObject = JSON.parse(JSON.stringify(userTemplate));
                var firstName = "FIrst" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                var emailAdd = "auto_" + util.getRandomString(4) + "@gmail.com";
                // browser.sleep(5000);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);
                foundationUsersPage.enterEmailID(emailAdd, index);
                browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickInviteUser();
                foundationUsersPage.isInvitationSuccessMessage();
                // browser.navigate().refresh();
                // browser.sleep(5000);
                // util.scrollToBottom();
                // browser.sleep(5000);
                // util.scrollToBottom();
                // util.scrollToBottom();
        });

        it("Verify selecting all Group Value with other mandatory field 'EMAIL', 'FIRST NAME', 'LAST NAME' allows to Invite User successfully", function () {
                var index = 1;
                var userObject = JSON.parse(JSON.stringify(userTemplate));
                var firstName = "FIrst" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                var emailAdd = "auto_" + util.getRandomString(4) + "@gmail.com";
                // browser.sleep(5000);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);
                foundationUsersPage.enterEmailID(emailAdd, index);
                browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.checkAllGroupValue();
                foundationUsersPage.clickInviteUser();
                foundationUsersPage.isInvitationSuccessMessage();
        });

        it("Verify clicking ADD MORE button adds another section of fields 'EMAIL', 'FIRST NAME', 'LAST NAME', 'GROUP' and clickable ADD MORE button to add another user, INVITE USER button updates to INVITE (2) USERS", function () {
                var index = 1;
                // var userObject = JSON.parse(JSON.stringify(userTemplate));
                var firstName1 = "First" + util.getRandomString(4);
                var lastName1 = "Last" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                var firstName2 = "First" + util.getRandomString(4);
                var lastName2 = "Last" + util.getRandomString(4);
                var emailAdd2 = "auto_" + util.getRandomString(4) + "@gmail.com";
                // browser.sleep(5000);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName1, index);
                foundationUsersPage.enterLastName(lastName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                // foundationUsersPage.clickSelectGroupValue("Administrator");
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                // browser.sleep(5000);
                if (foundationUsersPage.clickAddMore()) {
                        index = index + 1
                }
                foundationUsersPage.enterFirstName(firstName2, index);
                foundationUsersPage.enterLastName(lastName2, index);
                foundationUsersPage.enterEmailID(emailAdd2, index);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickInviteIndexUser(index);
                foundationUsersPage.isInvitationSuccessMessage();
        });
        it("Verify making a change and clicking UPDATE USER button saves the changes made and reflects on summary list page", function () {
                var index = 1;
                var firstName = "First" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                foundationUsersPage.clickOnEditUser(util.getRandomNumber(1));
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickUpdateUser();
                foundationUsersPage.isUserUpdateSuccessMessage();
        });

        it("Verify without making any change after clicking on Edit User , Update user button stays disabled", function () {
                foundationUsersPage.clickOnEditUser(util.getRandomNumber(1));
                foundationUsersPage.checkUpdateUser();
        });

        it("Verify clicking DELETE button closes the Confirm Delete confirmation pop-up window and displays confirmation toast at bottom of User Management Summary List page ‘User deleted’", function () {
                foundationUsersPage.clickDeleteUser(util.getRandomNumber(1));
                foundationUsersPage.clickDelete();
                foundationUsersPage.isUserDeleteSuccessMessage();
                // browser.sleep(5000);
        });

        xit("Verifying the details of Added User in the User Management page, which is testing manualy for now", function () {
                foundationUsersPage.verifyDetailsofUser();
                // logger.info("in Spec file details:- ",foundationUsersPage.verifyDetailsofUser())
                // foundationUsersPage.clickDelete();
                // browser.sleep(5000);
        });

        it("Verify clicking CANCEL button closes the Confirm Delete pop-up window and displays the User Management Summary List page", function () {
                foundationUsersPage.clickDeleteUser(util.getRandomNumber(1));
                foundationUsersPage.clickCancelOfDelete();
                // Manually checking User list availability for now. Yet to implement
        });

        it("Verify Remove symbol remove extra added field once clicked on ADD More Button", function () {
                foundationUsersPage.clickAddUser();
                foundationUsersPage.clickAddMore();
        });

        it("Check Whether able to Invite User with Maximum character Length of Each Text Field", function () {
                var index = 1;
                var firstName = "First" + util.getRandomString(45);
                var lastName = "Last" + util.getRandomString(46);
                var emailAdd = "auto_" + util.getRandomString(49) + "@gmail.com";
                // browser.sleep(5000);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);               
                foundationUsersPage.enterEmailID(emailAdd, index);
                logger.info("Total Character Length of EmailID Entered as:- ",emailAdd.length);
                logger.info("Total Character Length of First Name Entered as:- ",firstName.length);
                logger.info("Total Character Length of Last Name Entered as:- ",lastName.length); 
                browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickInviteUser();
                foundationUsersPage.isInvitationSuccessMessage();
        });

        it("Verify entering a user that is already existing in the summary list page results in confirmation message toast at bottom of page \"user's email cannot be added with red exclamation mark and \'x\' to close", function () {
                var index = 1;
                var userObject = JSON.parse(JSON.stringify(userTemplate));
                var firstName = "First" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                var emailAdd = "auto_" + util.getRandomString(4) + "@gmail.com";
                // browser.sleep(5000);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);
                foundationUsersPage.enterEmailID(emailAdd, index);
                browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickInviteUser();
                foundationUsersPage.isInvitationSuccessMessage();
                browser.sleep(5000);
                browser.navigate().refresh();
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName, index);
                foundationUsersPage.enterLastName(lastName, index);
                foundationUsersPage.enterEmailID(emailAdd, index);
                browser.sleep(5000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.clickInviteUser();
                foundationUsersPage.emailExistingErrorMessage(emailAdd);
        });

        it("Verify entering an incomplete email address results in an error message displayed below field 'Enter a valid email with no more than 64 characters'", function () {
                var index = 1;
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterEmailID("invalid", index);
                expect(foundationUsersPage.getEmailTextErrorMsg(index)).toEqual(messageStrings.emailErrorMessage);
        });
        it("Verify only alpha characters are allowed into the FIRST NAME textfields", function () {
                var index = 1;
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName("43@#", index);
                expect(foundationUsersPage.getFirstNameTextErrorMsg(index)).toBe(messageStrings.firstNameErrorMessage);
        });

        it("Verify only alpha characters are allowed into the LAST NAME textfields", function () {
                var index = 1;
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterLastName("@#$12", index);
                expect(foundationUsersPage.getLastNameTextErrorMsg(index)).toBe(messageStrings.lastNameErrorMessage);
        });

        it("Validate Whether Invite User is Disabled with More than 64 character Length of Email Field", function () {
                var index = 1;
                var emailAdd = "auto_" + util.getRandomString(50) + "@gmail.com";
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterEmailID(emailAdd, index);
                logger.info("Total Character Length of EmailID Entered as:- ",emailAdd.length);
                expect(foundationUsersPage.getEmailTextErrorMsg(index)).toEqual(messageStrings.emailErrorMessage);
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled with More than 50 character Length of First Name Field", function () {
                var index = 1;
                var firstName = "First" + util.getRandomString(46);
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterFirstName(firstName, index);
                logger.info("Total Character Length of First Name Entered as:- ",firstName.length);
                expect(foundationUsersPage.getFirstNameTextErrorMsg(index)).toEqual(messageStrings.firstNameErrorMessage);
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled with More than 50 character Length of Last Name Field", function () {
                var index = 1;
                var lastName = "Last" + util.getRandomString(47);
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterLastName(lastName, index);
                logger.info("Total Character Length of Last Name Entered as:- ",lastName.length);
                expect(foundationUsersPage.getLastNameTextErrorMsg(index)).toEqual(messageStrings.lastNameErrorMessage);
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });

        it("Validate Whether Invite User is Disabled where other Mandatory fields are filled But Group is not selected", function () {
                var index = 1;
                var firstName1 = "First" + util.getRandomString(4);
                var lastName1 = "Last" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterFirstName(firstName1, index);
                foundationUsersPage.enterLastName(lastName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where other Mandatory fields are filled But Last Name is not Entered", function () {
                var index = 1;
                var firstName1 = "First" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterFirstName(firstName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where other Mandatory fields are filled But First Name is not Entered", function () {
                var index = 1;
                var lastName1 = "Last" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterLastName(lastName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where other Mandatory fields are filled but Email is not Entered", function () {
                var index = 1;
                var lastName1 = "Last" + util.getRandomString(4);
                var firstName1 = "First" + util.getRandomString(4);
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName1, index);             
                foundationUsersPage.enterLastName(lastName1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where First Name, Email, Group are filled Correctly But Last Name is Entered incorrectly", function () {
                var index = 1;
                var firstName1 = "First" + util.getRandomString(4);
                var lastName1 = "@Last@#" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();             
                foundationUsersPage.enterFirstName(firstName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                foundationUsersPage.enterLastName(lastName1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where Last Name, Email, Group are filled Correctly But First Name is Entered incorrectly", function () {
                var index = 1;
                var firstName1 = "First@#" + util.getRandomString(4);
                var lastName1 = "Last" + util.getRandomString(4);
                var emailAdd1 = "auto_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();       
                foundationUsersPage.enterFirstName(firstName1, index);      
                foundationUsersPage.enterLastName(lastName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });
        it("Validate Whether Invite User is Disabled where First Name, Last Name, Group are filled Correctly but Email is Entered incorrectly", function () {
                var index = 1;
                var lastName1 = "Last" + util.getRandomString(4);
                var firstName1 = "First" + util.getRandomString(4);
                var emailAdd1 = "auto@#_" + util.getRandomString(4) + "@gmail.com";
                foundationUsersPage.clickAddUser();
                foundationUsersPage.enterFirstName(firstName1, index);             
                foundationUsersPage.enterLastName(lastName1, index);
                foundationUsersPage.enterEmailID(emailAdd1, index);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                expect(foundationUsersPage.checkInviteUser()).toBe(messageStrings.enableInviteUser);
        });

        it("Verify Entering invalid charactes into the First Name Field throws error message as 'Enter a valid First Name with no more than 50 characters' while editing the Existing user and where Update User button should be disabled", function () {
                var index = 1;
                // var firstName = "First" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                foundationUsersPage.clickOnEditUser(util.getRandomNumber(1));
                foundationUsersPage.enterFirstName("43@$%", index);
                expect(foundationUsersPage.getFirstNameTextErrorMsg(index)).toBe(messageStrings.firstNameErrorMessage);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.checkUpdateUser();
        });

        it("Verify Entering invalid charactes into the Last Name Field throws error message as 'Enter a valid Last Name with no more than 50 characters' while editing the Existing user and where Update User button should be disabled", function () {
                var index = 1;
                // var firstName = "First" + util.getRandomString(4);
                var lastName = "Last" + util.getRandomString(4);
                foundationUsersPage.clickOnEditUser(util.getRandomNumber(1));
                foundationUsersPage.enterLastName("4356@$%", index);
                expect(foundationUsersPage.getLastNameTextErrorMsg(index)).toBe(messageStrings.lastNameErrorMessage);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.checkUpdateUser();
        });

        it("Verify unchecking all group value throws error message as 'Atleast 1 group is required' while editing the Existing user and where Update User button should be disabled", function () {
                var index = 1;
                // var firstName = "First" + util.getRandomString(4);
                // var lastName = "Last" + util.getRandomString(4);
                foundationUsersPage.clickOnEditUser(util.getRandomNumber(1));
                // foundationUsersPage.enterLastName("4356@$%", index);
                // expect(foundationUsersPage.getLastNameTextErrorMsg(index)).toBe(messageStrings.lastNameErrorMessage);
                browser.sleep(3000);
                foundationUsersPage.clickSelectGroup(index);
                foundationUsersPage.uncheckGroupValue();
                foundationUsersPage.clickSelectGroup(index);
                expect(foundationUsersPage.getGroupTextErrorMsg()).toBe(messageStrings.groupErrorMessage);
                // foundationUsersPage.getTextOfSelectedGroupValue(util.getRandomNumber(1));
                foundationUsersPage.checkUpdateUser();
        });
        

        //===================================Manage Group Spec Part====================================

        it("Create New Group Functionality", function () {
                var groupName="group_"+util.getRandomString(4);
                var groupDescription="groupDescription_"+util.getRandomString(10);
                var userDetails="user@example.com";
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickCreateNewGroup();
                foundationUsersPage.enterGroupName(groupName);
                foundationUsersPage.enterGroupDesc(groupDescription);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectRole();
                foundationUsersPage.selectListRole(util.getRandomNumber(1));
                foundationUsersPage.enterToSearchUsers(userDetails);
                browser.sleep(2000);
                foundationUsersPage.getNameAfterSearching();
                foundationUsersPage.getGroupDetailsAfterSearching();
                foundationUsersPage.clickOnAddAfterSearchingUser(userDetails);
                foundationUsersPage.submitCreateGroup();
                foundationUsersPage.isGroupCreatedSuccessMessage(groupName);
        });

        it("Verify only 64 characters are allowed within the GROUP NAME textfield", function () {
                var groupName="group_"+util.getRandomString(58);
                var groupDescription="groupDescription_"+util.getRandomString(4);
                var userDetails="user@example.com";
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickCreateNewGroup();
                foundationUsersPage.enterGroupName(groupName);
                logger.info("Total Entered Character Length of Group Name as:- ",groupName.length);
                foundationUsersPage.enterGroupDesc(groupDescription);
                logger.info("Total Entered Character Length of Group Description as:- ",groupDescription.length);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectRole();
                foundationUsersPage.selectListRole(util.getRandomNumber(1));
                foundationUsersPage.enterToSearchUsers(userDetails);
                browser.sleep(2000);
                foundationUsersPage.getNameAfterSearching();
                foundationUsersPage.getGroupDetailsAfterSearching();
                foundationUsersPage.clickOnAddAfterSearchingUser(userDetails);
                foundationUsersPage.submitCreateGroup();
                foundationUsersPage.isGroupCreatedSuccessMessage(groupName);
        });

        it("Verify entering more than 64 characters in the GROUP NAME textfield results in error message 'A group name with no more than 64 characters is required', CREATE GROUP button disabled", function () {
                var groupName="group_"+util.getRandomString(59);
                var groupDescription="groupDescription_"+util.getRandomString(4);
                var userDetails="user@example.com";
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickCreateNewGroup();
                foundationUsersPage.enterGroupName(groupName);
                expect(foundationUsersPage.getGroupNameErrorMsg(index)).toEqual(messageStrings.groupNameErrorMessage);
                logger.info("Total Entered Character Length of Group Name as:- ",groupName.length);
                foundationUsersPage.enterGroupDesc(groupDescription);
                logger.info("Total Entered Character Length of Group Description as:- ",groupDescription.length);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectRole();
                foundationUsersPage.selectListRole(util.getRandomNumber(1));
                foundationUsersPage.enterToSearchUsers(userDetails);
                browser.sleep(2000);
                foundationUsersPage.getNameAfterSearching();
                foundationUsersPage.getGroupDetailsAfterSearching();
                foundationUsersPage.clickOnAddAfterSearchingUser(userDetails);
                foundationUsersPage.checkCreateGroupButton();
                // foundationUsersPage.isGroupCreatedSuccessMessage(groupName);
        });

        it("Verify entering more than 250 characters in the GROUP DESCRIPTION textfield results in error message 'A description must be no more than 250 characters', CREATE GROUP button disabled", function () {
                var groupName="group_"+util.getRandomString(4);
                var groupDescription="groupDescription_"+util.getRandomString(234);
                var userDetails="user@example.com";
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickCreateNewGroup();
                foundationUsersPage.enterGroupName(groupName);
                logger.info("Total Entered Character Length of Group Name as:- ",groupName.length);
                foundationUsersPage.enterGroupDesc(groupDescription);
                logger.info("Total Entered Character Length of Group Description as:- ",groupDescription.length);
                expect(foundationUsersPage.getGroupDescErrorMsg(index)).toEqual(messageStrings.groupDescErrorMessage);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectRole();
                foundationUsersPage.selectListRole(util.getRandomNumber(1));
                foundationUsersPage.enterToSearchUsers(userDetails);
                browser.sleep(2000);
                foundationUsersPage.getNameAfterSearching();
                foundationUsersPage.getGroupDetailsAfterSearching();
                foundationUsersPage.clickOnAddAfterSearchingUser(userDetails);
                foundationUsersPage.checkCreateGroupButton();
                // foundationUsersPage.isGroupCreatedSuccessMessage(groupName);
        });

        it("Verify only 250 characters are allowed within the GROUP DESCRIPTION textfield", function () {
                var groupName="group_"+util.getRandomString(4);
                var groupDescription="groupDescription_"+util.getRandomString(233);
                var userDetails="user@example.com";
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickCreateNewGroup();
                foundationUsersPage.enterGroupName(groupName);
                logger.info("Total Entered Character Length of Group Name as:- ",groupName.length);
                foundationUsersPage.enterGroupDesc(groupDescription);
                logger.info("Total Entered Character Length of Group Description as:- ",groupDescription.length);
                // browser.sleep(5000);
                foundationUsersPage.clickSelectRole();
                foundationUsersPage.selectListRole(util.getRandomNumber(1));
                foundationUsersPage.enterToSearchUsers(userDetails);
                browser.sleep(2000);
                foundationUsersPage.getNameAfterSearching();
                foundationUsersPage.getGroupDetailsAfterSearching();
                foundationUsersPage.clickOnAddAfterSearchingUser(userDetails);
                foundationUsersPage.submitCreateGroup();
                foundationUsersPage.isGroupCreatedSuccessMessage(groupName);
        });


        xit("Manage Group Edit Functionality", function () {
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickEditGroup(2);

        });
        xit("Manage Group Delete Functionality", function () {
                foundationUsersPage.clickManageGroup();
                foundationUsersPage.clickDeleteGroup(2);
                foundationUsersPage.clickDelete();
        });


});