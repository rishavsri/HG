# Hypergiant UI Automation Framework
Repo for all the Hyperdrive ui automation. <br>
- [Pre Reqs](#pre-reqs)<br>
    - [Install Dependencies](#install-dependencies)<br>
- [Running Protractor Tests](#running-protractor-tests)<br>

## Pre Reqs <br>
### Install Dependencies:
1. Upgrade node to version 7 or grater. async and await functionality requires node 7 or greater<br>
2. Install the following package <br>
    **protractor** - To run all the tests. **```npm install -g protractor```**<br>
    **webdriver-manager** - To interact with browser. **npm install webdriver-manager**<br>
    **jasmine-reporters** - To report the test results. **```npm install jasmine-reporters```**<br>
    **xml2js** - To parse and read the jasmine report. **```npm install xml2js```** <br>
    **request** - To make api calls. **```npm install request```**<br>
    **request-promise** - To make slack webhook-api calls. **```npm install request-promise```**<br>
    **extend** - **```npm install extend```**<br>
    **protractor-html-reporter** - To generate html report **```npm install protractor-html-reporter```**<br>
    **npm install log4js** ---to install the log4j Module<br>
    **sudo npm install jasmine2-protractor-utils -g** ---to install the Jasmine UTIL<br>
3. Run ```npm list``` to make sure you can find all the above mention listed as a package. <br>
4. Check the java version in echo $JAVA_HOME it should say **8** .<br>
5. If required need change the path of java home in **.bash_profile** of mac or windows path.<br>

## Running Protractor Tests
1. Open terminal and run ```webdriver-manager update```<br>  
2. Once webdriver-manager is updated run ```webdriver-manager start```<br>
3. In a new terminal and go to hg-ui-automation directory.<br>
5. Run **```protractor <<Conf.js file name>> --params.url=<<test environment address> --params.username='xxx@xxx.com' --params.password='xxxxxxxx' ```** to kick off the tests.<br>

   e.g:- protractor hg-hyperdrive-conf.js
