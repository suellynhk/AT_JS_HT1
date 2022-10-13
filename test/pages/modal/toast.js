class Toast {
    get successToast(){
        return $('div.oxd-toast-content.oxd-toast-content--success');
    }
}

module.exports = new Toast();