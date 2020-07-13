const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');


const app = express()
// View engine setup
app.engine('handlebars',exphbs());
app.set('view engine',"handlebars");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Hello');
})
app.listen(3000,()=>{
    console.log('Server is started');
})