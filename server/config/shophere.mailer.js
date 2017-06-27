var nodemailer = require('nodemailer');
var conf = require('./shophere.config');
var transporter = nodemailer.createTransport('smtps://'+conf.adminEmailId+':'+conf.password+'@smtp.gmail.com');
module.exports = transporter;