/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    async open (path) {
        return browser.url(`https://opensource-demo.orangehrmlive.com/web/index.php${path}`);
   }
}
