// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   secure:true,
//   secureConnection: false,
//   tls: {
//    ciphers: "SSLv3",
//   },
//   requireTLS: true,
//   port: parseInt(process.env.MAIL_PORT),
//   secure: process.env.MAIL_PORT == 465, 
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// transporter.verify((error) => {
//   if (error) {
//     console.error('SMTP connection failed:', error.message);
//   } else {
//     console.log(`SMTP ready: ${process.env.MAIL_USER} via ${process.env.MAIL_HOST}:${process.env.MAIL_PORT}`);
//   }
// });

// module.exports = transporter;

// module.exports = transporter;

const nodemailer = require('nodemailer');

const isEmailActive = process.env.ACTIVATE_EMAIL === 'true';

let transporter = {
  sendMail: async () => {
    console.log('Email disabled. Skipping sendMail.');
  },
};

if (isEmailActive) {
  transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: Number(process.env.NODEMAILER_PORT),
    secure: Number(process.env.NODEMAILER_PORT) === 465,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error('SMTP connection failed:', error.message);
    } else {
      console.log('SMTP server is ready');
    }
  });
}

module.exports = transporter;