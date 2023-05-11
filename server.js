("use strict");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/sendmail", (req, res) => {
    main().catch(console.error);
    res.send("sent email");
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    /*
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,

        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },

        secure: false, // true for 465, false for other ports
        logger: true,
        debug: true,
        ignoreTLS: true,
    });
    */

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Mohiuddin" <mohiuddin.ice.ru@gmail.com>', // sender address
        to: "md.mohiuddin61@hotmail.com, manik.psychology@gmail.com", // list of receivers
        subject: "Testing Mail Sending", // Subject line
        html: "<b>Hello world? Hello mamu, kemon acho? Bazare jaba? Amar software theke ei email send korchi", // html body
    });

    console.log("Message sent: %s", info.messageId);
}

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
