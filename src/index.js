import "./styles.css";
import { TodoList } from "./task";
import DOM from "./dom";

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  // Load Data
  TodoList.init();

  // Initialize DOM
  DOM.init();
});
