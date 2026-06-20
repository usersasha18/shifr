function showFinalModal() {
  const element = document.querySelector('#score-content');

  const jsonString = localStorage.getItem('quizResult');
  const myObject = JSON.parse(jsonString);
  console.log(myObject)
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
showFinalModal()
