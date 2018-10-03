const config = require('config');
const nodemailer = require('nodemailer');

function Mail(user) {
    this.user     = user;
    this.name     = user.name;
    this.to       = user.email;
    this.from     = config.get('SUPPORT_EMAIL');
    this.reply    = config.get('NOREPLY_EMAIL');
    this.subject  = null;
    this.message  = null;
    
    this.host           = config.get('mail.smtp.host');
    this.port           = config.get('mail.smtp.port');
    this.username       = config.get('mail.smtp.auth.username');
    this.password       = config.get('mail.smtp.auth.password');

    this.supp_name      = config.get('mail.support.name');
    this.supp_email     = config.get('mail.support.email');

}

Mail.prototype.setMessage = function(message) {
    this.message = message;
}

Mail.prototype.setSubject = function(subject) {
    this.subject = subject;
}

Mail.prototype.send = async function() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
        secure: false, // true for 465, false for other ports
        auth: {
            user: this.username, // generated ethereal user
            pass: this.password // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${this.supp_name} <${this.supp_email}>`, // sender address
        to: this.to, // list of receivers
        subject: this.subject, // Subject line
        html: `<b>${this.message}</b>` // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
    
}

module.exports = Mail;