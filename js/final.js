async function showFinalModal() {
    const element = document.querySelector('#score-content');

    const jsonString = localStorage.getItem('quizResult');
    const myObject = JSON.parse(jsonString);

    try {
        const response = await fetch(
            "https://viktorina-backend.onrender.com/submit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: myObject.name,
                    total: myObject.score,
                    correct: myObject.score - myObject.wrong,
                    wrong: myObject.wrong
                })
            }
        );

        console.log(await response.json());

    } catch (err) {
        console.error("Ошибка отправки:", err);
    }

    element.innerHTML = `
        <div class="score-content">
            <h2>🏁 Квиз завершён</h2>

            <p><b>${myObject.name}</b></p>
            <p>Всего вопросов ${myObject.score}</p>
            <p>✔ Правильных ответов: ${myObject.score - myObject.wrong}</p>
            <p>❌ Неправильных ответов: ${myObject.wrong}</p>
        </div>
    `;
}

showFinalModal();
