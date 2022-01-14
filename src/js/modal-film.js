const closeBtn = document.querySelector('.modal__close-icon');
const backdrop = document.querySelector('.modal__backdrop');
closeBtn.addEventListener('click', () => {
  backdrop.classList.remove('active');
});
