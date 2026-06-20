async function showFinalModal() {
  const element = document.querySelector('#score-content');

  const jsonString = localStorage.getItem('quizResult');
  const myObject = JSON.parse(jsonString);

  element.innerHTML = `
    <div class="score-content">
      <h2>🏁 Квиз завершён</h2>

      <p><b>${myObject.name}</b></p>
      <p>Всего вопросов ${myObject.score}</p>
      <p>✔ Правильных ответов: ${myObject.score - myObject.wrong}</p>
      <p>❌ Неправильных ответов: ${myObject.wrong}</p>
    </div>
  `;

  // 2. ПОТОМ отправляем на сервер (НЕ БЛОКИРУЕМ UI)
  try {
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
    }).then(res => res.json())
      .then(data => console.log("server:", data))
      .catch(err => console.error("fetch error:", err));

  } catch (err) {
    console.error(err);
  }
}
