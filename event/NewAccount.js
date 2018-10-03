const config = require('config');
const EmailNewAccount = require('../mail/EmailNewAccount');

function NewAccount(user) {
    this.user = user;
}

NewAccount.prototype.trigger = function() {
    const sendMessage = new EmailNewAccount(this.user);
          sendMessage.setSubject(`Welcome to ${config.get('APP_NAME')}`);
          sendMessage.setMessage('This is a generated email welcome message...');
          sendMessage.send();
}


module.exports = NewAccount;