const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

const questions = 
[
  {
    "question": "First off — which tap dance routine is regarded as the anthem of tap dancers around the world?",
    "choices": 
    [
      "Fancy Feet",
      "The Shim Sham Shimmy",
      "Thriller"
    ],
    "answer": 2
  },
  {
    "question": "Who is the purported creator of the Shim Sham Shimmy?",
    "choices": 
    [
      "Leonard Reed",
      "Willie Bryant",
      "Whitman Sisters",
      "All of the above"
    ],
    "answer": 4
  },
  {
    "question": "When was the Shim Sham Shimmy first choreographed?",
    "choices": 
    [
      "1920s",
      "1960s",
      "1980s"
    ],
    "answer": 1
  },
  {
    "question": "Where was the first performance of the Shim Sham Shimmy held?",
    "choices": 
    [
      "Broadway Show",
      "Hollywood Musical",
      "Vaudeville Stage"
    ],
    "answer": 3
  },
  {
    "question": "Which step in the following list is not included in the standard steps of the Shim Sham Shimmy? Choose one.",
    "choices": 
    [
      "Crossover",
      "Double Shuffle",
      "Paddle and Roll",
      "Waltz Clog"
    ],
    "answer": 3
  },
  {
    "question": "Study the following rhythm. How many 4-count bars are there in this phrase?",
    "image": "halfbreak.jpg",
    "choices": 
    [
      "1",
      "2",
      "4",
      "8"
    ],
    "answer": 2
  },
  {
    "question": "Study the rhythm again. How many sounds are there in this phrase?",
    "image": "halfbreak.jpg",
    "choices": 
    [
      "4",
      "8",
      "12",
      "16"
    ],
    "answer": 3
  },
  {
    "question": "Which step of the Shim Sham Shimmy is expressed by the following rhythm?",
    "image": "shimsham.png",
    "choices": 
    [
      "Step 1: Shim Sham",
      "Step 2: Push/Cross",
      "Step 3: Tack Annie",
      "Step 4: Half-Break"
    ],
    "answer": 1
  },
  {
    "question": "Which statement is incorrect? Choose one.",
    "choices": 
    [
      "Shim Sham Shimmy is the name of a one-chorus dance named after a club where it was regularly performed.",
      "Shim Sham Shimmy is danced to eight-bar choruses.",
      "Waltz Clog is a 3-count phrase seen in the third step of the Shim Sham.",
      "The second step of the Shim Sham Shimmy has a push and then a cross step."
    ],
    "answer": 3
  },
  {
    "question": "Which rhythm phrase below expresses the fourth step of the Shim Sham Shimmy?",
    "pictureChoice": true,
    "choices": 
    [
      "halfbreak.jpg",
      "tackannie.jpg",
      "shimsham.png"
    ],
    "answer": 1
  },
  {
    "question": "Peg Leg Bates was an African-American entertainer who lost his leg as a teenager and subsequently learned to tap dance with a wooden peg leg. True or False?",
    "choices": 
    [
      "True",
      "False"
    ],
    "answer": 1
  },
  {
    "question": "Which statement is correct? Choose one.",
    "choices": 
    [
      "Bill Robinson is best known for his signature stair dance.",
      "Nicholas Brothers were famous for their flash dancing.",
      "Alice Whitman was one of the Whitman Sisters who was a star dancer and known as the “Queen of Taps",
      "All of the above"
    ],
    "answer": 4
  },
  {
    "question": "Which tap dance artist had to face the challenges of the segregated world of entertainment industry? Choose one.",
    "choices": 
    [
      "Nicholas Brothers",
      "Bill Robinson",
      "Whitman Sisters",
      "All of the above"
    ],
    "answer": 4
  },
  {
    "question": "Which tap-dancing couple was cast as the first inter-racial couple ever on screen?",
    "choices": 
    [
      "Bill Robinson and Shirley Temple",
      "Nicholas Brothers",
      "Alice Whitman and Mabel Whitman"
    ],
    "answer": 1
  },
  {
    "question": "Black Vaudeville was based on performances that came out of the movement and style of African Americans. Who were known as The Royalty of Negro Vaudeville?",
    "choices": 
    [
      "Whitman Sisters",
      "Dolly Sisters",
      "Burns Twins"
    ],
    "answer": 1
  }
];

//CONSTANTS
const POINTS = 10;

getNewQuestion = () => {
  let numQuestions = availableQuesions.length;
  if (questionCounter >= numQuestions) {
    //go to the end page
    const maxPossibleScore = POINTS * numQuestions;
    localStorage.setItem("score", score);
    localStorage.setItem("maxPossibleScore", maxPossibleScore);
    return window.location.assign("https://htmlpreview.github.io/?https://raw.githubusercontent.com/smitanarayan/quiz/master/end.html");
  }

  let questionIndex = questionCounter;
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${numQuestions}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / numQuestions) * 100}%`;

  acceptingAnswers = true;

  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;
  const image = document.getElementById("image");

  if (currentQuestion.image) {
    image.innerHTML = `<img src="${currentQuestion.image}" width="250em">`;
  }
  else {
    image.innerHTML = "";
  }

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    const str = currentQuestion.choices[number-1];

    if (str) {
      if (currentQuestion.pictureChoice === true) {
        choice.innerHTML = `<img src="${str}" width="250em">`;
      }
      else {
        choice.innerHTML = str; 
      }

      choice.parentElement.style.visibility = "visible";
    }
    else {
      choice.innerHTML = "";
      choice.parentElement.style.visibility = "hidden";
    }
  });

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.parentElement.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    let selectedChoice ;
    if (e.target.className === "choice-prefix" ) {
      selectedChoice = e.target.nextElementSibling;
    }
    else if (e.target.className == "choice-container") {
      selectedChoice = e.target.lastElementChild;
    }
    else if (e.target.className == "choice-text") {
      selectedChoice = e.target;
    }
    else { // image
      selectedChoice = e.target.parentElement;
    }

    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

startGame();

