const Page = require('./page');

class LoginPage extends Page {

    get inputUsername () {
        return $('.oxd-input[name="username"]');
    }

    get inputPassword () {
        return $('.oxd-input[name="password"]');
    }

    get userImage(){
        return $('img.oxd-userdropdown-img');
    }

    get btnSubmit () {
        return $('button.orangehrm-login-button');
    }

    open() {
        return super.open('/auth/login');
    }

    async login (username, password) { 
        await browser.setTimeout({'implicit': 5000});
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }   
}

module.exports = new LoginPage();
