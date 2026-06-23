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
                myObject.xp < 200 ? "Новичок 🐣" :
                myObject.xp < 400 ? "Ученик 🧑‍💻" :
                myObject.xp < 600 ? "Стажёр 🕵️" :
                myObject.xp < 800 ? "Начинающий хакер 🔓" :
                myObject.xp < 1000 ? "Хакер ⚡" :
                myObject.xp < 1150 ? "Опытный хакер 🧠" :
                myObject.xp < 1250 ? "Кибер-специалист 🛡️" :
                myObject.xp < 1350 ? "Элитный хакер 💀" :
                "Легенда кибербезопасности 👑"
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
            wrong: myObject.wrong
        })
    })
    .then(res => res.json())
    .then(data => console.log("server response:", data))
    .catch(err => console.error("fetch error:", err));
}

showFinalModal()
