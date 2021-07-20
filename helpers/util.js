/**
 * Helper functions used by different specs are defined in this class
 */
"use strict";

var logGenerator = require("./logGenerator.js"),
	logger = logGenerator.getApplicationLogger();
var now = new Date();
var jsonUtil = require('./jsonUtil.js');
var mkdirp = require('mkdirp');
var fs = require('fs');
var resLangCode;
function getCurrentURL() {
	browser.sleep(5000);
	return browser.getCurrentUrl().then(function (currentUrl) {
		logger.info("the current URL is = " + currentUrl)
		return currentUrl;
	})
}

// Format string
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
}

/**
 * Set size of browser window
 */
function setBrowserSize(width, height) {
	browser.manage().window().setSize(width, height);
}

/**
 * Maximize the browser window
 */
function maximizeBrowserSize(width, height) {
	browser.manage().window().maximize();
}

/**
 * This function Generates a random string which will be used to make any name (policy,content,identity,response or any other input)
 * unique
 */
function getRandomString(charLength) {
	var randomText = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	for (var i = 0; i < charLength; i++)
		randomText += possible.charAt(Math.floor(Math.random() * possible.length));
	return randomText;
}
function getRandomNumber(charLength) {
	var randomText = "";
	var possible = "0123456789";
	for (var i = 0; i < charLength; i++)
		randomText += possible.charAt(Math.floor(Math.random() * possible.length));
	return randomText;
}

/**
 * Returns a random integer between range [min, max] including both min and max
 * @param min - smallest integer of the range
 * @param max - largest integer of the range
 * @returns {*} - an integer between min and max (both inclusive)
 */
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(numberLength) {
	return Math.floor(Math.pow(10, numberLength - 1) + Math.random() * 9 * Math.pow(10, numberLength - 1));
}

// This function requires webelement as parameter and will take you that particular webelement on page
function scrollToWebElement(el) {
	return browser.executeScript('arguments[0].scrollIntoView(__zone_symbol__hashchangefalse)', el.getWebElement());
}

// Format string
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
}

// This function will scroll to bottom of page
function scrollToBottom() {
	return browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
}

function scrollToTop() {
	return browser.executeScript('window.scrollTo(0,0)');
}

// This Function is used to verify whether a String array is sorted based on 'ascending' or 'descending' passed value
function verifyStringSorting(el, sortValue) {
	return el.getText().then(function (name) {
		var sorted = [];
		for (var i = 0; i < name.length; i++) {
			if (name[i] != undefined && name[i] != '') {
				sorted.push(name[i].toLowerCase());
			}
		}
		if (sortValue == 'ascending') {
			for (var i = 0; i <= sorted.length - 2; i++) {
				if (sorted[i] > sorted[i + 1]) {
					return false;
				}
			}
		}
		if (sortValue == 'descending') {
			for (var i = 0; i <= sorted.length - 2; i++) {
				if (sorted[i] < sorted[i + 1]) {
					return false;
				}
			}
		}
		return true;
	})
}

// This Function is used to verify whether a String array is sorted based on 'ascending' or 'descending' passed value (With Attribute Name)
function verifyStringSortingWithAttrName(el, attrName, sortValue) {
	return el.getAttribute(attrName).then(function (name) {
		var sorted = [];
		for (var i = 0; i < name.length; i++) {
			if (name[i] != undefined && name[i] != '') {
				sorted.push(name[i].toLowerCase());
			}
		}
		if (sortValue == 'ascending') {
			for (var i = 0; i <= sorted.length - 2; i++) {
				if (sorted[i] > sorted[i + 1]) {
					return false;
				}
			}
		}
		if (sortValue == 'descending') {
			for (var i = 0; i <= sorted.length - 2; i++) {
				if (sorted[i] < sorted[i + 1]) {
					return false;
				}
			}
		}
		return true;
	})
}

// This Function is used to verify whether a Number array is sorted based on 'ascending' or 'descending' passed value
function verifyNumberSorting(el, sortValue) {
	return el.getText().then(function (order) {
		var neworder = [];
		for (var counter = 0; counter <= order.length - 1; counter++) {
			if (order[counter] != '-') {
				neworder.push(Number(order[counter]));
			}
		}
		if (sortValue == 'ascending') {
			for (var i = 0; i <= neworder.length - 1; i++) {
				if (neworder[i] > neworder[i + 1]) {
					return false;
				}
			}
		}
		if (sortValue == 'descending') {
			for (var i = 0; i <= neworder.length - 1; i++) {
				if (neworder[i] < neworder[i + 1]) {
					return false;
				}
			}
		}
		return true;
	});
}

function getbrowserType() {
	return browser.getCapabilities().then(function (cap) {
		return cap.get('browserName');
	});
}

function getOSType() {
	return browser.getCapabilities().then(function (cap) {
		return cap.get('platform');
	});
}

/**
 * This function returns current date time string in 'yyyy/mm/dd hh:mm UTC' format.
 */

function getCurrentDateTimeUTCFormat() {

	// new Date(value) has some problem in IE browser. Hence not running this code on IE
	return 0;

	if (browserType() == 'chrome') {
		var currentDateTime = new Date();
		var date = '' + (currentDateTime.getUTCDate());
		var month = '' + (currentDateTime.getUTCMonth() + 1);
		var year = currentDateTime.getUTCFullYear();
		var minutes = currentDateTime.getUTCMinutes();
		var hours = currentDateTime.getUTCHours();
		var seconds = currentDateTime.getUTCSeconds();

		if (month.length < 2) month = '0' + month;
		if (date.length < 2) date = '0' + date;
		logger.info(year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ' ' + 'UTC');
		return year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ' ' + 'UTC';

	}
	else {
		logger.info('Brower: Not chrome: skipping Modification time check');
		return 0
	}
}

/**
 * Returns the date of the previous day in JSON format
 * @returns {number}
 */
function getDatePreviousDay() {
	return now.toJSON(now.setHours((now.getHours() - 24)));
}

function getDatePreviousWeek() {
	return now.toJSON(now.setHours((now.getHours() - (24 * 7))));
}

function getDatePreviousMonth() {
	return now.toJSON(now.setMonth((now.getMonth() - 1)));
}

function getDatePreviousThreeMonths() {
	return now.toJSON(now.setMonth((now.getMonth() - 3)));
}

function getDatePreviousSixMonths() {
	return now.toJSON(now.setMonth((now.getMonth() - 6)));
}

function getDatePreviousYear() {
	return now.toJSON(now.setMonth((now.getMonth() - 12)));
}

// function waitForAngular() {
// 	var EC = protractor.ExpectedConditions;
// 	browser.waitForAngular();
// 	return element.all(by.css('.bx--loading__svg')).then(function (textArray) {
// 		for (var i = 0; i < textArray.length; i++) {
// 			browser.wait(EC.invisibilityOf(textArray[i]), 5 * 60 * 1000);
// 		}
// 	});
// }

function waitForAngular() {
	var EC = protractor.ExpectedConditions;
	//browser.waitForAngular();
	return element.all(by.css('.bx--loading__svg')).then(function (textArray) {
		for (var i = 0; i < textArray.length; i++) {
			browser.wait(EC.invisibilityOf(textArray[i]), 3 * 60 * 1000).then(function () {
			}).catch(function (err) {
				logger.info("Timeout-->Spinner is still loading after 3 mins");
			});
		}
		//Commenting below lines as there is no pint in waiting for spinner to finish loading after 5 mins
		// 		return waitForLoadingOverlay().then(function(){
		// 			return waitForCircleStrokeToDisappear().then(function(){
		// 				return waitForLoader();				
		// 			})
		// 		});
	});
}

function waitForAngularOnOrdersPage() {
	var EC = protractor.ExpectedConditions;
	//browser.waitForAngular();
	return element.all(by.css('.bx--loading__svg')).then(function (textArray) {
		for (var i = 0; i < textArray.length; i++) {
			browser.wait(EC.invisibilityOf(textArray[i]), 5 * 60 * 1000).then(function () {
			}).catch(function (err) {
				logger.info("Timeout-->Spinner is  loading after 5 mins");
				browser.refresh();
				browser.wait(EC.invisibilityOf(textArray[i]), 5 * 60 * 1000).then(function () {
				}).catch(function (err) {
					logger.info("Timeout-->Spinner is still loading after 5 mins");
				});
			});
		}
	});
}

function waitForCircleStrokeToDisappear() {
	var EC = protractor.ExpectedConditions;
	browser.waitForAngular();
	return element.all(by.css('.bx--loading__stroke')).then(function (textArray) {
		for (var i = 0; i < textArray.length; i++) {
			browser.wait(EC.invisibilityOf(textArray[i]), 5 * 60 * 1000).then(function () {
			}).catch(function (err) {
				logger.info("Timeout-->Circle stroke is still loading after 5 mins");
			});
		}
	});
}

function waitForLoader() {
	var EC = protractor.ExpectedConditions;
	return browser.wait(EC.invisibilityOf(element(by.css('div.loader'))), 300000);
}

function getLoggedInUserName(userName) {
	var str1 = username.replace("@", ",");
	var str2 = str1.replace(".com", " ");
	console.log(str2);
}

function getDropDownLabelIndexBasedOnName(jsonObject, labelName) {

	for (var index = 0; index < jsonObject.dropdownLabels.length; index++) {
		if (jsonObject.dropdownLabels[index].label == labelName) {
			logger.info('Index of ' + labelName + ' is: ' + index);
			return index;
		}
	}
}

function getTextInputLabelIndexBasedOnName(jsonFileObject, labelName) {
	var jsonObject = jsonFileObject;
	var paramLabelName = labelName;
	for (var i = 0; i < jsonObject.textinputdetails.length; i++) {
		if (jsonObject.textinputdetails[i].label == paramLabelName) {
			logger.info('Index of ' + paramLabelName + ' is: ' + i);
			return i;
		}
	}
}

function getRadioButtonLabelIndexBasedOnName(jsonFileObject, labelName) {
	var jsonObject = jsonFileObject;
	var paramLabelName = labelName;
	for (var i = 0; i < jsonObject.radioButtonLabels.length; i++) {
		if (jsonObject.radioButtonLabels[i].label == paramLabelName) {
			logger.info('Index of ' + paramLabelName + ' is: ' + i);
			return i;
		}
	}
}

function getAllWebElements() {
	browser.executeScript("return document.documentElement.innerText;").then(function (elements) {
		logger.info("Web Elements of the current page are: \n" + elements);
	});
}

function getPageSource() {
	return browser.getPageSource().then(function (txt) {
		logger.info("Page source of the current page is: \n" + txt);
	});
}

function generateRuntimeSpecString(suitesList) {
	var specArray = [];
	var suitesArray = suitesList.split(",");
	var suitesLength = suitesArray.length;
	
	for (var i = 0; i < suitesLength; i++) {

		// HG Specsfile
		if (suitesArray[i] == "Foundation_User")
			specArray.splice(i, 0, "e2e/specs/foundation/users.spec.js");
		if (suitesArray[i] == "Foundation_Credentials")
			specArray.splice(i, 0, "e2e/specs/foundation/credentials.spec.js");
		if (suitesArray[i] == "DataScience_Project")		
            specArray.splice(i, 0, "e2e/specs/dataScience/projects.spec.js");
		if (suitesArray[i] == "DataScience_Data")
		    specArray.splice(i, 0, "e2e/specs/dataScience/data.spec.js");	
		if (suitesArray[i] == "Datascience_Notebookserver")		
            specArray.splice(i, 0, "e2e/specs/dataScience/notebookserver.spec.js");
	}
	return specArray;
}

function cmpValues(jsonObject, locatorName, text) {

	var flag = false;
	var expValue;

	var fieldArr = locatorName.split("_");
	expValue = jsonUtil.getValue(jsonObject, fieldArr[0]);

	if (text == expValue) {
		logger.info("The value for " + fieldArr[0] + " is succesfully validated on User Management Details as :" + expValue);
		flag = true;
	}

	return flag;

}

function getPageSource(fileName) {
	var browserName;
	browser.getCapabilities().then(function (cap) {
		browserName = cap.get("browserName");
	});
	return browser.getPageSource().then(function (txt) {
		//	logger.info("Language Code on which suite running is  :"  +  resLangCode);
		if (browserName == "chrome") {
			var dir = "testreports/html/" + resLangCode;
			mkdirp(dir, function (err) {
				if (err) {
					logger.info("Error while creating the directory:" + resLangCode + ":" + err);
				}
				else
					logger.info("Directory created :" + resLangCode)
			});
			var outputfile = (dir + "/" + fileName + ".txt");
			fs.writeFile(outputfile, txt, function (err) {
				if (err) {
					logger.info("Error while writing to the file :" + err);
				}
				else {
					logger.info("HTML content of the page saved in folder :" + resLangCode);
				}
			});
			//logger.info("Page source of the current page is: \n" + txt);
		}
	});
}

function removeDir(dirPath) {
	try { var files = fs.readdirSync(dirPath); }
	catch (e) { return; }
	if (files.length > 0)
		for (var i = 0; i < files.length; i++) {
			var filePath = dirPath + '/' + files[i];
			if (fs.statSync(filePath).isFile())
				fs.unlinkSync(filePath);
			else
				removemDir(filePath);
		}
	fs.rmdirSync(dirPath);
};

//This function will return the date in 21 Aug 2019 format
function getCurrentMonthDateYear() {
	var dateObject = new Date();
	var date = dateObject.getDate();
	var year = dateObject.getFullYear();
	var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = monthName[dateObject.getMonth()];
	//logger.info("Month year date "+month+" "+date+" "+year);
	return date + " " + month + " " + year;
}

function getTodaysDate() {
	var dateObject = new Date();
	var date = dateObject.getDate();
	return date;
}

function getFullYearOfTodaysDate() {
	var dateObject = new Date();
	var year = dateObject.getFullYear();
	return year;
}

function getMonthOfCurrentYear() {
	var dateObject = new Date();
	var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var month = monthName[dateObject.getMonth()];
	return month;
}

function switchToFrame() {
	browser.switchTo().frame(element(by.tagName('iframe')).getWebElement());
	logger.info("Switched to iframe");
};

function switchToDefault() {
	browser.switchTo().defaultContent();
	logger.info("Switched to default content");
};

async function getUrl(url) {
	browser.executeScript("return !!(window.angular || window.ng);").then(function (isAngular) {
		if (isAngular) {
			browser.get(url);
			logger.info("Navigated to angular page " + url);
		}
		else {
			browser.driver.get(url);
			logger.info("Navigated to non angular page " + url);
		}
	});
}

function roundOffNumber(number) {
	var num = Math.round((number + Number.EPSILON) * 100) / 100;
	logger.info("Rounded off Number to :" + num);
	return num;
}

function getLongMonthOfCurrentYear() {
	var dateObject = new Date();
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = monthName[dateObject.getMonth()];
	return month;
}


function roundOffEstimatedPricing(actPrice, expPrice) {
	var priceExp = expPrice.split(" /Month")[0];
	priceExp = parseFloat(priceExp.replace("USD ", ""));
	priceExp = roundOffNumber(priceExp);

	var priceAct = actPrice.split(" /Month")[0];
	priceAct = parseFloat(priceAct.replace("USD ", ""));
	priceAct = roundOffNumber(priceAct);

	priceExp = "USD " + priceExp.toFixed(2) + " /Month + USD 0.00 one time charges apply"
	priceAct = "USD " + priceAct.toFixed(2) + " /Month + USD 0.00 one time charges apply"

	return [priceExp, priceAct];
}

function roundOffTotalCost(actPrice, expPrice) {
	var priceExp = parseFloat(expPrice.replace("USD ", ""));
	priceExp = roundOffNumber(priceExp);

	var priceAct = parseFloat(actPrice.replace("USD ", ""));
	priceAct = roundOffNumber(priceAct);

	priceExp = "USD " + priceExp.toFixed(2);
	priceAct = "USD " + priceAct.toFixed(2);

	return [priceExp, priceAct];
}

function switchToAlertIfPresent() {
	var EC = protractor.ExpectedConditions;
	browser.wait(EC.alertIsPresent(), 10000).then(function () {
		browser.switchTo().alert().accept().then(function () {
			logger.info("Switched to alert");
		})
	}).catch(function () {
		logger.info("Alert is not present");
	});
};

function switchToParentWindow() {
	browser.getAllWindowHandles().then(function (handles) {
		browser.switchTo().window(handles[0]).then(function () {
			logger.info("Switched to parent window");
		})
	})
};

function waitForLoadingOverlay() {
	var EC = protractor.ExpectedConditions;
	return element.all(by.css('.bx--loading-overlay')).then(function (textArray) {
		for (var i = 0; i < textArray.length; i++) {
			browser.wait(EC.invisibilityOf(textArray[i]), 5 * 60 * 1000).then(function () {
			}).catch(function (err) {
				logger.info("Timeout-->Loading Overlay is still loading after 5 mins");
			});
		}
	});
};

async function saveOrderId(serviceName, operationName, orderId) {
	var serviceInstance = {
		"service": {
			"operation": orderId
		}
	};

	serviceInstance["service"][operationName] = serviceInstance["service"]["operation"];
	delete serviceInstance["service"]["operation"];
	serviceInstance[serviceName] = serviceInstance["service"];
	delete serviceInstance["service"];

	var objData = serviceInstance[serviceName];
	var read_data = await readFile('./orderId.json');
	if (read_data == false) {
		logger.info('Unable to read data from orderId file, creating new.');
		var dataWrittenStatus = await writeFile('./orderId.json', serviceInstance);
	}
	else {
		if (read_data[serviceName] != undefined) {
			read_data[serviceName][operationName] = orderId;
		} else {
			read_data[serviceName] = objData;
		}
		var dataWrittenStatus = await writeFile('./orderId.json', read_data);
		if (dataWrittenStatus == true) {
			logger.info('order Id added successfully for operation ' + operationName);
		}
		else {
			logger.info('Unable to add order Id for operation ' + operationName);
		}
	}
};

async function readFile(filePath) {
	try {
		const data = await fs.promises.readFile(filePath, 'utf8');
		return JSON.parse(data)
	}
	catch (err) {
		return false;
	}
}

async function writeFile(filename, writedata) {
	try {
		await fs.promises.writeFile(filename, JSON.stringify(writedata, null, 4), 'utf8');
		return true
	}
	catch (err) {
		return false
	}
}

module.exports = {
	getCurrentURL: getCurrentURL,
	getRandomString: getRandomString,
	getRandomInteger: getRandomInteger,
	scrollToWebElement: scrollToWebElement,
	scrollToBottom: scrollToBottom,
	scrollToTop: scrollToTop,
	verifyStringSorting: verifyStringSorting,
	verifyStringSortingWithAttrName: verifyStringSortingWithAttrName,
	verifyNumberSorting: verifyNumberSorting,
	getbrowserType: getbrowserType,
	getCurrentDateTimeUTCFormat: getCurrentDateTimeUTCFormat,
	getOSType: getOSType,
	waitForAngular: waitForAngular,
	getLoggedInUserName: getLoggedInUserName,
	getRandomNumber: getRandomNumber,
	getDropDownLabelIndexBasedOnName: getDropDownLabelIndexBasedOnName,
	getTextInputLabelIndexBasedOnName: getTextInputLabelIndexBasedOnName,
	getRadioButtonLabelIndexBasedOnName: getRadioButtonLabelIndexBasedOnName,
	generateRuntimeSpecString: generateRuntimeSpecString,
	getDatePreviousDay: getDatePreviousDay,
	getDatePreviousWeek: getDatePreviousWeek,
	getDatePreviousMonth: getDatePreviousMonth,
	getDatePreviousThreeMonths: getDatePreviousThreeMonths,
	getDatePreviousSixMonths: getDatePreviousSixMonths,
	getDatePreviousYear: getDatePreviousYear,
	getAllWebElements: getAllWebElements,
	cmpValues: cmpValues,
	removeDir: removeDir,
	getPageSource: getPageSource,
	getCurrentMonthDateYear: getCurrentMonthDateYear,
	getTodaysDate: getTodaysDate,
	getFullYearOfTodaysDate: getFullYearOfTodaysDate,
	getMonthOfCurrentYear: getMonthOfCurrentYear,
	switchToFrame: switchToFrame,
	switchToDefault: switchToDefault,
	getUrl: getUrl,
	waitForLoader: waitForLoader,
	roundOffNumber: roundOffNumber,
	setBrowserSize: setBrowserSize,
	maximizeBrowserSize: maximizeBrowserSize,
	waitForCircleStrokeToDisappear: waitForCircleStrokeToDisappear,
	getLongMonthOfCurrentYear: getLongMonthOfCurrentYear,
	roundOffEstimatedPricing: roundOffEstimatedPricing,
	roundOffTotalCost: roundOffTotalCost,
	switchToAlertIfPresent: switchToAlertIfPresent,
	switchToParentWindow: switchToParentWindow,
	waitForLoadingOverlay: waitForLoadingOverlay,
	saveOrderId: saveOrderId,
	readFile: readFile,
	writeFile: writeFile,
	waitForAngularOnOrdersPage: waitForAngularOnOrdersPage
};
