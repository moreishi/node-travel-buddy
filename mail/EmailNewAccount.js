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
        host: 'smtp.mailtrap.io',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'd2b35e743d6908', // generated ethereal user
            pass: '3815a8d0549fc4' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${config.get('mail.support.name')} <${config.get('mail.support.email')}>`, // sender address
        to: this.to, // list of receivers
        subject: this.subject, // Subject line
        html: `<b>${this.message}</b>` // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions);

    console.log('Message Sent!');

}

module.exports = Mail;