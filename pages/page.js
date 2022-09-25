/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    async open () {
        await browser.url('https://opensource-demo.orangehrmlive.com');
        await browser.maximizeWindow();
   }
}
