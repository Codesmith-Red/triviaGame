const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');


const userController = {};

// Create a User in the data base with 'username' and 'password' on the body
userController.createUser = (req, res, next) => {
  
    
    const {username, password} = req.body;
    const userInfo = {username, password};
    
    // Atempt to Create User
    User.create(userInfo)
    .then((user) => { 
      // Store the newly created User Id on the res.locals object
      res.locals.id = user._id;
      next();
    })
    // When the Error Occurs it will send the error
    .catch((e) => {
      next('Happening in CREATE USER');
    })
  
  };
  
  
 //Find user in database. Check entered password against stored password.
 //THIS IS NOT FUNCTIONAL YET!!!
  userController.verifyUser = (req, res, next) => {
    // Get the username and password from request body
    const {username, password} = req.body;
  
    // Find the User
    User.find({ username: username }, (error, array) => {
      const user = array[0];
      
      // Handle Error
      if (error){
        next('Error in VERIFY USER');
      }
  
      // Compare passwords
      if (user.password === password){
        //When Sucessful, add passwords to res.locals
        res.locals.id = user._id;
        next();
      }else{
        // This logic needs to be completed
        console.log('redirecting to signup');
        res.redirect('/');
      }
  
    });
    
  };

module.exports = userController;