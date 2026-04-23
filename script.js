const questions = [
    {
        question: "What is HTML?",
        answers: [
            { text: "Programming Language", correct: false },
            { text: "Markup Language", correct: true },
            { text: "Database", correct: false },
            { text: "Operating System", correct: false }
        ]
    },
    {
        question: "What is CSS used for?",
        answers: [
            { text: "Styling web pages", correct: true },
            { text: "Storing data", correct: false },
            { text: "Gaming", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What is JavaScript?",
        answers: [
            { text: "Database", correct: false },
            { text: "Programming language for web", correct: true },
            { text: "Photo editor", correct: false },
            { text: "Server", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        score++;
        selectedBtn.style.background = "green";
    } else {
        selectedBtn.style.background = "red";
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = "Quiz Finished!";
    scoreText.innerText = `Your Score: ${score} / ${questions.length}`;
    nextButton.innerText = "Restart";

    nextButton.addEventListener("click", startQuiz);
}

startQuiz();