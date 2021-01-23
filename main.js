const problemElement = document.querySelector(".problem");
const ourForm = document.querySelector(".our-form");
const ourField = document.querySelector(".our-field");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAlloved = document.querySelector(".mistakes-allowed");
const progressBar = document.querySelector(".progress-inner");
const endMessage = document.querySelector(".end-message");
const resetButton = document.querySelector(".reset-button");

let state = {
    score: 0,
    wrongAnswers: 0
}

function updateProblem() {
    state.currentProblem = generateProblem();
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`;
    ourField.value = "";                //nakon submita da se očisti polje
    ourField.focus();                   //nakon toga da fokus ostane u input polju
}

updateProblem();

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+', '-', 'x'][generateNumber(2)]
    }
}

ourForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault(); 

    let correctAnswer;
    const p = state.currentProblem;
    if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo;
    if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo;
    if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo;


    if (parseInt(ourField.value, 10) === correctAnswer){
        state.score++
        pointsNeeded.textContent = 10 - state.score;
        updateProblem();
        renderProgressBar();
    } else {
        state.wrongAnswers++
        mistakesAlloved.textContent = 2 - state.wrongAnswers;
        problemElement.classList.add("animate-wrong");
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 400);
    }

    checkLogic();
}

function checkLogic() {
    // ako pobjediš
    if (state.score === 10) {
        endMessage.textContent = "Congrats! You won.";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => resetButton.focus(), 331);
    }
    // ako izgubiš
    if (state.wrongAnswers === 3) {
        endMessage.textContent = "Sorry, you lose.";
        document.body.classList.add("overlay-is-open");
        setTimeout(() => resetButton.focus(), 331);
    }
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
    document.body.classList.remove("overlay-is-open");
    updateProblem();
    state.score = 0;
    state.wrongAnswers = 0;
    pointsNeeded.textContent = 10;
    mistakesAlloved.textContent = 2;
    renderProgressBar();
}

function renderProgressBar() {
    progressBar.style.transform = `scaleX(${state.score / 10})`;     //kada se score podijeli sa 10 dobije se npr. 0.5
}
