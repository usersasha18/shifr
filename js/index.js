const toggleButton = document.querySelector('#changeTheme');
const root = document.querySelector('#root');
const answers = document.querySelector('#answers');
const modalScore = document.querySelector(".modal-score");
const modalOverlay = document.querySelector('.modal-overlay');

const xpCount = document.querySelector('.xp-count').textContent = '0';
const questionBarFill = document.querySelector('.question-bar-fill').style.width = '0';
const progressText = document.querySelector('#progress-text').textContent = '0';

let score = 0;
let answerIndex = 0;
let answered = 0
let xp = 0;
let wrong = 0;


toggleButton.addEventListener('click', checkAnswer);

showQuestion();

function showQuestion() {
    if (answerIndex >= data.length) return;

    const task = data[answerIndex];

    answers.innerHTML = "";

    root.innerHTML = `
        <span class='root-text'>${task.question}</span><br>
        ${task.text}
    `;

    // === CHOICE ===
    if (task.type === "choice") {
        for (const [index, value] of task.answers.entries()) {
            answers.innerHTML += `
                <label class="answer-tile">
                    <input type="radio" name="answer" value="${index}">
                    <span>${value}</span>
                </label>
            `;
        }
    }

    // === INPUT ===
    if (task.type === "input") {
        answers.innerHTML = `
            <input 
                type="text" 
                id="textAnswer" 
                placeholder="Введите ответ"
                class="text-input"
            >
        `;
        }
    };


function checkAnswer() {
    const task = data[answerIndex];

    toggleButton.disabled = true;

    // ===================
    // INPUT
    // ===================
    if (task.type === "input") {

        const answerInput = document.querySelector(".text-input");

        if (!answerInput) return;

        const userAnswer =
            answerInput.value.trim().toUpperCase();

        const correctAnswer =
            task.correctAnswer.toUpperCase();

        if (userAnswer === correctAnswer) {

            score++;
            xp += 100;

            answerInput.classList.add("correct-border");

        } else {

            wrong++;
            xp -= 50;

            if (xp < 0) xp = 0;

            answerInput.classList.add("incorrect-border");

            showRetryModal();
        }

    }

    // ===================
    // RADIO
    // ===================
    if (task.type === "choice") {

        const answersList =
            document.querySelectorAll(
                'input[name="answer"]'
            );

        let selected = null;

        for (const a of answersList) {
            if (a.checked) {
                selected = a;
                break;
            }
        }

        if (!selected) return;

        const radioAnswer =
            Number(selected.value);

        const allLabels =
            document.querySelectorAll(
                ".answer-tile"
            );

        if (radioAnswer === task.correct) {

            score++;
            xp += 100;

            allLabels[radioAnswer]
                .classList.add("correct");

        } else {

            wrong++;
            xp -= 50;

            if (xp < 0) xp = 0;

            allLabels[radioAnswer]
                .classList.add("wrong");

            showRetryModal();
        }
    }
        const progress = ((answerIndex + 1) / data.length) * 100;

        document.querySelector('.question-bar-fill').style.width =
            progress + '%';

        document.querySelector('#progress-text').textContent =
            Math.round(progress) + '%';

        document.querySelector('.xp-count').textContent =
            xp + ' XP';

    // общий переход
    setTimeout(() => {
        answerIndex++;

        toggleButton.disabled = false;

        showQuestion();

        checkFinish();

    }, 700);
}

function showRetryModal() {
    modalScore.style.display = "flex";
    modalOverlay.classList.add('active');
    modalScore.classList.add('active');
    modalScore.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-text-title">❌Осторожно</h2>
                <p> 
                    <span class="sub-text-modal">Хорошенько думай над вопросами!)</span>
                </p>
                <button id="close">Вернуться к вопросам.</button>
            </div>
        `
    ;

    document
        .querySelector('#close')
        .addEventListener('click', () => {
            modalScore.style.display = "none";
            modalOverlay.classList.remove('active');
            modalScore.classList.remove('active');
        });
}


function closeModal() {
    modalScore.style.display = "none";
    modalScore.classList.remove('showModal')
}

function checkFinish() {
    if (answerIndex >= data.length) {
            localStorage.setItem(
            "quizResult",
            JSON.stringify({
                score: score,
                wrong: wrong,
                total: data.length,
                xp: xp,
                name: localStorage.getItem("username")
            })
        );
        window.location.href = "final.html"

    }
}





