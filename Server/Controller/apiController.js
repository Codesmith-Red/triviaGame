const fetch = require('node-fetch');

const apiController = {}

// Gets the Trivia questions from the Trivia Api and sends the questions back to the React App
//To change what category of ?'s or number of ?'s check out the API's documentation (in README)
apiController.getTriviaQuestions = (req, res, next) => {
  fetch('https://opentdb.com/api.php?amount=10&category=12')
   .then(data => data.json())
   .then(triviaQuest => {
     res.locals.triviaQuest = triviaQuest;
      return next();
    })
}

module.exports = apiController;