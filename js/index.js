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
    if (answerIndex < data.length) {
        answers.innerHTML = "";
        root.innerHTML = `${"<span class='root-text'>" + data[answerIndex]['question'] +"</span>" + "<br>" + data[answerIndex]['text']}`;
        for (const [index, value] of data[answerIndex]["answers"].entries()) {
            answers.innerHTML += `
            <label class="answer-tile">
                <input type="radio" name="answer" value="${index + 1}">
                <span>${value}</span>
            </label>
            `;
        }
    } else {
        return;
    }
}

function checkAnswer() {
    const answersList = document.querySelectorAll('input[name="answer"]');

    let selected = null;

    for (const a of answersList) {
        if (a.checked) {
            selected = a;
            break;
        }
    }

    if (!selected) return;

    const radioAnswer = parseInt(selected.value);
    const correctAnswer = data[answerIndex]['correct'];

    const allLabels = document.querySelectorAll('.answer-tile');

    toggleButton.disabled = true;

    if (radioAnswer === correctAnswer) {

        score++;
        xp += 100;

        allLabels[radioAnswer - 1].classList.add("correct");

    } else {

        wrong++;
        xp -= 50;
        if (xp < 0) xp = 0;

        allLabels[radioAnswer - 1].classList.add("wrong");

        showRetryModal();
    }

    // 🔥 ВСЕГДА обновляем прогресс одинаково
    const progress = ((answerIndex + 1) / data.length) * 100;

    document.querySelector('.question-bar-fill').style.width =
        progress + '%';

    document.querySelector('#progress-text').textContent =
        Math.round(progress) + '%';

    document.querySelector('.xp-count').textContent =
        xp + ' XP';

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





