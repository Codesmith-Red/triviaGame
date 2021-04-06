const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const apiController = require('./Controller/apiController');
const userController = require('./Controller/userController');
const sessionController = require('./Controller/sessionController');
const cookieController = require('./Controller/cookieController');
const cookieParser = require('cookie-parser');

// app.use(cookieParser())
mongoose.connect('mongodb+srv://Batfish:Codesmith20@cluster0.mrdoj.mongodb.net/Trivia?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('CONNECTED TO MONGO DB'));

const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.post('/SignUp', userController.createUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
    // what should happen here on successful sign up?
    res.send('Success')
});

app.post('/Login', userController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
    // what should happen here on successful log in?
    res.send('Success');
});



// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});
  

app.listen(3000, () => console.log('Server Started'));