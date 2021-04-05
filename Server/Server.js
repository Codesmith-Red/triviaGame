const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const apiController = require('./Controller/apiController');
const userController = require('./Controller/userController');

const app = express();


// Connect The Server to the Mongo DB
mongoose.connect('mongodb+srv://Batfish:Codesmith20@cluster0.mrdoj.mongodb.net/Trivia?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', (error) =>  console.log(error));
db.once('open', function() {
    console.log('CONNECTED TO MONGO DB')
});

app.use(express.json());

// TESTING
app.use((req, res, next) => {
    console.log(req.body);
    next();
})

// Sends the React App
app.use('/build', express.static(path.join(__dirname, '../build')));

// Sends the Login Page
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Client/App/index.html'));
});

// Gets the Trivia questions from the Trivia Api and sends the questions back to the React App
app.get('/api', apiController.getTriviaQuestions, (req, res) => {
  //send our client the fetched trivia questions
    res.status(200).json(res.locals.triviaQuest);
})

// app.post('/SignUp', userController.createUser, (req, res) => {
   
// })

app.listen(3000, () => console.log('Server Started'));