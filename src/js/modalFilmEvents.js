const addToWatchedHandler = id => {
  const elem = event.target;
  const currText = elem.textContent;

  // console.log(id);
  elem.classList.toggle('active');

  if (currText.toLowerCase() === 'add to watched') {
    elem.textContent = 'remove from watched';
    addToLocalStorage(FILMS_IN_WATCHED, id);
  } else {
    elem.textContent = 'add to watched';
    removeFromLocalStorage(FILMS_IN_WATCHED, id);
  }
};

const addToQueueHandler = id => {
  const elem = event.target;
  const currText = elem.textContent;

  // console.log(id);
  elem.classList.toggle('active');

  if (currText.toLowerCase() === 'add to queue') {
    elem.textContent = 'remove from queue';
    addToLocalStorage(FILMS_IN_QUEUE, id);
  } else {
    elem.textContent = 'add to queue';
    removeFromLocalStorage(FILMS_IN_QUEUE, id);
  }
};
