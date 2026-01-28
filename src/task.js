import { storeItem } from "./storage";

// Categories Class
class Category {
  static #categories = [];

  constructor(name) {
    this.name = name;
    this.categoryId = crypto.randomUUID();
    this.categoryTasks = [];
  }

  static addCategory(category) {
    this.#categories.push(category);
  }

  static getCategories() {
    return [...this.#categories];
  }

  static getCategoryByName(name) {
    return this.#categories.find((category) => category.name === name);
  }

  static removeCategory(categoryId) {
    this.#categories = this.#categories.filter(
      (category) => category.categoryId !== categoryId,
    );
  }

  addTaskToCategory(task) {
    this.categoryTasks.push(task);
  }

  removeTaskFromCategory(taskId) {
    this.categoryTasks = this.categoryTasks.filter(
      (task) => task.ID !== taskId,
    );
  }
}

// Main Task class
class Task {
  static #tasks = [];

  constructor(title, description, dueDate, priority, category) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.ID = crypto.randomUUID();
  }

  static setTasks(tasksData) {
    // Convert plain objects from JSON back into Task instances
    this.#tasks = tasksData.map(
      (data) =>
        new Task(
          data.title,
          data.description,
          data.dueDate,
          data.priority,
          data.category,
        ),
    );
    // Restore the original IDs (since new Task() creates new IDs)
    this.#tasks.forEach((task, index) => {
      task.ID = tasksData[index].ID;
    });
  }

  static addTask(task) {
    this.#tasks.push(task);
    // Also add to the category if it exists
    const categoryObj = Category.getCategoryByName(task.category);
    if (categoryObj) {
      categoryObj.addTaskToCategory(task);
    }
    storeItem("tasks", this.#tasks);
  }

  static removeTask(taskId) {
    const taskToRemove = this.#tasks.find((task) => task.ID === taskId);
    if (taskToRemove) {
      // Remove from category
      const categoryObj = Category.getCategoryByName(taskToRemove.category);
      if (categoryObj) {
        categoryObj.removeTaskFromCategory(taskId);
      }
      // Remove from tasks
      this.#tasks = this.#tasks.filter((task) => task.ID !== taskId);
      storeItem("tasks", this.#tasks);
    }
  }

  static getTasks() {
    return [...this.#tasks];
  }

  static getTaskById(taskId) {
    return this.#tasks.find((task) => task.ID === taskId);
  }

  static editTask(taskId, updatedObj) {
    const taskToEdit = this.#tasks.find((task) => task.ID === taskId);
    if (taskToEdit) {
      taskToEdit.title = updatedObj.title || taskToEdit.title;
      taskToEdit.description = updatedObj.description || taskToEdit.description;
      taskToEdit.dueDate = updatedObj.dueDate || taskToEdit.dueDate;
      taskToEdit.priority = updatedObj.priority || taskToEdit.priority;
      taskToEdit.category = updatedObj.category || taskToEdit.category;
      storeItem("tasks", this.#tasks);
    }
  }

  static getTasksByCategory(categoryName) {
    const categoryObj = Category.getCategoryByName(categoryName);
    return categoryObj ? [...categoryObj.categoryTasks] : [];
  }

  static getTasksByPriority(priority) {
    return this.#tasks.filter((task) => task.priority === priority);
  }
}

export { Task, Category };
