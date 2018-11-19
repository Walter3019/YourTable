const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

module.exports = {
    transporter: () => {
        // return nodemailer.createTransport({
        //     host: 'smtp.gmail.com',
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         type: 'OAuth2',
        //         user: 'menglingchen3019@gmail.com',
        //         clientId: '',
        //         clientSecret: '',
        //         refreshToken: '',
        //         accessToken: ''
        //     }
        // });

        return nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "**********@gmail.com", // your email 
                pass: "********" // your password
            }
        });
    
    }
};

