const express = require('express');

const myFunctions = require('./functions.js'); // custom module with all the necessary functions

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // To prevent blocking by CORS policy
    next();
});

app.get('/', (req, res) => {

    // First, get the list of top 10 words in decreasing order of frequency
    const promisedWordList = myFunctions.getText().catch(error => console.error("This was the error that took place", error));
    
    promisedWordList.then(wordList => {
        
        // Fetch details for each of the 10 words using the yandex API and generate a new JSON object with required info
        const finalPromisedWordsList = myFunctions.generateYandexWordList(wordList).catch(error => console.error("This was the error while generating the new List ", error));
        
        finalPromisedWordsList.then(wordsList => {

            try{
                console.log("New Word List: ", wordsList);
                res.render('index.ejs', {myText : JSON.stringify(wordsList, undefined, 4)});
            }catch(error){
                console.error("Error in processing and displaying word list...", error);
            }
            
        });
    });
});

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

