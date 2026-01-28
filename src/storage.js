import { Task } from "./task";

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
      storage &&
      storage.length !== 0
    );
  }
}
const isStorageAvailable = storageAvailable(localStorage);

function loadTasks() {
  if (isStorageAvailable) {
    if (localStorage.getItem("tasks")) {
      const tasksData = JSON.parse(localStorage.getItem("tasks"));
      Task.setTasks(tasksData);
    } else {
      const tasks = Task.getTasks();
      localStorage.setItem("tasks", tasks);
    }
  }
}

function storeItem(item, value) {
  if (isStorageAvailable) {
    try {
      const stringed = JSON.stringify(value);
      localStorage.setItem(item, stringed);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  } else {
    console.warn("localStorage is not available");
  }
}

// Load tasks when this module is imported
loadTasks();

export { storeItem, isStorageAvailable };
