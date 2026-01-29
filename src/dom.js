import { TodoList } from "./task";
import { format, parseISO } from "date-fns";

// DOM Manager
const DOM = {
  // Container Elements
  taskGrid: document.querySelector(".task-grid"),
  sidebarNav: document.querySelector(".nav-links"),
  categorySelects: document.querySelectorAll("select[name='category']"), // Add + Edit forms
  headerTitle: document.querySelector(".header-title h2"),
  productivityHeading: document.querySelector(".greeting h3"),
  taskCount: document.querySelector(".greeting p"),

  // Modal Elements
  modals: {
    add: document.getElementById("modal-add-task"),
    edit: document.getElementById("modal-edit-task"),
    detail: document.getElementById("modal-task-detail"),
    category: document.getElementById("modal-new-category"),
  },

  // State
  currentFilter: "all",

  init() {
    this.renderCategories();
    this.renderTasks();
    this.bindEvents();
    this.updateStats();
  },

  bindEvents() {
    // Navigation (Sidebar)
    this.sidebarNav.addEventListener("click", (e) => {
      const navItem = e.target.closest(".nav-item");
      if (!navItem) return;

      // Handle Category Actions
      if (e.target.closest(".edit-cat")) {
        e.stopPropagation();
        const categoryId = navItem.dataset.categoryId;
        const currentName = navItem.dataset.filter;
        const newName = prompt("Enter new category name:", currentName);
        if (newName && newName.trim() !== "") {
          TodoList.updateCategory(categoryId, newName.trim());
          this.renderCategories();
          this.renderTasks(); // Relink tasks if currently filtering
        }
        return;
      }

      if (e.target.closest(".delete-cat")) {
        e.stopPropagation();
        const categoryId = navItem.dataset.categoryId;
        if (confirm("Delete this category? ALL TASKS in it will be removed!")) {
          TodoList.deleteCategory(categoryId);
          // If we deleted the current filter, switch to 'all'
          if (this.currentFilter === navItem.dataset.filter) {
            this.currentFilter = "all";
            this.updateHeaderTitle({
              querySelector: () => ({ textContent: "All Tasks" }),
            });
          }
          this.renderCategories();
          this.renderTasks();
          this.updateStats();
        }
        return;
      }

      // Update active state
      document
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("active"));
      navItem.classList.add("active");

      // Set Filter
      const filter = navItem.dataset.filter;
      if (filter) {
        this.currentFilter = filter;
        this.updateHeaderTitle(navItem);
        this.renderTasks();
      }
    });

    // Modal Opening Buttons
    document
      .getElementById("open-add-task-modal")
      .addEventListener("click", () => {
        this.openModal("add");
      });
    document
      .getElementById("open-category-modal")
      .addEventListener("click", () => {
        this.openModal("category");
      });

    // Close Modals (X buttons + Cancel buttons)
    document.querySelectorAll(".close-modal, .btn-cancel").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        this.closeModal(modal);
      });
    });

    // Close on click outside
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay);
        }
      });
    });

    // Forms
    document
      .getElementById("add-task-form")
      .addEventListener("submit", (e) => this.handleAddTask(e));
    document
      .getElementById("new-category-form")
      .addEventListener("submit", (e) => this.handleAddCategory(e));
    document
      .getElementById("edit-task-form")
      .addEventListener("submit", (e) => this.handleEditTask(e));

    // Task Grid Interactions
    this.taskGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".task-card");
      if (!card) return;
      const taskId = card.dataset.id;

      if (e.target.closest(".delete-icon")) {
        e.stopPropagation(); // Prevent opening detail
        if (confirm("Delete this task?")) {
          TodoList.deleteTask(taskId);
          this.renderTasks();
          this.updateStats();
        }
      } else if (e.target.closest(".edit-icon")) {
        e.stopPropagation();
        this.openEditModal(taskId);
      } else if (
        e.target.closest(".check-icon") ||
        e.target.closest(".card-status")
      ) {
        e.stopPropagation();
        TodoList.toggleTaskCompletion(taskId);
        this.renderTasks();
        this.updateStats();
      } else {
        // Open Detail View
        this.openDetailModal(taskId);
      }
    });

    // Detail Modal Actions
    const detailModal = this.modals.detail;
    detailModal.addEventListener("click", (e) => {
      const taskId = detailModal.dataset.taskId;
      if (e.target.closest(".btn-secondary")) {
        // Delete from modal
        if (confirm("Delete this task?")) {
          TodoList.deleteTask(taskId);
          this.closeModal(detailModal);
          this.renderTasks();
          this.updateStats();
        }
      } else if (e.target.closest(".btn-primary")) {
        // Edit from modal
        this.closeModal(detailModal);
        this.openEditModal(taskId);
      }
    });
  },

  // Renders
  renderTasks() {
    const tasks = TodoList.getTasksByFilter(this.currentFilter);
    this.taskGrid.innerHTML = "";

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = `task-card ${task.completed ? "completed" : ""}`;
      card.dataset.id = task.id;

      // Calculate badge color class based on priority
      const priorityClass =
        task.priority === "high"
          ? "high"
          : task.priority === "medium"
            ? "medium"
            : "low";

      // Format Date
      let dateString = "No Date";
      if (task.dueDate) {
        try {
          dateString = format(parseISO(task.dueDate), "MMM dd");
        } catch (e) {
          dateString = task.dueDate;
        }
      }

      card.innerHTML = `
        <div class="card-status">
            <span class="material-icons-outlined check-icon">
                ${task.completed ? "check_circle" : "check_box_outline_blank"}
            </span>
        </div>
        <div class="card-details ${task.completed ? "completed" : ""}">
            <h4 class="task-title">${task.title}</h4>
            <div class="task-meta">
                <span class="date">
                    <span class="material-icons-outlined">calendar_today</span> ${dateString}
                </span>
                <span class="badge ${priorityClass}">${task.priority}</span>
            </div>
        </div>
        <div class="card-actions">
            <span class="material-icons-outlined edit-icon">edit</span>
            <span class="material-icons-outlined delete-icon">delete</span>
        </div>
      `;

      this.taskGrid.appendChild(card);
    });
  },

  renderCategories() {
    const categories = TodoList.getCategories();
    const fixed = [
      { name: "All Tasks", icon: "pending_actions", filter: "all" },
      { name: "Work", icon: "work_outline", filter: "work" },
      { name: "Personal", icon: "person_outline", filter: "personal" },
      { name: "Urgent", icon: "priority_high", filter: "urgent" },
      { name: "Others", icon: "note_add", filter: "others" },
    ];

    this.sidebarNav.innerHTML = "";

    // Fixed Items
    fixed.forEach((item) => {
      const div = document.createElement("div");
      div.className = `nav-item ${this.currentFilter === item.filter ? "active" : ""}`;
      div.dataset.filter = item.filter;
      div.innerHTML = `
            <span class="material-icons-outlined">${item.icon}</span>
            <span>${item.name}</span>
        `;
      this.sidebarNav.appendChild(div);
    });

    // User Created Categories
    categories.forEach((cat) => {
      const lowerName = cat.name.toLowerCase();
      const isFixed = fixed.some(
        (f) => f.filter === lowerName || lowerName === "urgent",
      );

      if (!isFixed) {
        const div = document.createElement("div");
        div.className = `nav-item ${this.currentFilter === cat.name ? "active" : ""}`;
        div.dataset.filter = cat.name;
        div.dataset.categoryId = cat.id; // Store ID for actions

        div.innerHTML = `
                <div class="nav-text">
                    <span class="material-icons-outlined">label</span>
                    <span>${cat.name}</span>
                </div>
                <div class="nav-actions">
                    <span class="material-icons-outlined edit-cat" title="Rename">edit</span>
                    <span class="material-icons-outlined delete-cat" title="Delete">delete</span>
                </div>
            `;
        this.sidebarNav.appendChild(div);
      }
    });

    // Update Select Dropdowns in Forms
    this.updateCategorySelects(categories);
  },

  bindCategoryEvents() {
    // Since sidebar is re-rendered, it is easiest to delegate in main bindEvents or here
    // Logic is moved to bindEvents delegation
  },

  updateCategorySelects(categories) {
    document.querySelectorAll("select[name='category']").forEach((select) => {
      const currentVal = select.value;
      select.innerHTML = "";

      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.name.toLowerCase(); // Use lower for value
        option.textContent = cat.name;
        select.appendChild(option);
      });

      // Try to restore value
      if (currentVal) select.value = currentVal;
    });
  },

  updateHeaderTitle(navItem) {
    const text = navItem.querySelector("span:last-child").textContent;
    const icon = navItem.querySelector("span:first-child").textContent;

    const headerIcon = document.querySelector(
      ".header-title .material-icons-outlined",
    );
    const headerText = this.headerTitle;

    headerIcon.textContent = icon;
    headerText.textContent = text;
  },

  updateStats() {
    const tasks = TodoList.getTasks();
    const remaining = tasks.filter((t) => !t.completed).length;
    this.taskCount.textContent = `${remaining} Tasks Remaining`;
  },

  // Modal Logic
  openModal(type) {
    if (this.modals[type]) {
      this.modals[type].classList.add("active");
    }
  },

  closeModal(modalElement) {
    if (modalElement) {
      modalElement.classList.remove("active");
      // Reset forms if it's a form modal
      const form = modalElement.querySelector("form");
      if (form) form.reset();
    }
  },

  openEditModal(taskId) {
    const task = TodoList.getTaskById(taskId);
    if (!task) return;

    const form = document.getElementById("edit-task-form");
    form.dataset.taskId = taskId;

    // Populate fields
    form.querySelector("#edit-task-title").value = task.title;
    form.querySelector("#edit-task-desc").value = task.description;
    form.querySelector("#edit-task-date").value = task.dueDate;
    form.querySelector("#edit-task-priority").value = task.priority;
    form.querySelector("#edit-task-category").value =
      task.category.toLowerCase();

    this.openModal("edit");
  },

  openDetailModal(taskId) {
    const task = TodoList.getTaskById(taskId);
    if (!task) return;

    const modal = this.modals.detail;
    modal.dataset.taskId = taskId;

    // Populate Info
    modal.querySelector(".task-detail-title").textContent = task.title;

    // Date
    let dateString = task.dueDate;
    try {
      dateString = format(parseISO(task.dueDate), "MMM dd, yyyy");
    } catch (e) {
      new Error(`Error: ${e}`);
    }
    modal.querySelector(".task-detail-meta span").innerHTML =
      `<span class="material-icons-outlined">calendar_today</span> ${dateString}`;

    // Priority
    const badge = modal.querySelector(".badge");
    badge.className = `badge ${task.priority}`;
    badge.textContent = `${task.priority} Priority`;

    // Desc
    modal.querySelector(".task-description").textContent =
      task.description || "No description provided.";

    // Category
    modal.querySelector(".task-category span:last-child").textContent =
      task.category;

    this.openModal("detail");
  },

  // Handlers
  handleAddTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const desc = formData.get("description");
    const date = formData.get("date");
    const priority = formData.get("priority");
    const category = formData.get("category"); // Value is lowercase

    // Find proper category name casing if needed, or just capitalize
    const catName = category.charAt(0).toUpperCase() + category.slice(1);

    TodoList.createTask(title, desc, date, priority, catName);

    this.closeModal(this.modals.add);
    this.renderTasks();
    this.updateStats();
  },

  handleAddCategory(e) {
    e.preventDefault();
    const name = document.getElementById("category-name").value;
    if (name) {
      TodoList.createCategory(name);
      this.renderCategories();
      this.closeModal(this.modals.category);
    }
  },

  handleEditTask(e) {
    e.preventDefault();
    const taskId = e.target.dataset.taskId;
    const formData = new FormData(e.target);

    const updates = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("date"),
      priority: formData.get("priority"),
      category:
        formData.get("category").charAt(0).toUpperCase() +
        formData.get("category").slice(1),
    };

    TodoList.updateTask(taskId, updates);
    this.closeModal(this.modals.edit);
    this.renderTasks();
  },
};

export default DOM;
