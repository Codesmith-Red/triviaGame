const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // 'codesmith' with the value of 'hi' and attach it to express's response
  res.cookie('codeSmith', 'hi');
   // create a cookie named secret with new value 0-99
   // use Math.random method to get value
  res.cookie('secret', Math.ceil(Math.random() * 99));
  next()
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  console.log()
  // grab user id from res.locals from previous middleware function
  const userId = res.locals.userId;
  // create a cookie named "ssid" with a value that is equal to the id of the user
  res.cookie('ssid', userId);
  next();
}

module.exports = cookieController;