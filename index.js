const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
var session = require('express-session');
const registerController = require('./controllers/register')


//creating a new express app
const app = new express()
//body-parser makes it possible to have form details in the 'req.body'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//this is to render static files
app.use(express.static('public'))
//session creates a session when a user logs in and destroys it when the user logs out
app.use(session({secret: "secret",
resave: false,
saveUninitialized: true,
cookie: { secure: true }}));




app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/register.html'))
  })
app.post('/register', registerController)
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/login.html'))
})
// app.post('/login', )


//creating a server in my localhost. so localhost:3000 will serve the app
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server listening on Port ${port}`)
});
