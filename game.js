const currentQuestionEl = document.getElementById('current-question');
const options = Array.from(document.getElementsByClassName('option-text'));
const progressLabel = document.getElementById('progress-label');
const currentScoreEl = document.getElementById('current-score');
const progressIndicator = document.getElementById('progress-indicator');
const spinner = document.getElementById('spinner');
const quiz = document.getElementById('quiz');
let activeQuestion = {};
let acceptingResponses = false;
let score = 0;
let questionCounter = 0;
let remainingQuestions = [];

const questionBank = [
    {
        question: "Who Will Win The IPL 2024",
        choice1: "Royal Challengers Bengaluru",
        choice2: "Sunrisers Hyderabad",
        choice3: "Kolkata Knight Riders",
        choice4: "Rajasthan Royals",
        answer: 1
    },
    {
        question: "Who Will Be The Top Run Scorer By The End Of IPL 2024?",
        choice1: "Travis Head",
        choice2: "Riyan Parag",
        choice3: "Virat Kohli",
        choice4: "MS Dhoni",
        answer: 3
    },
    {
        question: "Who has hit the most sixes in IPL history?",
        choice1: "AB de Villiers",
        choice2: "David Warner",
        choice3: "Chris Gayle",
        choice4: "Rohit Sharma",
        answer: 3
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

function startQuiz() {
    questionCounter = 0;
    score = 0;
    remainingQuestions = [...questionBank];
    getNextQuestion();
    quiz.classList.remove('hidden');
    spinner.classList.add('hidden');
}

function getNextQuestion() {
    if (remainingQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/lastpage.html');
    }

    questionCounter++;
    progressLabel.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressIndicator.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * remainingQuestions.length);
    activeQuestion = remainingQuestions[questionIndex];
    currentQuestionEl.innerHTML = activeQuestion.question;

    options.forEach(option => {
        const number = option.dataset['number'];
        option.innerHTML = activeQuestion['choice' + number];
    });

    remainingQuestions.splice(questionIndex, 1);
    acceptingResponses = true;
}

options.forEach(option => {
    option.addEventListener('click', e => {
        if (!acceptingResponses) return;

        acceptingResponses = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number'];

        const classToApply = selectedAnswer == activeQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedOption.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNextQuestion();
        }, 1000);
    });
});

function incrementScore(num) {
    score += num;
    currentScoreEl.innerText = score;
}

startQuiz();
