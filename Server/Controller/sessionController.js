const cookieParser = require('cookie-parser');
const Session = require('../models/sessionModel');

const sessionController = {};


// isLoggedIn - find the appropriate session for this request in the database, then
// verify whether or not the session is still valid.
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  const cookies = JSON.stringify(req.cookies.ssid);
  
  
  Session.find({cookieId: cookies})
  .then((data) => {
    const session = data[0];
    if(session.cookieId === cookies){
     return next();
    }
  })
  .catch( err => {
    return next(err);
  })
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  const id = JSON.stringify(res.locals.id);

  Session.create({cookieId: id})
  .then(() => {
    console.log('Session Created in Database');
    return next();
  })
  .catch((err) =>{ 
    return next('Error Happening in SESSION CONTROLLER: startSession');
  })
};

module.exports = sessionController;