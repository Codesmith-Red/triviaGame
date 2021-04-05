const fetch = require('node-fetch');

const apiController = {}

// Gets the Trivia questions from the Trivia Api and sends the questions back to the React App
apiController.getTriviaQuestions = (req, res, next) => {
  fetch('https://opentdb.com/api.php?amount=10&category=12')
   .then(data => data.json())
   .then(triviaQuest => {
     res.locals.triviaQuest = triviaQuest;
      return next();
    })
}

module.exports = apiController;