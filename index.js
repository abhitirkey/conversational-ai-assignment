const express = require('express');

const myFunctions = require('./functions.js'); // custom module with all the necessary functions

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // To prevent blocking by CORS policy
    next();
});

app.get('/', (req, res) => {
    const promisedWordList = myFunctions.getText().catch(error => console.error("This was the error that took place", error));
    
    promisedWordList.then(wordList => {
        
        const finalPromisedWordsList = myFunctions.generateYandexWordList(wordList).catch(error => console.error("This was the error while generating the new List ", error));
        
        finalPromisedWordsList.then(wordsList => {
            console.log("New Word List: ", wordsList);
        });
    });
});

app.listen(4000, () => {
    console.log("Listening on localhost:4000");
})

