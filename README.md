## conversational-ai-assignment

Interview assignment to retrieve top 10 recurring words in a random text file, along with word count and synonyms. Written using Node.js and Express.js, while using the Yandex dictionary API to retrieve synonyms of words.

### View the assignment live on [Glitch](https://harmless-ink-age.glitch.me/) (wait for page to fetch and load data): 

### How to run this assignment locally:

1) Make sure you have **node.js** installed on your OS. If not, get the latest recommended version from the [official website here](https://nodejs.org/en/).

2) Download or clone the repository under any directory in your local machine.

3) Open the command prompt (Windows) or terminal (OS X) and navigate to the repository directory you just downloaded/cloned.

4) Open the file **".env_sample"** and ensure the value of API_KEY is set to your Yandex Dictionary API KEY.

5) Rename the filename from **".env_sample"** to **".env"** (This is the file the code will use to retrieve the API KEY as an environment variable)

6) Run the following command in the command prompt (or terminal) to install the necessary node modules: `npm install` <br>

7) Next, run the command to start the project: `npm start` <br>

8) To initiate the data fetching and parsing process run **localhost:4000** in any browser. 

9) Wait until the parsed JSON data is displayed in either command prompt (terminal) or the browser's console.
