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

// app.get('/getRetailer/:user_id', function (req, res) {
//     var userId = req.params.user_id;
//     db.retailer.findOne({ _id: mongojs.ObjectId(userId) }, function (err, retailer) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(retailer); // Log the retailer object
//             res.json(retailer);
//         }
//     });
// });

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

//---------------------Book Slot-------------------------------------
// app.post('/insertBookSlot', function (req, res) {
//     var jsonData = req.body;
//     db.bookSlot.save({ farmerName: jsonData.farmerName, gender: jsonData.gender, farmerPhone: jsonData.farmerPhone, farmerEmail: jsonData.farmerEmail, slotTime: jsonData.slotTime, date: jsonData.date,
//          retailerName: jsonData.retailerName, retailerPhone: jsonData.retailerPhone, crop: jsonData.crop, retailerPhone: jsonData.retailerPhone, address: jsonData.address }, function (err, saved) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.end('Slot Booked');

//             var savedSlot = { 
//                 farmerName: jsonData.farmerName, gender: jsonData.gender, farmerPhone: jsonData.farmerPhone, farmerEmail: jsonData.farmerEmail, 
//                 slotTime: jsonData.slotTime, date: jsonData.date, retailerName: jsonData.retailerName, retailerPhone: jsonData.retailerPhone, 
//                 crop: jsonData.crop, retailerPhone: jsonData.retailerPhone, address: jsonData.address }

//             // Generate the PDF with the saved slot data
//       generatePDF(savedSlot)
//         .success((pdfBytes) => {
//           // Send the PDF as a response
//           res.setHeader('Content-Type', 'application/pdf');
//           res.setHeader('Content-Disposition', 'attachment; filename="slot.pdf"');
//           res.send(pdfBytes);
//         })
//         .error((error) => {
//           console.log('Error generating PDF:', error);
//           res.status(500).json({ error: 'Server error' });
//         });
//         }
//     });
// });

// // Function to generate the PDF with the provided slot data
// async function generatePDF(slotData) {
//   // Load an existing PDF or create a new one
//   const pdfDoc = await PDFDocument.create();

//   // Set the font and font size for the PDF content
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontSize = 12;

//   // Create a new page in the PDF
//   const page = pdfDoc.addPage();
//   const { width, height } = page.getSize();

//   // Define the content to be written in the PDF
//   const content = `
//     Farmer Name: ${slotData.farmerName}
//     Gender: ${slotData.gender}
//     Farmer Phone: ${slotData.farmerPhone}
//     Farmer Email: ${slotData.farmerEmail}
//     Date: ${slotData.date}
//     Retailer Name: ${slotData.retailerName}
//     Retailer Phone: ${slotData.retailerPhone}
//     Crop: ${slotData.crop}
//     Address: ${slotData.address}
//   `;

//   // Write the content to the PDF
//   page.drawText(content, {
//     x: 50,
//     y: height - 50,
//     size: fontSize,
//     font: font,
//     color: rgb(0, 0, 0),
//   });

//   // Save the PDF as a byte array
//   const pdfBytes = await pdfDoc.save();

//   return pdfBytes;
// }

//--------------------------------------------------------------------------------------------------------------

// app.post('/insertBookSlot', function (req, res) {
//   const generatedUuid = uuid.v1();
//   var jsonData = req.body;

//   db.bookSlot.save({
//     farmerName: jsonData.farmerName,
//     gender: jsonData.gender,
//     farmerPhone: jsonData.farmerPhone,
//     farmerEmail: jsonData.farmerEmail,
//     slotTime: jsonData.slotTime,
//     date: jsonData.date,
//     retailerName: jsonData.retailerName,
//     retailerPhone: jsonData.retailerPhone,
//     crop: jsonData.crop,
//     address: jsonData.address
//   }, function (err, saved) {
//     if (err) {
//       console.log(err);
//       res.status(500).json({ error: 'Server error' });
//     } else {
//       const templatePath = path.join(__dirname, 'routes', 'report.ejs');
//       const outputPath = path.join(__dirname, './generated_pdf/', generatedUuid + '.pdf');

//       ejs.renderFile(templatePath, {
//         farmerName: jsonData.farmerName,
//         gender: jsonData.gender,
//         farmerPhone: jsonData.farmerPhone,
//         farmerEmail: jsonData.farmerEmail,
//         slotTime: jsonData.slotTime,
//         date: jsonData.date,
//         retailerName: jsonData.retailerName,
//         retailerPhone: jsonData.retailerPhone,
//         crop: jsonData.crop,
//         address: jsonData.address
//       }, (err, html) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json(err);
//         } else {
//           pdf.create(html).toFile('./generated_pdf/' + generatedUuid + ".pdf", function (err, result) {
//             if (err) {
//               console.log(err);
//               return res.status(500).json(err);
//             } else {
//               res.setHeader('Content-Type', 'application/pdf');
//             //   res.setHeader('Content-Disposition', 'attachment; filename=' + generatedUuid + '.pdf');
//             res.send(result);
//             //   res.sendFile(outputPath);
//             }
//           });
//         }
//       });
//     }
//   });
// });

//------------------------------------------------------------------------------------------------------------------------------------------------


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

// app.get('/getRetailer/:retailerId', (req, res) => {
//     const retailerId = req.params.retailerId;

//     try {
//       // Find the retailer in the database by ID
//       const Retailer = retailer.findById(retailerId).select('date name phone crop address');

//       if (Retailer) {
//         res.json(Retailer); // Return the retailer data as JSON
//       } else {
//         res.status(404).json({ error: 'Retailer not found' }); // Retailer not found
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' }); // Handle server error
//     }
//   });









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

// app.post('/login', function (req, res) {
//     var jsonData = req.body;

//     // Assuming you have a MongoDB collection named 'users'
//     db.users.findOne({ email: jsonData.email}, function (err, saved) {
//         if (err) {
//             console.log(err);
//             // return res.status(500).json(err);
//             return res.status(400).json({ message: "User not Exists" });
//         } else {
//             return res.status(200).json({ message: "Successfully Login" });
//         }
//     });
// });


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


// app.post('/signup', function (req, res) {
//     var jsonData = req.body;
//     db.users.save({ email: jsonData.email, password: jsonData.password}, function (err, saved) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.end('User saved');
//         }
//     });
// });

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

// app.post('/signup', function (req, res) {
//     var jsonData = req.body;

//     db2.users.findOne({ email: jsonData.email }, function (err, user) {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Internal Server Error');
//             return;
//         }

//         if (user) {
//             // User already exists
//             res.status(409).send('User already exists');
//             return;
//         }

//         // Create a new user document
//         var newUser = {
//             email: jsonData.email,
//             password: jsonData.password
//         };

//         // Save the new user
//         db2.users.insert(newUser, function (err, saved) {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('Internal Server Error');
//                 return;
//             }

//             console.log("User successfully signup");
//             // Successful signup
//             res.send('User registered successfully');
//         });
//     });
// });


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
