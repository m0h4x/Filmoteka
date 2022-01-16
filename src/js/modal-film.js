const closeBtn = document.querySelector('.modal__close-btn');
const backdrop = document.querySelector('.modal__backdrop');
closeBtn.addEventListener('click', () => {
  backdrop.classList.remove('active');
});
