require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"mr.Tue Tran Cao 👻" <tuemeoptit@gmail.com>', // sender address
    to: dataSend.receiveEmail, // list of receivers
    subject: "Thông Tin Đặt Lịch Khám Bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "en") {
    result = `
            <h3>Dear ${dataSend.patientName} !</h3>
            <p>You received this email because you booked an online medical appointment on the mr TueTranCao</p>
            <p>Information to schedule an appointment :</p>
             <div><b>Time :${dataSend.time}</b></div>
             <div><b>Doctor :${dataSend.doctorName}</b></div>
             <p> If the above information is exactly , Please click on the link below to confirm 
                and completed the procedure to book an appointment!
             </p>
             <div><a href=${dataSend.redirectLink} target="_blank">->Click Here<-</a></div>
             <div>Thank You!</div>
        `;
  }
  if (dataSend.language === "vi") {
    result = `
            <h3>Xin Chào ${dataSend.patientName} !</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online qua mrTueTranCao</p>
            <p>Thông tin lịch khám bệnh của bạn đã đặt như sau :</p>
             <div><b>Thời Gian :${dataSend.time}</b></div>
             <div><b>Bác Sĩ :${dataSend.doctorName}</b></div>
             <p>Nếu Các Thông Tin Trên Đây Là Đúng sự Thật , Vui Lòng Click vào Đường Link Bên Dưới
              Để Xác Nhận Và Hoàn Tất Thủ Tục Đặt Lịch Khám Bệnh!
             </p>
             <div><a href=${dataSend.redirectLink} target="_blank">->Click Here<-</a></div>
             <div>Xin Cảm Ơn !</div>
        `;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"mr.Tue Tran Cao 👻" <tuemeoptit@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết Quả Đặt Lịch Khám Bệnh ✔", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imgBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "en") {
    result = `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>You received this email because you booked an online medical appointment on the mr TueTranCao</p>
             <div>Thank You!</div>
        `;
  }
  if (dataSend.language === "vi") {
    result = `
            <h3>Xin Chào ${dataSend.patientName} !</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh Thành Công</p>
            <p>Thông tin hóa đơn / đơn thuốc đã được gửi trong file đính kèm</p>
             <div> Xin Cảm Ơn !</div>
        `;
  }
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
