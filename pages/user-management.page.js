class UserManagementPage {

    get inputUserRole() {
        return $('//form[@class= "oxd-form"]/div[1]/div/div[1]/div/div[2]/div');
    }

    get inputName() {
        return $('//form[@class= "oxd-form"]/div[1]/div/div[2]/div/div[2]/div/div[1]/input');
    }

    get inputStatus() {
        return $('//form[@class= "oxd-form"]/div[1]/div/div[3]/div/div[2]/div/div');
    }

    get inputUsername() {
        return $('//form[@class= "oxd-form"]/div[1]/div/div[4]/div/div[2]/input');
    }

    get inputPassword() {
        return $('//form[@class= "oxd-form"]/div[2]/div/div[1]/div/div[2]/input');
    }

    get inputConfirmPassword() {
        return $('//form[@class= "oxd-form"]/div[2]/div/div[2]/div/div[2]/input');
    }

    get btnSave() {
        return $('//form/div[3]/button[2]');
    }

    get btnSearch(){
        return $('//form/div[2]/button[@type="submit"]');
    }

    get btnReset(){
        return $('//form/div[2]/button[@type="button"]');
    }

    get btnDelete(){
        return $('div.orangehrm-paper-container > div:nth-child(2) > div > div > button');
    }

    get usersGrid() {
        return $('div.oxd-table');
    }

    async selectEmployeeName(input, name){
        await input.click();
        const beginningName = name.slice(0, 5);
        await input.setValue(beginningName);
        await browser.pause(3000);
        await $('//div[@role="option"][1]').click();
    }
       
    async setAnOption(input, option){
        await input.click();
        const optionsList = await input.$$('//div[@role="option"]/span');
        optionsList.forEach(async (item) => {
            const aux = await item.getText();
            console.log(aux);
            if( aux === option ){
                await item.click();
            }
        });
    }

    async setUserRole(role) {
        await this.setAnOption(this.inputUserRole, role);
    }

    async setEmployeeName(employee) {
         await this.selectEmployeeName(this.inputName, employee);
    }

    async setStatus(stt) {
        await this.setAnOption(this.inputStatus,stt);
    }

    async setUsername(user) {
        await this.inputUsername.setValue(user);
    }

    async setPassword(pwd) {
        await this.inputPassword.setValue(pwd);
    }

    async confirmPassword(pwd) {
        await this.inputConfirmPassword.setValue(pwd);
    }

    async clickSaveButton(){
        await this.btnSave.click();
    }

    async clickSearchButton(){
        await this.btnSearch.click();
    }
    
    async clickResetButton(){
        await this.btnReset.click();
    }

    async clickDeleteButton(){
        await this.btnDelete.scrollIntoView(false);
        await this.btnDelete.click();
    }

    async searchIntoGrid(username){
        const userList = await this.usersGrid.$$('div.oxd-table-card');
        userList.forEach(async (card, index)=> {
            const userText = await card.$('div.oxd-table-body > div.oxd-table-card > div > div:nth-child(2) > div').getText();
            console.log(userText);
            if(userText === username){
                let checkbox = await card.$(`input[value="${index}"]`).parentElement();
                await checkbox.scrollIntoView();
                await checkbox.click();
            }
        });
    }
}

module.exports = new UserManagementPage();  