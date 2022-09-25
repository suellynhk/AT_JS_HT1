class ConfirmationOverlay {
    get yesBtn(){
        return $('//*[@id="app"]/div[3]/div/div/div/div[3]/button[2]');
    }

    get cancelBtn(){
        return $('//*[@id="app"]/div[3]/div/div/div/div[3]/button[1]');
    }

    async yesDelete(){
        await this.yesBtn.click();
    }

    async cancelDelete(){
        await this.cancelBtn.click();
    }
}

module.exports = new ConfirmationOverlay();