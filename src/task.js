import { saveData, loadData } from "./storage";

class Task {
  constructor(title, description, dueDate, priority, category) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.category = category;
    this.completed = false;
    this.createdAt = new Date().toISOString();
  }
}

class Category {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

class TodoList {
  static tasks = [];
  static categories = [];

  static init() {
    const storedTasks = loadData("tasks");
    const storedCategories = loadData("categories");

    if (storedTasks) {
      this.tasks = storedTasks;
    } else {
      // Default Tasks
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0];

      this.tasks = [
        new Task(
          "Complete Project MVP",
          "Finish the core features and UI for the demo.",
          today,
          "high",
          "Work",
        ),
        new Task(
          "Refactor CSS",
          "Organize styles using CSS variables and flexbox.",
          tomorrow,
          "medium",
          "Work",
        ),
        new Task(
          "Buy Groceries",
          "Milk, eggs, and coffee beans.",
          tomorrow,
          "low",
          "Personal",
        ),
        new Task(
          "Push to GitHub",
          "Commit all recent changes and push to remote.",
          today,
          "high",
          "Work",
        ),
      ];
      this.saveTasks();
    }

    if (storedCategories) {
      this.categories = storedCategories;
    } else {
      // Default categories
      this.categories = [
        new Category("Work"),
        new Category("Personal"),
        new Category("Others"),
      ];
      this.saveCategories();
    }
  }

  static saveTasks() {
    saveData("tasks", this.tasks);
  }

  static saveCategories() {
    saveData("categories", this.categories);
  }

  // Task Methods
  static createTask(title, description, dueDate, priority, category) {
    const newTask = new Task(title, description, dueDate, priority, category);
    this.tasks.push(newTask);
    this.saveTasks();
    return newTask;
  }

  static deleteTasks(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  static deleteTask(taskId) {
    this.deleteTasks(taskId);
  }

  static updateTask(taskId, updatedFields) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedFields };
      this.saveTasks();
    }
  }

  static toggleTaskCompletion(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }

  static getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId);
  }

  static getTasks() {
    return this.tasks;
  }

  // Filter Methods
  static getTasksByFilter(filter) {
    if (filter === "all") return this.tasks;
    if (filter === "urgent")
      return this.tasks.filter((t) => t.priority === "high");

    // Check if filter matches a category name (case-insensitive)
    return this.tasks.filter(
      (t) => t.category.toLowerCase() === filter.toLowerCase(),
    );
  }

  // Category Methods
  static createCategory(name) {
    // Prevent duplicates
    if (
      !this.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())
    ) {
      const newCategory = new Category(name);
      this.categories.push(newCategory);
      this.saveCategories();
      return newCategory;
    }
    return null;
  }

  static getCategories() {
    return this.categories;
  }

  static deleteCategory(categoryId) {
    const category = this.categories.find((c) => c.id === categoryId);
    if (category) {
      // Remove tasks in this category
      this.tasks = this.tasks.filter((t) => t.category !== category.name);

      // Remove category
      this.categories = this.categories.filter((c) => c.id !== categoryId);

      this.saveTasks();
      this.saveCategories();
    }
  }

  static updateCategory(categoryId, newName) {
    const category = this.categories.find((c) => c.id === categoryId);
    if (category && newName) {
      const oldName = category.name;

      // Update tasks with new category name
      this.tasks.forEach((t) => {
        if (t.category === oldName) {
          t.category = newName;
        }
      });

      category.name = newName;

      this.saveTasks();
      this.saveCategories();
    }
  }
}

export { TodoList };
