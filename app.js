const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup

app.engine('handlebars', exphbs({
  extname: "handlebars",
  //defaultLayout: "main-layout",
  layoutsDir: "views/"
}));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact', { layout: false });
});

app.post('/send', (req, res) => {
  const output = `
 <p>You have new contact request </p>
 <h3> Contact Details </h3>
 <ol>
  <li>Name: ${req.body.name}</li>
  <li>Phone Number: ${req.body.phone}</li>
 </ol>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.@gmail.com",
    port: 25,
    auth: {
      user: "your-email",
      pass: "your-password"
    },

    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'email', // sender address
    to: 'email', // list of receivers
    subject: 'Send Query', // Subject line
    text: 'Hello world!!', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    else {
      console.log('email sent' + info.response);
    }
  });

})
app.listen(3000, () => {
  console.log('Server is started...');
})
