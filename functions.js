const fetch = require('node-fetch');

async function getText(){

    console.log("Please wait, fetching and parsing in progress...");

    const response = await fetch('http://norvig.com/big.txt');
    let text = await response.text();
    text = text.toLowerCase();

    let wordsList = splitTextToWords(text);
    let wordsMap = createWordsHashMap(wordsList);
    let sortedWordList = sortWordsList(wordsMap);
    sortedWordList = sortedWordList.slice(0, 10);

    return sortedWordList;
}

async function generateYandexWordList(wordList){
    
    let newWordList = [];
    let tr_array, syn_array, word_details;
    for(item of wordList){
        const response = await fetch("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf&lang=en-en&text="+item.word);
        const responseJSON = await response.json();
        
        word_details = responseJSON.def[0];

        if(word_details){
            
            tr_array = word_details.tr;
            syn_array = tr_array.map(item => {
                return item.text;
            });

            let newWordListItem = {word: item.word, count: item.count, pos: word_details.pos, synonyms: syn_array};
            newWordList.push(newWordListItem);
        }
    }
    return newWordList;
}

function splitTextToWords(text){
    let wordsList = text.split(/\s+/);
    return wordsList;
}

function createWordsHashMap(wordsList){
    let wordsMap = {}

    wordsList.forEach(key => {
        if(wordsMap.hasOwnProperty(key)){
            wordsMap[key]++;
        }
        else{
            wordsMap[key] = 1;
        }
    });

    return wordsMap;
}

function sortWordsList(wordsMap){
    let getKeys = Object.keys(wordsMap);
    let newWordList = getKeys.map(key => {
        return {
            word: key,
            count: wordsMap[key]
        };
    });

    newWordList.sort((a, b) => {
        return b.count - a.count;
    });

    return newWordList;
}

module.exports = {
    getText: getText,
    generateYandexWordList: generateYandexWordList
}