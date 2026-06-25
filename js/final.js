function showFinalModal() {
    const element = document.querySelector('#score-content');

    const jsonString = localStorage.getItem('quizResult');
    const myObject = JSON.parse(jsonString);
    const xp = myObject.xp
    element.innerHTML = `
        <div class="score-content">
            <h2>🏁 Квиз завершён</h2>

            <p><b>${myObject.name}</b></p>
            <p>Правильных овтетов ${myObject.score} из ${myObject.total}</p>
            <h1>Ты набрал ${myObject.xp} очков, твой уровень ${
            myObject.xp < 200 ? "Нажал не туда 🐣" :
            myObject.xp < 400 ? "Любитель кнопки «Далее» 🖱️" :
            myObject.xp < 600 ? "Расшифровщик холодильников 🧊" :
            myObject.xp < 800 ? "Подозрительно умный 🕵️" :
            myObject.xp < 1000 ? "Не попался на «Вы выиграли айфон» 📱" :
            myObject.xp < 1150 ? "Мастер сложных букв 🧠" :
            myObject.xp < 1250 ? "Человек, который понял шифр 😎" :
            myObject.xp < 1350 ? "Тот самый друг, которому дают пароль 🔐" :
            "Гроза мошенников и повелитель Цезаря сиксеванидце 👑"

            } </h1>
        </div>
    `;

    fetch("https://viktorina-backend.onrender.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: myObject.name,
            score: myObject.score,
            wrong: myObject.wrong,
            total: myObject.total,
            xp: myObject.xp
        })
    })
    .then(res => res.json())
    .then(data => console.log("server response:", data))
    .catch(err => console.error("fetch error:", err));
}

showFinalModal()
