const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
var session = require('express-session');


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


//an empty array to store the users created
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
        //this is where the user is created.
        User.push({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        console.log(User)
    }
    res.send('user successfully registered')
    
});



//creating a server in my localhost. so localhost:3000 will serve the app
app.listen(3000, () => {
    console.log('App listening on port 3000')
  })