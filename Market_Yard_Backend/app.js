var http = require('http');
var express = require('express');

var app = express();
// var databaseUrl = 'mongodb+srv://vasuparsaniya21:vasu123@cluster.mznvtrt.mongodb.net/market_yard';
var databaseUrl = 'mongodb://localhost:27017/market_yard';
var collections = ['farmer', 'users', 'retailer', 'bookSlot'];

const uuid = require('uuid');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const fs = require('fs');

const nodemailer = require('nodemailer');



var mongojs = require('mongojs');
var db = mongojs(databaseUrl, collections);
// var db2 = mongojs(databaseUrl, collections2);

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
app.get('/getReatiler', function (req, res) {
    db.retailer.find('', function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

app.get('/getRetailer/:user_id', function (req, res) {
    var userId = req.params.user_id;
    db.retailer.findOne({ _id: mongojs.ObjectId(userId) }, function (err, retailer) {
        if (err) {
            console.log(err);
        } else {
            console.log(retailer);
            res.json(retailer);
        }
    });
});





//---------------------farmer-------------------------------------
app.post('/insertFarmer', function (req, res) {
    var jsonData = req.body;
    db.farmer.save({ name: jsonData.name, role: jsonData.role, gender: jsonData.gender, crop: jsonData.crop, date: jsonData.date, phone: jsonData.phone, email: jsonData.email, }, function (err, saved) {
        if (err) {
            console.log(err);
        } else {
            res.end('User saved');
        }
    });
});

//----------------------retailer----------------------------------
app.post('/insertRetailer', function (req, res) {
    var jsonData = req.body;
    db.retailer.save({ name: jsonData.name, role: jsonData.role, price: jsonData.price, gender: jsonData.gender, crop: jsonData.crop, date: jsonData.date, phone: jsonData.phone, address: jsonData.address, email: jsonData.email, }, function (err, saved) {
        if (err) {
            console.log(err);
        } else {
            res.end('User saved');
        }
    });
});

//===========================================================================================================================

app.post('/insertBookSlot', (req, res) => {
    const generatedUuid = uuid.v1();
    const jsonData = req.body;

    db.bookSlot.save({
        farmerName: jsonData.farmerName,
        gender: jsonData.gender,
        farmerPhone: jsonData.farmerPhone,
        farmerEmail: jsonData.farmerEmail,
        slotTime: jsonData.slotTime,
        date: jsonData.date,
        retailerName: jsonData.retailerName,
        retailerPhone: jsonData.retailerPhone,
        crop: jsonData.crop,
        address: jsonData.address
    }, function (err, saved) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Server error' });
        } else {

            const templatePath = path.join(__dirname, 'routes', 'report.ejs');
            const outputPath = path.join(__dirname, './generated_pdf/', generatedUuid + '.pdf');

            ejs.renderFile(templatePath, {
                farmerName: jsonData.farmerName,
                gender: jsonData.gender,
                farmerPhone: jsonData.farmerPhone,
                farmerEmail: jsonData.farmerEmail,
                slotTime: jsonData.slotTime,
                date: jsonData.date,
                retailerName: jsonData.retailerName,
                retailerPhone: jsonData.retailerPhone,
                crop: jsonData.crop,
                address: jsonData.address
            }, (err, html) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                } else {
                    pdf.create(html).toFile(outputPath, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        } else {
                            // Send the email with the PDF attachment
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

                            const mailOptions = {
                                from: 'vasuparsaniya21@gmail.com', // Sender email address
                                to: jsonData.farmerEmail, // Farmer email address
                                subject: 'Market Yard Book Slot Confirmation',
                                text: 'Please find the attached PDF for your slot confirmation.',
                                attachments: [
                                    {
                                        filename: generatedUuid + '.pdf',
                                        path: outputPath
                                    }
                                ]
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                    return res.status(500).json({ error: 'Failed to send email' });
                                } else {
                                    console.log('Email sent:', info.response);
                                    res.json({ success: true, message: 'PDF generated and Conformation of Email sent successfully' });
                                }
                            });
                        }
                    });
                    const responseMessage = 'PDF generated and Conformation of Email sent successfully';
                    const response = { success: true, message: responseMessage };
                    res.send(response); // Send the response with the custom message and result  

                    //   res.send(result);

                }
            });
        }
    });
});

//======================================================================================================================
app.post('/login', function (req, res) {
    var jsonData = req.body;
    db.users.findOne({ email: jsonData.email }, function (err, saved) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            if (saved) {
                // db.users.save({ email: jsonData.email, password: jsonData.password }, function (err, savedUser) {
                //     if (err) {
                //         console.log(err);
                //         return res.status(500).json(err);
                //     } else {
                //         return res.status(200).json({ message: "Login Successfully...." });
                //     }
                // });
                return res.status(200).json({ message: "Login Successfully...." });
            } else {
                return res.status(400).json({ message: "User Not Found" });
            }
        }
    });
});


app.post('/signup', function (req, res) {
    var jsonData = req.body;
    db.users.findOne({ email: jsonData.email }, function (err, saved) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            if (!saved) {
                db.users.save({ email: jsonData.email, password: jsonData.password }, function (err, savedUser) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json({ message: "Successfully registered" });
                    }
                });
            } else {
                return res.status(400).json({ message: "Email Already Exists" });
            }
        }
    });
});

//--------------forgotpassword----------------------------------

app.post('/forgotpassword', function (req, res) {
    var jsonData = req.body;
    db.users.findOne({ email: jsonData.email }, function (err, saved) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            if (saved) {
                var password = saved.password; // Retrieve the password from the saved user object

                // Send the email with the PDF attachment
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

                const mailOptions = {
                    from: 'vasuparsaniya21@gmail.com', // Sender email address
                    to: jsonData.email, // Farmer email address
                    subject: 'Market Yard - Password Recovery',
                    // text: 'Your password: ' + password
                    html: '<p><b>Your Login details for Market Yard</b><br><b>Email: </b>' + jsonData.email + '<br><b>Password: </b>' + password + '<br><a href="http://127.0.0.1:5500/Market_Yard-Frontend/login.html">Click Here To Login</a></p>'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ error: 'Failed to send email' });
                    } else {
                        console.log('Email sent:', info.response);
                        res.json({ success: true, message: 'PDF generated and Conformation of Email sent successfully' });
                    }
                });

                return res.status(200).json({ message: "Password sent to email." });
            } else {
                return res.status(400).json({ message: "User Not Found" });
            }
        }
    });
});

app.listen(8080, function () {
    console.log('Server listening on port 8080');
});
