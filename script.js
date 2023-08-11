const quizContainer = document.querySelector(".quiz-container");
const introSection = document.querySelector(".intro-section");
const questionSection = document.querySelector(".question-section");
const resultSection = document.querySelector(".result-section");

const startBtn = document.querySelector(".start-btn");
const questionText = document.querySelector(".question-text");
const options = document.querySelectorAll(".option");
const timeElement = document.querySelector(".time");
const scoreElement = document.querySelector(".score");
const emojiElement = document.querySelector(".emoji");
const playAgainBtn = document.querySelector(".play-again-btn");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Text Markdown Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What is the correct CSS syntax to change the font family of an element?",
        options: ["font-family: Arial;", "fontfamily: Arial;", "font: Arial;", "text-font: Arial;"],
        answer: "font-family: Arial;"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "let", "variable", "v"],
        answer: "var"
    },
    {
        question: "What is the correct way to add an external JavaScript file to your HTML document?",
        options: ["<script href='script.js'></script>", "<script name='script.js'></script>", "<script src='script.js'></script>", "<script file='script.js'></script>"],
        answer: "<script src='script.js'></script>"
    },
    {
        question: "Which HTML tag is used to link an external CSS file?",
        options: ["<css>", "<link>", "<style>", "<stylesheet>"],
        answer: "<link>"
    },
];


playAgainBtn.addEventListener("click", () => {
    introSection.style.display = "block";
    resultSection.style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
});

function startQuiz() {
    introSection.style.display = "none";
    questionSection.style.display = "block";
    showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex < quizQuestions.length) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      questionText.textContent = currentQuestion.question;
      
      const questionNumberElement = document.querySelector(".question-number");
      questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}:`;

      options.forEach((option, index) => {
          option.textContent = currentQuestion.options[index];
          option.addEventListener("click", checkAnswer);
      });

        timeLeft = 10;
        timeElement.textContent = timeLeft;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        endQuiz();
    }
}

function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

function updateTimer() {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        checkAnswer({ target: { textContent: "" } });
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionSection.style.display = "none";
    resultSection.style.display = "block";
    scoreElement.textContent = score;
    
    // Set emoji based on score
    let emoji = '';
    if (score === quizQuestions.length) {
        emoji = '🏆';
    } else if (score >= quizQuestions.length / 2) {
        emoji = '😃';
    } else {
        emoji = '😢';
    }
    emojiElement.textContent = emoji;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    resultSection.style.display = "none";
    introSection.style.display = "block";
}

startBtn.addEventListener("click", startQuiz);
playAgainBtn.addEventListener("click", resetQuiz);