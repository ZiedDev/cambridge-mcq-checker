let allSubjects;

fetch('./subjects_ms.json')
    .then((response) => response.json())
    .then((json) => allSubjects = json);

// dom elements
const subjectSelectionMenu = document.getElementById("subject-selection-menu");
const yearSelectionMenu = document.getElementById("year-selection-menu");
const sessionSelectionMenu = document.getElementById("session-selection-menu");
const variantSelectionMenu = document.getElementById("variant-selection-menu");
const solvingMenu = document.getElementById("solving-menu");
const answerSheet = document.getElementById("answer-sheet");

// variables
let subject;
let year;
let session;
let variant;

function selectSubject(subjectId) {
    subject = subjectId;
    subjectSelectionMenu.classList.add("hidden");
    yearSelectionMenu.classList.remove("hidden");
}

function selectYear(yearId) {
    year = yearId;
    yearSelectionMenu.classList.add("hidden");
    sessionSelectionMenu.classList.remove("hidden");
}

function selectSession(sessionID) {
    session = sessionID;
    sessionSelectionMenu.classList.add("hidden");

    variantSelectionMenu.classList.remove("hidden");

    // if (sessionID == "m") {
    //     createAnswerSheet()
    // } else {
    // }
}

function variantSession(variantID) {
    variant = variantID;

    checkIfThisExamExist(subject, year, session, variant);
}

function checkIfThisExamExist(subject, year, session, variant) {
    if (allSubjects[subject][year][session][variant - 1] == null) {
        return
    } else {
        variantSelectionMenu.classList.add("hidden");
        solvingMenu.classList.remove("hidden");

        createAnswerSheet();
    }
}

let myAnswers = {
    1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "", 25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", 32: "", 33: "", 34: "", 35: "", 36: "", 37: "", 38: "", 39: "", 40: ""
}

function createAnswerSheet() {
    for (let i = 0; i < 40; i++) {
        const createAQuestion = `<h1 class="question-number" id="question-number-${i + 1}">${i + 1}</h1>

        <h1 class="option" id="question-${i + 1}-option-a" onclick="chooseAnOption('a', '${i + 1}')">A</h1>

        <h1 class="option" id="question-${i + 1}-option-b" onclick="chooseAnOption('b', '${i + 1}')">B</h1>

        <h1 class="option" id="question-${i + 1}-option-c" onclick="chooseAnOption('c', '${i + 1}')">C</h1>

        <h1 class="option" id="question-${i + 1}-option-d" onclick="chooseAnOption('d', '${i + 1}')">D</h1>`

        answerSheet.innerHTML += createAQuestion;
    }
}

function chooseAnOption(optionLetter = "", questionNum) {
    const selectedOption = document.getElementById(`question-${questionNum}-option-${optionLetter.toLowerCase()}`);

    const optionA = document.getElementById(`question-${questionNum}-option-a`);
    const optionB = document.getElementById(`question-${questionNum}-option-b`);
    const optionC = document.getElementById(`question-${questionNum}-option-c`);
    const optionD = document.getElementById(`question-${questionNum}-option-d`);

    optionA.classList.remove("option-selected");
    optionB.classList.remove("option-selected");
    optionC.classList.remove("option-selected");
    optionD.classList.remove("option-selected");

    selectedOption.classList.add("option-selected");

    myAnswers[questionNum] = optionLetter.toLowerCase();
}


function submitButton() {
    let answersString = ""

    if (isAnswerCheckBoxChecked == false) {

        for (let i = 0; i < 40; i++) {
            if (myAnswers[i + 1] == "") {
                alert(`Hey you missed num ${i + 1}`);
                return
            }

            for (let i = 0; i < 40; i++) {
                answersString += myAnswers[i + 1];
            }
        }
    }
    checkResult(answersString.toUpperCase());
}

const resultCounter = document.getElementById("result-counter");

function checkResult(answer) {
    let countCorrectAnswers = 0;
    let userAnswer = answer.split("", 40);
    let markScheme = allSubjects[subject][year][session][variant - 1].split("", 40)
    let answerString = answerTextBox.value.toUpperCase().split("", 40);

    console.log(answerString);

    if (isAnswerCheckBoxChecked == false) {
        for (let i = 0; i < 40; i++) {
            if (userAnswer[i] == markScheme[i]) {
                countCorrectAnswers++;
                correctOption(i + 1);
            } else {
                wrongOption(markScheme[i], i + 1);
            }
        }

        resultCounter.textContent = `${countCorrectAnswers} / 40`;
    } else {
        for (let i = 0; i < 40; i++) {
            if (answerString[i] == markScheme[i]) {
                countCorrectAnswers++;
                correctOption(i + 1);
            } else {
                wrongOption(markScheme[i], i + 1);
            }
        }

        resultCounter.textContent = `${countCorrectAnswers} / 40`;

    }
}

function correctOption(questionNum) {
    const questionNumber = document.getElementById(`question-number-${questionNum}`);

    questionNumber.classList.remove("correct-option");
    questionNumber.classList.remove("wrong-option");

    questionNumber.classList.add("correct-option");
}

function wrongOption(correctOption = "", questionNum) {
    const questionNumber = document.getElementById(`question-number-${questionNum}`);

    questionNumber.classList.remove("correct-option");
    questionNumber.classList.remove("wrong-option");

    questionNumber.classList.add("wrong-option");

    const optionA = document.getElementById(`question-${questionNum}-option-a`);
    const optionB = document.getElementById(`question-${questionNum}-option-b`);
    const optionC = document.getElementById(`question-${questionNum}-option-c`);
    const optionD = document.getElementById(`question-${questionNum}-option-d`);

    optionA.classList.remove("corrected-option");
    optionB.classList.remove("corrected-option");
    optionC.classList.remove("corrected-option");
    optionD.classList.remove("corrected-option");

    const correctOptioned = document.getElementById(`question-${questionNum}-option-${correctOption.toLowerCase()}`);

    correctOptioned.classList.add("corrected-option");
}

const answerTextBox = document.getElementById("answer-text-box");
const answerCheckBox = document.getElementById("scroll_toggle");

let isAnswerCheckBoxChecked = false;

function switchBoxes() {
    if (isAnswerCheckBoxChecked) {
        isAnswerCheckBoxChecked = false;
    } else {
        isAnswerCheckBoxChecked = true;
    }

    console.log(isAnswerCheckBoxChecked);
}