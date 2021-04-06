

const cookieController = {};


// Take the user id and set it as a cookie before the response
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('this is res.locals.id', res.locals.id);
  res.cookie('ssid', res.locals.id,{
    httpOnly: true
  });
  next();
}

module.exports = cookieController;