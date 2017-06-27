var database = require('../config/shophere.db');
var jwt = require('jsonwebtoken');
var conf = require('../config/shophere.config');
var passwordHash = require('password-hash');
var mailerTransporter = require('../config/shophere.mailer');

module.exports.addUser = function(req, res) {
    console.log('controller is called');
    var db = database.get().collection('users');
    var user = {};
    user.username = req.body.username;
    user.password = passwordHash.generate(req.body.password);

    /*
		var passwordHash = require('./lib/password-hash');
		var hashedPassword = passwordHash.generate('password123');
    	var hashedPassword = 'sha1$3I7HRwy7$cbfdac6008f9cab4083784cbd1874f76618d2a97';
    	console.log(passwordHash.verify('password123', hashedPassword)); // true
    	console.log(passwordHash.verify('Password0', hashedPassword)); // false
	*/

    db.findOne({
        username: req.body.username
    }, function(err, result) {
        if (err) {
            throw err;
        } else {
            if (result) {
                res.json({
                    "Message": "User already exist"
                });
            } else {
                var token = jwt.sign(user, conf.secret, {
                    expiresIn: '1h'
                });
                user.token = token;
                user.emailId = req.body.emailId;
                user.dateOfBirth = req.body.dateOfBirth;
                user.gender = req.body.gender;
                user.mobileNumber = req.body.mobileNumber;
                user.isAdmin = req.body.isAdmin;
                db.insert(user, function(err, result) {
                    if (err) {
                        throw err;
                    } else {
                        var mailOptions = {
                            from: '"Rishabh Tiwari "' + conf.adminEmailId, // sender address
                            to: user.emailId, // list of receivers
                            subject: 'Shophere : Registration Confirmation from Shophere', // Subject line
                            html: '<h3>Hello ' + user.username + '</h3></br><b>Congratulation for successfully registration on Shophere</b>' // html body
                        };
                        mailerTransporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                return console.log(error);
                            }
                            res.json({
                                "Message": "Registered successfully",
                                "username": req.body.username,
                                "isAdmin": req.body.isAdmin,
                                "emailId": req.body.emailId,
                                "dob": req.body.dateOfBirth,
                                "Gender": req.body.gender,
                                "token": token
                            });
                        });
                    }
                });
            }

        }
    });


    /*var col2 = database.get().createCollection('pagal');*/
}