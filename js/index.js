const toggleButton = document.querySelector('#changeTheme');
const root = document.querySelector('#root');
const answers = document.querySelector('#answers');
const modalScore = document.querySelector(".modal-score");

let score = 0;
let answerIndex = 0;


let wrong = 0;


toggleButton.addEventListener('click', checkAnswer);

showQuestion();

function showQuestion() {
    if (answerIndex < data.length) {
        answers.innerHTML = "";
        root.innerHTML = data[answerIndex]['question'] + "<br>" + data[answerIndex]['text'];
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

        allLabels[radioAnswer - 1].classList.add("correct");

        setTimeout(() => {
            answerIndex++;
            toggleButton.disabled = false;
            showQuestion();
            checkFinish();
        }, 700);

    } else {

        wrong++;

        allLabels[radioAnswer - 1].classList.add("wrong");

        showRetryModal();

        setTimeout(() => {
            toggleButton.disabled = false;
        }, 500);
    }
}

function showRetryModal() {
    modalScore.style.display = "flex";

    modalScore.innerHTML = `
        <div class="modal-content">
            <h2>❌Осторожно</h2>
            <p>Подумай ещё:
                <ul>
                  <li>кто отправитель?</li>
                  <li>просят ли пароль?</li>
                  <li>есть ли давление или срочность?</li>
                  <li>можно ли проверить информацию?</li>
                </ul>
            </p>
            <button id="close">Вернуться к предыдущему вопросу.</button>
        </div>
    `;

    document
        .querySelector('#close')
        .addEventListener('click', () => {
            modalScore.style.display = "none";
        });
}

function showModalResult() {
    modalScore.classList.add("showModal");
    modalScore.style.opacity = 1;
    const resultHTML = `
        <h2>Ваш скор ${score} из ${data.length}</h2>
        <button id="close">Закрыть окно</button>
    `;
    modalScore.innerHTML = resultHTML;


    const closeButton = document.querySelector('#close');
    closeButton.addEventListener("click", closeModal);
}

function closeModal() {
    modalScore.style.display = "none";
    modalScore.classList.remove('showModal')
}

function checkFinish() {
    if (answerIndex >= data.length) {
        showFinalModal();
    }
}
function showFinalModal() {

    window.location.href = "final.html"
}
