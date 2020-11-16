const express = require('express');

const myFunctions = require('./functions.js'); 

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    const promisedWordList = myFunctions.getText().catch(error => console.error("This was the error that took place", error));
    
    promisedWordList.then(wordList => {
        
        const newPromisedWordsList = myFunctions.generateYandexWordList(wordList).catch(error => console.error("This was the error while generating the new List ", error));
        
        newPromisedWordsList.then(wordsList => {
            console.log("New Word List: ", wordsList);
        });
    });
});

app.listen(4000, () => {
    console.log("Listening on localhost:4000");
})

