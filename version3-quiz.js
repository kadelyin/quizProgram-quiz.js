// Kade Wood
// Quiz System
// Version 3
// 23/06/2026

// FIRE THE SCRIPT THROUGH TERMINAL WITH > node SCRIPT_NAME.js
// in order to run the script you need to have node.js installed.

// services/dependancies
const prompt = require("prompt-sync")();

// helpers
const debugToggle = true;
function debugPrint(string) {
  // easy way to toggle whether or not i want to have debugging in my code.
  if (!debugToggle) return;

  console.log(`\x1b[2mDEBUG: ${string}\x1b[0m`);
  // this \x1b[1m stuff makes console.log strings bold based on the value given e.g. [1m
  // (https://dev.to/atomikjaye/styling-consolelog-in-the-terminal-25c1)
}

const shuffleToggle = true;
function shuffleArray(array) {
  // fisher-yates shuffle (https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array)
  if (!shuffleToggle) return array;

  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // swap elements array[i] and array[j]
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function cleanValue(value) {
  // a function I made that takes a value and changes it to a correct value, so from "y" > true.
  let cleanedValue = value.trim().toLowerCase();
  if (cleanedValue == "y") return true;
  if (cleanedValue == "n") return false;
}

function convertFraction(numerator, denominator) {
  // helper function that converts fractions based on the parameters it's given.
  let percent = (numerator / denominator) * 100;
  return percent;
}

function gradeScore(percent) {
  // helper function that converts percentages into grades.
  if (percent >= 80)
    return "E - You are exceptional, your hard work has paid off, you attained an E.";
  if (percent >= 60) return "M - Well done you achieved an M in this quiz.";
  if (percent >= 50) return "A - Good work you attained an A grade.";
  return "N - You need to study more.";
}

// components
const welcomeToggle = true;
function welcomeComponent() {
  // welcomeComponent that introduces the player and returns values (name, dataSaving)
  if (welcomeToggle) {
    console.log(
      "For context, L&P (Lemon & Paeroa) is a sweet, lemon-flavoured soft drink manufactured by Coca-Cola NZ that has become an iconic piece of New Zealand culture, famously advertised as `World Famous` in New Zealand." +
        "\nWelcome to the L & P quiz! Start by answering the following questions.",
    );

    let name = "";
    while (!name.trim()) {
      name = prompt("What is your name? : ");
    }
    name = name.trim();
    debugPrint(`name == ${name}`);

    console.log(`Hello ${name}!`);

    let dataSaving = "n"; // defaulted at "n" so it is never empty if the while loop is skipped.
    let dataAskToggle = true;
    if (dataAskToggle) {
      dataSaving = "";
      while (
        dataSaving.trim().toLowerCase() !== "y" &&
        dataSaving.trim().toLowerCase() !== "n"
      ) {
        dataSaving = prompt("Do you want your progress to save? (y/n) : ");
        /* this WHOLE part was just an idea for saving the player's data so there could be leaderboards or personal bests.
        but at this moment I don't know how to save data through javascript. 
        something to do with another service or dependancy that logs stuff into a json file.*/
      }
    }
    debugPrint(`dataSaving == ${dataSaving}`);

    return {
      // returns multiple values
      name: name,
      dataSaving: cleanValue(dataSaving), // cleans value from "y" > true, making it easier to recognise the value and use.
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

  console.log(`\x1b[1mQUIZ BEGINS NOW!\x1b[0m`); // another use of bold console.log text.

  for (let i = 0; i < activeQuestions.length; i++) {
    const current = activeQuestions[i];
    console.log(`Question ${i + 1}: ${current.question}`);

    current.choices.forEach((choice) => console.log(choice));
    /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
    The forEach() method of Array instances executes a provided function once for each array element.*/

    let userAnswer = "";
    const validAnswers = ["a", "b", "c", "d"];

    while (!validAnswers.includes(userAnswer)) {
      /* (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
      The includes() method of Array instances determines whether an array includes a certain value among 
      its entries, returning true or false as appropriate.*/
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
      "L&P was originally created by mixing lemon juice with what ingredient?",
    choices: [
      "A) Naturally carbonated mineral spring water",
      "B) Volcanic mud extract",
      "C) Manuuka honey infusion",
      "D) High-grade river silt",
    ],
    answer: "a",
  },
  {
    question: "In what decade was L&P officially created?",
    choices: ["A) 1880s", "B) 1900s", "C) 1940s", "D) 1970s"],
    answer: "b",
  },
  {
    question: "Which beverage company owns and makes L&P today?",
    choices: [
      "A) Frucor Suntory",
      "B) PepsiCo",
      "C) The Coca-Cola Company",
      "D) Whittakers",
    ],
    answer: "c",
  },
  {
    question: "How tall is the giant L&P bottle statue in the town of Paeroa?",
    choices: [
      "A) 3.5 metres",
      "B) 20.5 metres",
      "C) 12.2 metres",
      "D) 6.8 metres",
    ],
    answer: "d",
  },
];

// init
const { name, dataSaving } = welcomeComponent();
/* otherwise known as...
const component = welcomeComponent();
const name = component.name;
const dataSaving = component.dataSaving;*/
debugPrint(`userAnswers = { name : ${name}, dataSaving: ${dataSaving} }`);

while (true) {
  const score = quizComponent(quizQuestions);
  const percent = convertFraction(score, quizQuestions.length);

  console.log(
    `\nThanks for playing ${name || "null"}. Your final score was ${score}/${
      quizQuestions.length
    }, or ${percent}%.
    \nGrade: ${gradeScore(percent)}`,
  );

  let userChoice = "";
  while (userChoice !== "y" && userChoice !== "n") {
    userChoice = prompt("Would you like to play again? (y/n) : ")
      .trim()
      .toLowerCase();
  }

  if (userChoice == "n") {
    console.log(
      `Goodbye ${name || "Player"}. Thanks for playing the L&P quiz.`,
    );
    break;
  }
}
