const NewUser = require('../constants/new-user');
const ValidLogin = require('../constants/valid-login');
const LoginPage = require('../pages/login.page.js');
const ViewEmployeeList = require('../pages/viewEmployeeList.page');
const SaveSystemUser = require('../pages/saveSystemUser.page');
const ViewSystemUsers = require('../pages/viewSystemUsers.page');
const Toast = require('../pages/modal/toast');
const ConfirmationOverlay = require('../pages/modal/confirmation-overlay');


describe('Login validation', () => {
    it('should open and load /login page', async () => {
        await LoginPage.open(); 
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            { timeout: 5000, timeoutMsg: 'Failed on load login page'}
        ); 
    });

    it('should login with valid credentials', async () => {
        await browser.setTimeout({'implicit': 5000});
        await LoginPage.login(ValidLogin.VALID_USERNAME, ValidLogin.VALID_PASSWORD);
        await expect(ViewEmployeeList.userImage).toBeDisplayed();
    });

    it('shoud click Admin> UserManagementPage> Users> Add (go to /saveSystemUser page)', async () => {
        await ViewEmployeeList.goToSaveSystemUser();
        await expect(SaveSystemUser.btnSave).toBeDisplayed();
    });
});

describe('Add new ESS user', () => {
    it('should fill in new user form ', async () => {
        await SaveSystemUser.setAnOption( SaveSystemUser.inputUserRole, NewUser.ESS_ROLE); 
        await SaveSystemUser.setEmployeeName(SaveSystemUser.inputEmployeeName); 
        await SaveSystemUser.setAnOption(SaveSystemUser.inputStatus, NewUser.ENABLED_STATUS);
        await SaveSystemUser.setInputValue(SaveSystemUser.inputUsername, NewUser.USERNAME);
        await SaveSystemUser.setInputValue(SaveSystemUser.inputPassword, NewUser.PASSWORD);
        await SaveSystemUser.setInputValue(SaveSystemUser.inputConfirmPassword, NewUser.PASSWORD);

        await browser.waitUntil( 
            async () => await SaveSystemUser.btnSave.isClickable(),
            { timeout: 5000 }
        );
        
        await SaveSystemUser.btnSave.click();
    });

   
});

describe('Verify if user has been added', () =>{
    it('should search user by username', async () => { 
        await browser.waitUntil( 
            async () => await ViewSystemUsers.inputSearchUsername.isDisplayed(),
            { timeout: 5000 }
        );
        await ViewSystemUsers.inputSearchUsername.setValue(NewUser.USERNAME);
        await ViewSystemUsers.btnSearch.click();
    });

    it('should find the user', async () => { 
        await ViewSystemUsers.searchResult.waitForDisplayed({timeout: 5000});
        await expect(ViewSystemUsers.searchResult).toHaveText('(1) Record Found');
    });
});

describe('Check if new user appears in the list of all users (grid) and select it ', () =>{
    it('shoud click on Reset button to clean all inputs and return the list of all users', async () => {
        await ViewSystemUsers.waitAndClick(ViewSystemUsers.btnReset);
        await expect(ViewSystemUsers.usersGrid).toBeDisplayed();
    });

    it('should check if user appears in the list (grid) and select/check it ', async () => {
        await ViewSystemUsers.searchIntoGrid(NewUser.USERNAME);
    });
});

describe('Delete selected user', () =>{
    it('should delete selected user', async () => {
        await ViewSystemUsers.clickDeleteButton();
        await ConfirmationOverlay.yesDelete();
        await expect(Toast.successToast).toBeDisplayed();
    });
});

describe('Check if user has been deleted', () =>{
    it('should search user by username', async () => {
        await ViewSystemUsers.inputSearchUsername.setValue(NewUser.USERNAME);
        await ViewSystemUsers.waitAndClick(ViewSystemUsers.btnSearch);
    });

    it('should not find the user', async () => {
        await ViewSystemUsers.searchResult.waitForDisplayed({timeout: 5000});
        await expect(ViewSystemUsers.searchResult).toHaveText('No Records Found');
    });
});



