import nodemailer from 'nodemailer';
 
export const sendEmail = async({email,subject,message}) => {
    let transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host:process.env.SMTP_HOST,
  port:process.env.SMTP_PORT,
  
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

let mailOptions = {
  from: process.env.SMTP_MAIL,
  to: email,
  subject: subject,
  text: message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}