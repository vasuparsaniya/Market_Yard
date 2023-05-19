var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var databaseUrl = 'mongodb://localhost:27017/market_yard';
var collections1 = ['registration'];
var collections2 = ['users'];

var mongojs = require('mongojs');
var db1 = mongojs(databaseUrl, collections1);
var db2 = mongojs(databaseUrl, collections2);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// Enable CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', function (req, res) {
    res.render('index.html');
});

// REST service
// app.get('/getUsers', function (req, res) {
//     db.registration.find('', function (err, users) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(users);
//         }
//     });
// });

app.post('/insertUser', function (req, res) {
    var jsonData = req.body;
    db1.registration.save({ name: jsonData.name, role: jsonData.role, gender: jsonData.gender, crop: jsonData.crop, date: jsonData.date, phone: jsonData.phone, email: jsonData.email, }, function (err, saved) {
        if (err) {
            console.log(err);
        } else {
            res.end('User saved');
        }
    });
});

// app.put('/updateUser', function (req, res) {
//     var jsonData = req.body;
//     var ObjectId = mongojs.ObjectId;

//     db.things.update(
//         { _id: ObjectId(jsonData._id) },
//         { $set: { username: jsonData.username, password: jsonData.password, email: jsonData.email } },
//         function (err, saved) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.end('User updated');
//             }
//         }
//     );
// });

app.post('/login', function (req, res) {
    var jsonData = req.body;

    // Assuming you have a MongoDB collection named 'users'
    db2.users.findOne({ email: jsonData.email }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!user) {
            // User not found
            console.log("User not found")
            res.status(404).send('User not found');
            return;
        }

        if (user.password !== jsonData.password) {
            // Incorrect password
            res.status(401).send('Incorrect password');
            return;
        }

        // Successful login
        res.send('Successfully Login');
    });
});


app.post('/signup', function (req, res) {
    var jsonData = req.body;

    // Assuming you have a MongoDB collection named 'users'
    db2.users.findOne({ email: jsonData.email, password: jsonData.password }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (user) {
            // User already exists
            res.status(409).send('User already exists');
            return;
        }

        // Create a new user document
        var newUser = {
            email: jsonData.email,
            password: jsonData.password
        };

        // Save the new user
        db2.users.insert(newUser, function (err, saved) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log("User successfully signup");
            // Successful signup
            res.send('User registered successfully');
        });
    });
});


//--------------forgotpassword----------------------------------
app.post('/forgotpassword', function (req, res) {
    var jsonData = req.body;

    // Assuming you have a MongoDB collection named 'users'
    db2.users.findOne({ email: jsonData.email, password: jsonData.password }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (!user) {
            // User does not exist
            res.status(404).send('User not found');
            return;
        }

        // Generate a new password
        var newPassword = generateNewPassword();

        // Update the user's password
        db2.users.updateOne({ email: user.email }, { $set: { password: newPassword } }, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Send the new password to the user (e.g., via email)
            sendPasswordEmail(user.email, newPassword);

            // Password reset successful
            res.send('Password reset successful. Please check your email for the new password.');
        });
    });
});

function generateNewPassword() {
    // Generate a new random password
    // Implement your logic here to generate a secure password
    // For simplicity, let's assume a random 8-character alphanumeric password
    var newPassword = Math.random().toString(36).slice(-8);
    return newPassword;
}

function sendPasswordEmail(email, newPassword) {
    // Implement your logic here to send an email containing the new password to the user
    // You can use a library like nodemailer to send emails
    // Example code:
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.google.email',
        // host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'vasuparsaniya21@gmail.com',
            pass: 'vwkwjanzdtbdorae'
        }
    });

    // Configure your email transport
    const mailOptions = {
        from: 'vasuparsaniya21@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: 'Your new password: ' + newPassword
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.listen(8080, function () {
    console.log('Server listening on port 8080');
});
