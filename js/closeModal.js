document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.intro-box');
    setTimeout(()=>{
        overlay.classList.add('active');
    }, 1000)

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
    });
});