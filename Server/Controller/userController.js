const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware

    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  // write code here
  //create a user from the client's request.
  const {username, password} = req.body;


  User.create({username, password}, (err, response) => {

    if(err) {
      res.render('./../client/signup.ejs', { error: err });
    }
    
    // console.log('locals'res.locals)
    // res.locals = response.id; 
    next();
 });
}


/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // check if a user exists and the password is correct
  const {username, password} = req.body;

  User.find({username, password}, (err, user) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if(err) {
      res.render('./../Client/SignUp.js', { error: err });
    }
    
    if(user.length < 1) {
      res.render('./../Client/SignUp.js', { error: 'invalid login details' });
    }
    // console.log("user model zero index: ", user[0]._doc._id.id)
    res.locals.userId = user[0]._doc._id.id.toString();
    // console.log(User.id)
    return next();
  });
};

module.exports = userController;