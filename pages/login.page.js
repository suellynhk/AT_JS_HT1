const Page = require('./page');

class LoginPage extends Page {

    get inputUsername () {
        return $('//form/div[1]/div/div[2]/input');
    }

    get inputPassword () {
        return $('//form/div[2]/div/div[2]/input');
    }

    get btnSubmit () {
        return $('//form/div[3]/button');
    }

    open () {
        return super.open();
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }   
}

module.exports = new LoginPage();
