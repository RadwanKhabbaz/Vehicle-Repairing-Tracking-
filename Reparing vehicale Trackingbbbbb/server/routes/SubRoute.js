

'use strict';

var express = require("express");
var SubsRoute = express.Router();
var Subs = require("../models/Subscribe.js");

const nodemailer = require('nodemailer');
//const nodemailer=require('nodemailer');




/* eslint no-console: 0 */






// Create a SMTP transporter object




SubsRoute.get("/", function (req, res) {
    console.log("helloooo");
    Subs.find({}, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
                "message": "sucess",
                data: data
            })
        }
    });






});


SubsRoute.post("/", function (req, res) {
    Subs.find({}, function (err, data) {

        var newSubs = new Subs(req.body);
        console.log("re.body",req.body);
        newSubs.save(function (er, data) {
            if (er) {
                res.status(500).send({
                    "message": "internal error"
                });
            } else {
                res.status(200).send({
                    "message": "you successfuly Registired Data"
                })
            }
        }).then(function () {
            console.log("New email in Sub Rout",newSubs.Emaile);

            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtpout.secureserver.net',
                port: 465,


                auth: {
                    user: 'vschoolofbeirut@gmail.com',
                    pass:  'vschool2017@@'
                },
                secure: true,
                debug: true // include SMTP traffic in the logs
            }, {
                // default message fields  Moussaab Akoum <moussaab.akoum@gmail.com>'

                // sender info
                from: 'Vschool Of Beirut Vschool <vschoolofbeirut@gmail.com>',
                headers: {
                    'X-Laziness-level': 1000 // just an example header, no need to use this
                }
            });

            console.log('SMTP Configured');

// Message object
            let message = {

                // Comma separated list of recipients
                to: '<'+newSubs.Emaile+'>',

                // Subject of the message
                subject: 'Thank you for subscribing to our V school Site ', //

                // plaintext body
                text: 'Hello to myself!',

                // HTML body
                html: '<p><b>Hello</b>' +
                '<p>Welcome to Vschool<br/>',

                // Apple Watch specific HTML body
                watchHtml: '<b>Hello</b>',

                // An array of attachments

            };

            console.log('Sending Mail');
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    return;
                }
                console.log('Message sent successfully!');
                console.log('Server responded with "%s"', info.response);
//transporter.close();
            });



        });

    });
});



SubsRoute.delete("/:id", function (req, res) {
    Subs.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            data.remove();
            res.status(200).send("data deleted Successfully");
        }
    })
});






/*
teacherRoute.put("/:id", function (req, res) {
    Teachers.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            for (key in req.query) {
                data[key] = req.query[key];
            }
            data.save();
            res.status(200).send("data updated Successfully");
        }
    })
});
teacherRoute.delete("/:id", function (req, res) {
    Teachers.findOne({
        _id: req.params.id
    }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            data.remove();
            res.status(200).send("data deleted Successfully");
        }
    })
});
*/
module.exports = SubsRoute;
