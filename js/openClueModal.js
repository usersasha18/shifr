const ClueButton = document.querySelector('.clue-button');
const ClueModalIntro = document.querySelector(".clue-modal-intro-overlay")

ClueButton.addEventListener('click', ()=> {
    ClueModalIntro.classList.add('active')

})

ClueModalIntro.addEventListener("click", () => {
    ClueModalIntro.classList.remove('active')
})


