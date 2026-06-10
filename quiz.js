// Kade Wood
// Quiz System
// Version 1
// 2/06/2026

// FIRE THE SCRIPT THROUGH TERMINAL WITH > node SCRIPT_NAME.js
// in order to run the script you need to have node.js installed.

// services/dependancies
const prompt = require('prompt-sync')();

const welcomeToggle = true;
const debugToggle = false;

function welcomeComponent() {
    if (welcomeToggle) {
        console.log("Welcome to the quiz! Please start by answering the following questions:");

        let name = "";
        while (!name.trim()) {
            name = prompt("What is your name? : ");
        }

        console.log(`Welcome to the quiz ${name}!\n`);
        return name;
    }
    return null; // if welcomeToggle = false it'll return the user's name as null.
}

// HELPER FUNCTIONS
function debug(string) { // easy way to toggle whether or not i want to have debugging in my code.
    if (debugToggle) {
        console.log(
            `\x1b[1mDEBUG: ${string}\x1b[0m`,
        );
    }
}

function shuffleArray(array) { // function made to shuffle questions randomly, otherwise known as the fisher-yates shuffle
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
//

const quizObj = { // ai generated quiz object
    math: [
        { question: "1 + 1 = ?", answer: "2" },
        { question: "2 + 2 = ?", answer: "4" },
    ],
    // science: [
    //     { question: "What planet is known as the Red Planet?", answer: "Mars" },
    //     { question: "What is the chemical symbol for water?", answer: "H2O" },
    // ],
    // geography: [
    //     { question: "What is the capital city of Australia?", answer: "Canberra" },
    //     { question: "Which ocean is the largest on Earth?", answer: "Pacific" },
    // ],
    // generalKnowledge: [
    //     { question: "How many days are in a leap year?", answer: "366" },
    //     { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" }
    // ]
};

function main(playerName) {
    const topics = Object.keys(quizObj);

    const displayName = playerName || "Player";

    console.log(`Available topics: ${topics.join(', ')}`);

    let chosenTopic = "";
    while (!quizObj[chosenTopic]) {
        // 1. Clean the input: lowercase it, trim it, and remove ALL spaces
        let input = prompt(`Which topic do you want to play ${displayName}? : `).toLowerCase().trim().replace(/\s+/g, '');

        // 2. Look through the quizObj keys to find a match ignoring case
        chosenTopic = topics.find(key => key.toLowerCase() === input);
    }
    debug(`chosenTopic= ${chosenTopic}`)

    // GAMEPLAY LOGIC
    console.log(`\nStarting the ${chosenTopic} quiz! Good luck ${displayName}!`);

    const selectedQuestions = shuffleArray(quizObj[chosenTopic]);
    let score = 0;

    selectedQuestions.forEach((item, index) => {
        console.log(`\nQuestion ${index + 1}: ${item.question}`);

        let userAnswer = "";
        while (!userAnswer.trim()) {
            userAnswer = prompt("Your answer : ").trim();
        }

        if (userAnswer.toLowerCase() === item.answer.toLowerCase()) {
            console.log('Correct! +1 Point');
            score++;
        } else {
            console.log(`Incorrect. The correct answer was: ${item.answer}`);
        }
    })

    console.log(`You scored ${score}/${selectedQuestions.length}`)
    //
    return true;
}

const name = welcomeComponent();
debug(`welcomeComponent returned= ${name}`);

// continuous loop to handle repeating the quiz cleanly
let playing = true;
while (playing) {
    main(name);

    let repeat = "";
    while (repeat !== "y" && repeat !== "n") {
        repeat = prompt("Do you want to play again? (y/n) : ").toLowerCase().trim();
    }

    if (repeat === "n") {
        playing = false;
        // Uses "Player" if name is null
        console.log(`Thanks for playing ${name || "Player"}!`);
    }
}