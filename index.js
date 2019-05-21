const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
var session = require('express-session');



const app = new express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'))
app.use(session({secret: "secret",
resave: false,
saveUninitialized: true,
cookie: { secure: true }}));



let User = [];

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/register.html'))
  })
app.post('/register', (req,res) =>{
    if(!req.body.email || !req.body.name || !req.body.password){
        res.status("400");
        res.send("Invalid credentials!");
     } else {
        User.filter(function(user){
           if(user.email == req.body.email || user.name == req.body.name){
              res.render('signup', {
                 message: "User Already Exists! Login or choose another user id"});
           }
        });
        User.push({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        console.log(User)
    }
    res.send('user successfully registered')
    
});




app.listen(3000, () => {
    console.log('App listening on port 3000')
  })