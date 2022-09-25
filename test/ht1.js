const LoginPage = require('../pages/login.page');
const EmployeePage = require ('../pages/employee.page');
const UserManagementPage= require('../pages/user-management.page');
const SuccessToast = require('../pages/modal/success-toast');
const ConfirmationOverlay = require('../pages/modal/confirmation-overlay');

describe('Login validation', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await browser.pause(1000);
        await LoginPage.login('Admin', 'admin123');

        const image = await $('img.oxd-userdropdown-img');
        await expect(image).toBeDisplayed();
    });
});


describe('Go to user management section', () => {
    it('shoud go to user management section', async () => {
        await EmployeePage.addNewUser(); 

        const h6Element= await $('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/h6');
        await h6Element.waitForDisplayed();
        await expect(h6Element).toHaveTextContaining('Add User');
    });
});


describe('Add new ESS user', () =>{
    it('should add new ESS user', async () => {
        const userRole = 'ESS';
        await UserManagementPage.setUserRole(userRole);

        const employeeName = await $('p.oxd-userdropdown-name').getText();
        await UserManagementPage.setEmployeeName(employeeName);
        
        const status = 'Enabled';  
        await UserManagementPage.setStatus(status);

        const username = 'Suellyn.Lamann';
        await UserManagementPage.setUsername(username);  

        const password = 'Abc123!@#';
        await UserManagementPage.setPassword(password);
        await UserManagementPage.confirmPassword(password);
        await browser.pause(1000);
        await UserManagementPage.clickSaveButton();
        await browser.pause(4000);
    });
});


describe('Verify if user has been added', () =>{
    it('should check if user has been added', async () => {
        const inputUsername = await $('//form[@class="oxd-form"]/div[1]/div/div[1]/div/div[2]/input');    
        await inputUsername.setValue('Suellyn.Lamann');

        await UserManagementPage.clickSearchButton();
        await browser.pause(3000);

        const result = await $('div.orangehrm-horizontal-padding > span');
        await result.waitForDisplayed();
        await expect(result).toHaveText('(1) Record Found');
        await browser.pause(1000);
    });
});


describe('Check if new user appears in the grid', () =>{
    it('should check if user appears in the grid', async () => {
        await UserManagementPage.clickResetButton();
        await browser.pause(2000);
        UserManagementPage.searchIntoGrid('Suellyn.Lamann');
        await browser.pause(4000);
    });
});


describe('Delete selected user', () =>{
    it('should delete selected user', async () => {
        await UserManagementPage.clickDeleteButton();
        await ConfirmationOverlay.yesDelete();
        await browser.pause(2000);
        await expect(SuccessToast.successToast).toBeDisplayed();
        await browser.pause(2000);
    });
});


describe('Check if used has been deleted', () =>{
    it('should check if user was deleted', async () => {
        const inputUsername = await $('//form[@class="oxd-form"]/div[1]/div/div[1]/div/div[2]/input');    
        await inputUsername.setValue('Suellyn.Lamann');

        await UserManagementPage.clickSearchButton();
        await browser.pause(3000);

        const result = await $('div.orangehrm-horizontal-padding > span');
        await result.waitForDisplayed();
        await expect(result).toHaveText('No Records Found');
        await browser.pause(1000);
    });
});

