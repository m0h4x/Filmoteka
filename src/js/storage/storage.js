const addToLocalStorage = (key, value) => {
  let currArray = [];

  // console.log(key, value.id);

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
  return currArray.filter(e => e.id === value).length;
};

const removeFromLocalStorage = (key, value) => {
  let currArray = [];

  if (localStorage.getItem(key) !== null) {
    currArray = [...JSON.parse(localStorage.getItem(key))];
  }

  // check for existance
  if (currArray.filter(e => e.id === value.id).length) {
    const item = currArray.findIndex(e => e.id === value.id);
    currArray.splice(item, 1);
  }

  try {
    const serializedState = JSON.stringify(currArray);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const getItemsInLocalStorage = key => {
  try {
    return localStorage.getItem(key) ? [...JSON.parse(localStorage.getItem(key))] : [];
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export {
  addToLocalStorage,
  checkItemInLocalStorage,
  removeFromLocalStorage,
  getItemsInLocalStorage,
};
