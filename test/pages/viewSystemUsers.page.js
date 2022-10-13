const Page = require('./page');

class ViewSystemUsers extends Page {

    get btnSearch() {
        return $('.oxd-button.oxd-button--medium.oxd-button--secondary');
    }

    get btnReset() {
        return $('.oxd-button--ghost');
    }

    get usersGrid() {
        return $('.oxd-table');
    }
    
    get searchResult() {
        return $('.orangehrm-horizontal-padding .oxd-text--span');
    }

    get inputSearchUsername(){
        return $('.oxd-form-row .oxd-input');
    }
    
    async waitAndClick(button) {
        await button.waitForDisplayed({timeout: 5000});
        await button.click();
    }


    async clickDeleteButton(){
        const btnDelete= await $('.orangehrm-horizontal-padding .oxd-button--label-danger');
        await btnDelete.scrollIntoView(false);
        await btnDelete.click();
    }

    async searchIntoGrid(username){
        const userList = await this.usersGrid.$$('.oxd-table-card');
        userList.forEach(async (card, index)=> {
            const userText = await card.$('.oxd-table-row .oxd-table-cell:nth-child(2) div').getText();
            console.log(userText);
            if(userText === username){
                let checkbox = await card.$(`input[value="${index}"]`).parentElement();
                await checkbox.scrollIntoView();
                await checkbox.click();
            }
        });
    }

    open() {
        return super.open('/admin/viewSystemUsers');
    }
}

module.exports = new ViewSystemUsers();