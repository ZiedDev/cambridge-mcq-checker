// Json;
let olSubjects;
fetch('./OL_subjects_ms.json')
    .then((response) => response.json())
    .then((json) => olSubjects = json);

let alSubjects;
fetch('./AL_subjects_ms.json')
    .then((response) => response.json())
    .then((json) => alSubjects = json);

// dom elements
const subjectSelectionMenu = document.getElementById("subject-selection-menu");
const yearSelectionMenu = document.getElementById("year-selection-menu");
const yearSelections = document.getElementById("year-selections");
const sessionSelectionMenu = document.getElementById("session-selection-menu");
const sessionSelections = document.getElementById("session-selections");
const variantSelectionMenu = document.getElementById("variant-selection-menu");
const variantSelections = document.getElementById("variant-selections");
const solvingMenu = document.getElementById("solving-menu");
const answerSheet = document.getElementById("answer-sheet");
const resultCounter = document.getElementById("result-counter");
const resultSection = document.getElementById("result-section");
const answerTextBox = document.getElementById("answer-text-box");
const answerCheckBox = document.getElementById("scroll_toggle");
const answerTextBoxMenu = document.getElementById("answer-text-box-menu");

// variables
let olOrAl;
let subject;
let year;
let session;
let variant;
let numberOfQuestions = 0;
let isAnswerCheckBoxChecked = false;
let myAnswers = {
    1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "", 18: "", 19: "", 20: "", 21: "", 22: "", 23: "", 24: "", 25: "", 26: "", 27: "", 28: "", 29: "", 30: "", 31: "", 32: "", 33: "", 34: "", 35: "", 36: "", 37: "", 38: "", 39: "", 40: ""
}
let ImgsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function selectSubject(subjectId, olOrAlId) {
    subject = subjectId;
    olOrAl = olOrAlId;
    subjectSelectionMenu.classList.add("hidden");
    yearSelectionMenu.classList.remove("hidden");

    createYearList(subject, olOrAl);
    changePath(olOrAl, subject);
}

function selectYear(yearId) {
    year = yearId;
    yearSelectionMenu.classList.add("hidden");
    sessionSelectionMenu.classList.remove("hidden");

    createSessionList(subject, year, olOrAl)
    changePath(olOrAl, subject, year);
}

function selectSession(sessionId) {
    session = sessionId;
    sessionSelectionMenu.classList.add("hidden");
    variantSelectionMenu.classList.remove("hidden");

    createVariantsList(subject, year, session, olOrAl)
    changePath(olOrAl, subject, year, session);
}

function variantSession(variantId) {
    variant = variantId;

    checkIfThisExamExist(subject, year, session, variant, olOrAl);
    changePath(olOrAl, subject, year, session, variant);
}

function createSessionList(subject, year, olOrAlId) {
    let randImgsArray = shuffle(ImgsArray);

    let numberOfSessions = 0;
    sessionSelections.innerHTML = ""

    if (olOrAlId == "ol") {
        numberOfSessions = Object.keys(olSubjects[subject][year]).length;

        for (let i = 0; i < numberOfSessions; i++) {
            if (olSubjects[subject] != undefined) {
                let createASession = `
                <div class="card hasHover" id="${Object.keys(olSubjects[subject][year])[i]}" onclick="selectSession('${Object.keys(olSubjects[subject][year])[i]}')">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
                    <h2>${Object.keys(olSubjects[subject][year])[i] == "m" ? "February - March" : Object.keys(olSubjects[subject][year])[i] == "s" ? "May - June" : "October - November"}</h2>
                </div>`

                sessionSelections.innerHTML += createASession;
            }
        }
    } else if (olOrAlId == "al") {
        numberOfSessions = Object.keys(alSubjects[subject][year]).length;

        for (let i = 0; i < numberOfSessions; i++) {
            if (alSubjects[subject] != undefined) {
                let createASession = `
                <div class="card hasHover" id="${Object.keys(alSubjects[subject][year])[i]}" onclick="selectSession('${Object.keys(alSubjects[subject][year])[i]}')">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
                    <h2>${Object.keys(alSubjects[subject][year])[i] == "m" ? "February - March" : Object.keys(alSubjects[subject][year])[i] == "s" ? "May - June" : "October - November"}</h2>
                </div>`

                sessionSelections.innerHTML += createASession;
            }
        }
    }
}

function createYearList(subject, olOrAlId) {
    let randImgsArray = shuffle(ImgsArray);

    let numberOfYears = 0;
    yearSelections.innerHTML = ""

    if (olOrAlId == "ol") {
        numberOfYears = Object.keys(olSubjects[subject]).length;

        for (let i = 0; i < numberOfYears; i++) {
            if (olSubjects[subject] != undefined) {
                let createAYear = `
                <div class="card hasHover" id="${2017 + i}" onclick="selectYear('${2017 + i}')">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
                    <h2>${2017 + i}</h2>
                </div>`

                yearSelections.innerHTML += createAYear;
            }
        }
    } else if (olOrAlId == "al") {
        numberOfYears = Object.keys(alSubjects[subject]).length;

        for (let i = 0; i < numberOfYears; i++) {
            if (alSubjects[subject] != undefined) {
                let createAYear = `
                <div class="card hasHover" id="${2017 + i}" onclick="selectYear('${2017 + i}')">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
                    <h2>${2017 + i}</h2>
                </div>`

                yearSelections.innerHTML += createAYear;
            }
        }
    }
}

function createVariantsList(subject, year, session, olOrAlId) {
    let randImgsArray = shuffle(ImgsArray);

    variantSelections.innerHTML = ""

    if (olOrAlId == "ol") {
        for (let i = 0; i < 3; i++) {
            if (olSubjects[subject][year][session][i] != null) {
                let createAVariant = `
                <div class="card" id="${i + 1}" onclick="variantSession(${i + 1})">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
    
                    <h2>${i + 1}</h2>
                </div>`

                variantSelections.innerHTML += createAVariant;
            }
        }
    } else if (olOrAlId == "al") {
        for (let i = 0; i < 3; i++) {
            if (alSubjects[subject][year][session][i] != null) {
                let createAVariant = `
                <div class="card" id="${i + 1}" onclick="variantSession(${i + 1})">
                    <div class="img-container">
                        <img src="./media/images/Random/${randImgsArray[i]}.jpg">
                    </div>
    
                    <h2>${i + 1}</h2>
                </div>`

                variantSelections.innerHTML += createAVariant;
            }
        }
    }
}

function goBack(goBackToWhat) {
    subjectSelectionMenu.classList.add("hidden");
    yearSelectionMenu.classList.add("hidden");
    sessionSelectionMenu.classList.add("hidden");
    variantSelectionMenu.classList.add("hidden");
    solvingMenu.classList.add("hidden")

    if (goBackToWhat == "session") {
        session = ""
        sessionSelectionMenu.classList.remove("hidden");
    } else if (goBackToWhat == "year") {
        year = ""
        yearSelectionMenu.classList.remove("hidden");
    } else if (goBackToWhat == "subject") {
        subject = ""
        olOrAl = ""
        subjectSelectionMenu.classList.remove("hidden");
    } else if (goBackToWhat == "variant") {
        variantSelectionMenu.classList.remove("hidden");
    }
}

function checkIfThisExamExist(subject, year, session, variant, olOrAlId) {
    if (olOrAlId == "ol") {
        if (olSubjects[subject][year][session][variant - 1] == null) {
            return
        } else {
            variantSelectionMenu.classList.add("hidden");
            solvingMenu.classList.remove("hidden");

            changeTheNumberOfQuestions(subject, year, session, variant, olOrAl);

            createAnswerSheet();
        }
    } else if (olOrAlId == "al") {
        if (alSubjects[subject][year][session][variant - 1] == null) {
            return
        } else {
            variantSelectionMenu.classList.add("hidden");
            solvingMenu.classList.remove("hidden");

            changeTheNumberOfQuestions(subject, year, session, variant, olOrAl);

            createAnswerSheet();
        }
    }
}

function changeTheNumberOfQuestions(subject, year, session, variant, olOrAlId) {
    if (olOrAlId == "ol") {
        numberOfQuestions = olSubjects[subject][year][session][variant - 1].length;
    } else if (olOrAlId == "al") {
        numberOfQuestions = alSubjects[subject][year][session][variant - 1].length;
    }
    answerSheet.style.gridTemplateRows = `repeat(${numberOfQuestions}, 1fr)`;
}

function createAnswerSheet() {
    answerSheet.innerHTML = "";

    for (let i = 0; i < numberOfQuestions; i++) {
        const createAQuestion = `<h1 class="question-number" id="question-number-${i + 1}">${i + 1}</h1>

        <h1 class="option hasHover" id="question-${i + 1}-option-a" onclick="chooseAnOption('a', '${i + 1}')">A</h1>

        <h1 class="option hasHover" id="question-${i + 1}-option-b" onclick="chooseAnOption('b', '${i + 1}')">B</h1>

        <h1 class="option hasHover" id="question-${i + 1}-option-c" onclick="chooseAnOption('c', '${i + 1}')">C</h1>

        <h1 class="option hasHover" id="question-${i + 1}-option-d" onclick="chooseAnOption('d', '${i + 1}')">D</h1>`

        answerSheet.innerHTML += createAQuestion;
        resultCounter.textContent = `0 / ${numberOfQuestions}`;
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

        for (let i = 0; i < numberOfQuestions; i++) {
            if (myAnswers[i + 1] == "") {
                alert(`Hey you missed num ${i + 1}`);
                return
            }

            for (let i = 0; i < numberOfQuestions; i++) {
                answersString += myAnswers[i + 1];
            }
        }
    }
    checkResult(answersString.toUpperCase());
}

function checkResult(answer) {
    let countCorrectAnswers = 0;
    let userAnswer = answer.split("", numberOfQuestions);
    let markScheme = olOrAl == "ol" ? olSubjects[subject][year][session][variant - 1].split("", numberOfQuestions) : alSubjects[subject][year][session][variant - 1].split("", numberOfQuestions);
    let answerString = answerTextBox.value.toUpperCase().split("", numberOfQuestions);

    if (isAnswerCheckBoxChecked == false) {
        for (let i = 0; i < numberOfQuestions; i++) {
            if (markScheme[i] != "Q") {
                if (userAnswer[i] == markScheme[i]) {
                    countCorrectAnswers++;
                    correctOption(i + 1);
                } else {
                    wrongOption(markScheme[i], i + 1);
                }
            } else {
                countCorrectAnswers++;
                discountedOption(i + 1);
            }
        }

        resultCounter.textContent = `${countCorrectAnswers} / ${numberOfQuestions}`;
    } else {
        for (let i = 0; i < numberOfQuestions; i++) {
            if (markScheme[i] != "Q") {
                if (answerString[i] == markScheme[i]) {
                    countCorrectAnswers++;
                    correctOption(i + 1);
                } else {
                    wrongOption(markScheme[i], i + 1);
                }
            } else {
                countCorrectAnswers++;
                discountedOption(i + 1);
            }

            chooseAnOption(answerString[i], i + 1)
        }

        resultCounter.textContent = `${countCorrectAnswers} / ${numberOfQuestions}`;
    }

    if (countCorrectAnswers == numberOfQuestions) {
        resultSection.classList.add("ace");
    }
}

function correctOption(questionNum) {
    const questionNumber = document.getElementById(`question-number-${questionNum}`);

    questionNumber.classList.remove("correct-option");
    questionNumber.classList.remove("wrong-option");
    questionNumber.classList.remove("discounted-option");

    questionNumber.classList.add("correct-option");
}

function wrongOption(correctOption = "", questionNum) {
    const questionNumber = document.getElementById(`question-number-${questionNum}`);

    questionNumber.classList.remove("correct-option");
    questionNumber.classList.remove("wrong-option");
    questionNumber.classList.remove("discounted-option");

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

function discountedOption(questionNum) {
    const questionNumber = document.getElementById(`question-number-${questionNum}`);

    questionNumber.classList.remove("correct-option");
    questionNumber.classList.remove("wrong-option");
    questionNumber.classList.remove("discounted-option");

    questionNumber.classList.add("discounted-option");
}

function switchBoxes() {
    if (isAnswerCheckBoxChecked) {
        isAnswerCheckBoxChecked = false;
        answerTextBoxMenu.classList.add("hidden");
        answerSheet.classList.remove("hidden");
    } else {
        isAnswerCheckBoxChecked = true;
        answerTextBoxMenu.classList.remove("hidden");
        answerSheet.classList.add("hidden");
    }
}

function changePath(olOrAlId = "", subject = "", year = "", session = "", variant = "") {
    const yearPath = document.getElementById("year-path");
    const sessionPath = document.getElementById("session-path");
    const variantPath = document.getElementById("variant-path");
    const solvingPath = document.getElementById("solving-path");

    if (variant != "") {
        solvingPath.textContent = `${olOrAlId.toUpperCase()} ${subject} > ${year} > ${session == "m" ? "February - March" : session == "s" ? "May - June" : "October - November"
            } > v${variant}`;

    } else if (session != "") {
        variantPath.textContent = `${olOrAlId.toUpperCase()} ${subject} > ${year} > ${session == "m" ? "February - March" : session == "s" ? "May - June" : "October - November"
            }`;
    } else if (year != "") {
        sessionPath.textContent = `${olOrAlId.toUpperCase()} ${subject} > ${year}`;
    } else if (subject != "") {
        yearPath.textContent = `${olOrAlId.toUpperCase()} ${subject}`;
    }
}

// Phone Hamburger menu behavior
const hamburgerIcon = document.getElementById("hamburger-icon ");
const headerBannerContent = document.getElementById("header-banner-Content");

const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");

let isOpenHamburgerMenu = false;

function openHamburgerMenu() {
    if (isOpenHamburgerMenu) {
        isOpenHamburgerMenu = false;
        openMenuButton.classList.remove("hidden");
        closeMenuButton.classList.add("hidden");
        headerBannerContent.style.animation = "closeMenu 100ms ease-in-out forwards";
    } else {
        isOpenHamburgerMenu = true;
        openMenuButton.classList.add("hidden");
        closeMenuButton.classList.remove("hidden");
        headerBannerContent.style.animation = "openMenu 100ms ease-in-out forwards";
    }
}

// Random imgs 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};


// Removes all the hover effects on touch devices
function watchForHover() {
    // lastTouchTime is used for ignoring emulated mousemove events
    let lastTouchTime = 0

    function enableHover() {
        if (new Date() - lastTouchTime < 500) return
        document.body.classList.add('hasHover')
    }

    function disableHover() {
        document.body.classList.remove('hasHover')
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date()
    }

    document.addEventListener('touchstart', updateLastTouchTime, true)
    document.addEventListener('touchstart', disableHover, true)
    document.addEventListener('mousemove', enableHover, true)

    enableHover()
}

watchForHover()