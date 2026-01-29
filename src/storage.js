function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const isAvailable = storageAvailable("localStorage");

function saveData(key, data) {
  if (isAvailable) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function loadData(key) {
  if (isAvailable) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export { saveData, loadData, isAvailable };
