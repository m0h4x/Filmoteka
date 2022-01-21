const addToLocalStorage = (key, value) => {
  let currArray = [];

  if (localStorage.getItem(key) !== null) {
    currArray = [...JSON.parse(localStorage.getItem(key))];
  }

  // check for unique value
  if (!currArray.includes(value)) {
    currArray.push(value);
  }

  try {
    const serializedState = JSON.stringify(currArray);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const checkItemInLocalStorage = (key, value) => {
  const currArray = localStorage.getItem(key) ? [...JSON.parse(localStorage.getItem(key))] : [];
  return currArray.includes(value);
};

const removeFromLocalStorage = (key, value) => {
  let currArray = [];

  if (localStorage.getItem(key) !== null) {
    currArray = [...JSON.parse(localStorage.getItem(key))];
  }

  // check for existance
  if (currArray.includes(value)) {
    const item = currArray.indexOf(value);
    currArray.splice(item, 1);
  }

  try {
    const serializedState = JSON.stringify(currArray);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export { addToLocalStorage, checkItemInLocalStorage, removeFromLocalStorage };
