const nodemailer = require("nodemailer");

const mailSender = async (email,title,body) => {
  try{
    // crate transporter
    let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })

    // given info to  where to send to mail and also whose recieve the mail and all about data given  
    let info = await transporter.sendMail({
      from:'StudyNotion || Rahul-Dwivedi',
      to:email,
      subject:title,
      html:body,
    })

    console.log(info);
    return info;
  }
  catch(error){
    console.error(error);
  }
}

module.exports = mailSender;
