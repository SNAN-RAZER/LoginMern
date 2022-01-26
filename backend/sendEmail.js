const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail=({to,from,subject,text,html})=>{
    const msg={to,from,subject,text,html};
    return sgMail.send(msg);
}
module.exports={sendEmail:sendEmail};