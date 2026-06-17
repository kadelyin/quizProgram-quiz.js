// Kade Wood
// Quiz System
// Version 2
// 15/06/2026

// FIRE THE SCRIPT THROUGH TERMINAL WITH > node SCRIPT_NAME.js
// in order to run the script you need to have node.js installed.

// services/dependancies
const prompt = require("prompt-sync")();

// helpers
const debugToggle = false;
function debugPrint(string) {
  // easy way to toggle whether or not i want to have debugging in my code.
  if (!debugToggle) return;
  console.log(`\x1b[2mDEBUG: ${string}\x1b[0m`); // this \x1b[1m stuff makes console.log strings bold based on the value given e.g. [1m.
}

const shuffleToggle = true;
function shuffleArray(array) {
  // fisher-yates shuffle (https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array)
  if (!shuffleToggle) return array;

  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function cleanValue(value) {
  let cleanedValue = value.trim().toLowerCase();
  if (cleanedValue === "y") return true;
  if (cleanedValue === "n") return false;
  return false;
}

// components
const welcomeToggle = true;
function welcomeComponent() {
  if (welcomeToggle) {
    console.log(
      "Welcome to the L&P quiz! Start by answering the following questions.",
    );

    let name = "";
    while (!name.trim()) {
      name = prompt("What is your name? : ");
    }
    debugPrint(`name == ${name}`);

    console.log(`Hello ${name}!`);

    // let dataSaving = "";
    // while (dataSaving.trim().toLowerCase() !== 'y' && dataSaving.trim().toLowerCase() !== 'n') {
    //     dataSaving = prompt("Do you want your progress to save? (y/n) : ")
    // }
    // debugPrint(`dataSaving == ${dataSaving}`);

    return {
      name: name.trim(),
      dataSaving: cleanValue(dataSaving),
    };
  }
  return {
    name: null,
    dataSaving: false,
  }; // if welcomeToggle = false it'll return the user's name as null.
}

function quizComponent(questions) {
  let score = 0;
  const activeQuestions = shuffleArray(questions);

  console.log(`\x1b[1mQUIZ BEGINS NOW!\x1b[0m`);

  for (let i = 0; i < activeQuestions.length; i++) {
    const current = activeQuestions[i];
    console.log(`Question ${i + 1}: ${current.question}`);

    current.choices.forEach((choice) => console.log(choice)); // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

    let userAnswer = "";
    const validAnswers = ["a", "b", "c", "d"];

    while (!validAnswers.includes(userAnswer)) {
      // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
      userAnswer = prompt("Your answer (A, B, C, or D) : ")
        .trim()
        .toLowerCase();
    }

    if (userAnswer == current.answer) {
      score++;
      console.log(`Correct! Score is now ${score}.`);
    } else {
      console.log(`Incorrect. Correct answer was ${current.answer}.`);
    }
  }

  return score;
}

// data
const quizQuestions = [
  {
    question: "What does the 'P' in L&P stand for?",
    choices: [
      "A) Pukekohe",
      "B) Paeroa",
      "C) Palmerston North",
      "D) Piccadilly",
    ],
    answer: "b",
  },
  {
    question:
      "L&P was originally created by mixing fresh lemon juice with what local ingredient?",
    choices: [
      "A) Naturally carbonated mineral spring water",
      "B) Volcanic mud extract",
      "C) Manuuka honey infusion",
      "D) High-grade river silt",
    ],
    answer: "a",
  },
  {
    question: "In which decade was L&P officially created and introduced?",
    choices: ["A) 1880s", "B) 1900s", "C) 1940s", "D) 1970s"],
    answer: "b",
  },
  {
    question: "Which global beverage company owns and manufactures L&P today?",
    choices: [
      "A) Funcor Suntory",
      "B) PepsiCo",
      "C) The Coca-Cola Company",
      "Whittakers",
    ],
    answer: "c",
  },
  {
    question:
      "How tall is the famous giant L&P bottle statue located in the town of Paeroa?",
    choices: [
      "A) 3.5 metres",
      "B) 6.8 metres",
      "C) 12.2 metres",
      "D) 20.5 metres",
    ],
    answer: "b",
  },
];

// init
const { name, dataSaving } = welcomeComponent();
/* otherwis known as...
const component = welcomeComponent();
const name = component.name;
const dataSaving = component.dataSaving;
*/
debugPrint(`userAnswers = { name : ${name}, dataSaving: ${dataSaving} }`);

while (true) {
  const finalScore = quizComponent(quizQuestions);

  console.log(
    `\n Thanks for playing ${name || "null"}. Your final score was ${finalScore}/${quizQuestions.length}.`,
  );

  let userChoice = "";
  while (userChoice !== "y" && userChoice !== "n") {
    userChoice = prompt("Would you like to play again? : ")
      .trim()
      .toLowerCase();
  }

  if (userChoice == "n") {
    console.log(`Goodbye ${name}. Thanks for playing the L&P quiz.`);
    break;
  }
}
