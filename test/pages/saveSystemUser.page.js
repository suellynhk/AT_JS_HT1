const Page = require('./page');

class SaveSystemUser extends Page {

    get inputUserRole() {
        return $('.oxd-select-wrapper .oxd-select-text .oxd-select-text-input');
    }

    get inputEmployeeName() {
        return $('.oxd-grid-item--gutters .oxd-autocomplete-wrapper input');
    }

    get employeeName() {
        return $('.oxd-topbar .oxd-userdropdown-name');
    }

    get inputStatus() {
        return $('.oxd-grid-2 .oxd-grid-item:nth-child(3) .oxd-select-wrapper .oxd-select-text');
    }

    get inputUsername() {
        return $('.oxd-grid-item--gutters:nth-child(4) .oxd-input');
    }

    get inputPassword() {
        return $('.oxd-form-row.user-password-row .oxd-grid-item .oxd-input');
    }

    get inputConfirmPassword() {
        return $('.oxd-form-row.user-password-row .oxd-grid-item:nth-child(2) .oxd-input');
    }

    get btnSave() {
        return $('.oxd-button--secondary');
    }

    get autocompleteOption() {
        return $('.oxd-autocomplete-dropdown .oxd-autocomplete-option span');
    }


    async setEmployeeName(input){
        const name = await this.employeeName.getText();
        const beginningName = name.slice(0, 4);
        await input.setValue(beginningName);
        await this.autocompleteOption.click();  
    } 
     
    async setAnOption(input, option){
        await input.click();
        const optionsList = await $$('.oxd-select-option span');
        for(let i = 0; i < optionsList.length; i++){
            const item = optionsList[i];
            const itemText = await item.getText();
            if( itemText === option ){
                await item.click();
                break;
            } 
        }

        await browser.waitUntil( 
            async () => (await input.getText()) === option,
            { timeout: 5000, timeoutMsg: `Input should have ${option} value`}
        );
    }

    async setInputValue(input, value) {
        await input.setValue(value);
    }
    
    open() {
        return super.open('/admin/saveSystemUser');
    }
}

module.exports = new SaveSystemUser();  