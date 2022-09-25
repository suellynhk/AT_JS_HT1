class EmployeePage {

    get adminSection () {
        return $('div.oxd-sidepanel-body > ul > li:nth-child(1) > a');
    }

    get userManagementOptions () {
        return $('ul > li.oxd-topbar-body-nav-tab.--parent.--visited > span');
    }

    get usersOption () {
        return $('ul > li.--active.oxd-topbar-body-nav-tab.--parent.--visited > ul > li > a');
    }

    get addButton () {
        return $('div.orangehrm-header-container > button');
    }

    async addNewUser(){
        await this.adminSection.click();
        await this.userManagementOptions.click();
        await browser.pause(1000);
        await this.usersOption.click();
        await this.addButton.click();
    }

}

module.exports = new EmployeePage();