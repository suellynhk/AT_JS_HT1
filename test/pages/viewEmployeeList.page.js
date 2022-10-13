const Page = require('./page');

class ViewEmployeeList extends Page {
    get userImage() {
        return $('.oxd-userdropdown-img');
    }
    
    get adminSection () {
        return $('.oxd-sidepanel a.oxd-main-menu-item[href*="AdminModule"]');
    }

    get userManagementOptions () {
        return $('span.oxd-topbar-body-nav-tab-item*=User Management ');
    }

    get usersOption () {
        return $('a*=Users');
    }

    get addButton () {
        return $('div.orangehrm-header-container button.oxd-button');
    }

    async goToSaveSystemUser(){
        await this.adminSection.click();
        await this.userManagementOptions.click();
        await this.usersOption.waitForDisplayed();
        await this.usersOption.click();
        await this.addButton.click();
    }

    open() {
        return super.open('/pim/viewEmployeeList');
    }

}

module.exports = new ViewEmployeeList();