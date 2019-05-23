const User = require('../models/User')

module.exports = (req, res) =>{
    if(!req.body.email || !req.body.name || !req.body.password){
        res.status("400");
        res.json({
          message: 'invalid details'
        });
     } else {
         console.log(typeof(User))
        User.filter(user=>{
           if(user.email == req.body.email){
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
      res.json({
        message: `Hello ${req.body.name}, welcome to automart`
      })
    
}