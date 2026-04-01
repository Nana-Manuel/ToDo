
// Load tasks on start
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  generateCalendar();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const task = { text, completed: false };

  saveTask(task);
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  const list = document.getElementById("taskList");

  const card = document.createElement("div");
  card.className = "task-card glass bounce";

  card.innerHTML = `
    <span onclick="toggleTask(this)">${task.text}</span>
    <button class="delete-btn" onclick="deleteTask(this)">✕</button>
  `;

  list.appendChild(card);

  setTimeout(() => card.classList.remove("bounce"), 500);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

function deleteTask(btn) {
  const text = btn.previousElementSibling.innerText;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  btn.parentElement.remove();
}

function toggleTask(el) {
  el.classList.toggle("completed");
}

// Simple Calendar
function generateCalendar() {
  const calendar = document.getElementById("calendar");
  const days = 31;

  for (let i = 1; i <= days; i++) {
    const day = document.createElement("div");
    day.className = "calendar-day";
    day.innerText = i;
    calendar.appendChild(day);
  }
}