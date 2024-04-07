const form = document.querySelector(".form");
const taskInput = document.querySelector(".form_input");
const tasksList = document.querySelector(".tasks_list");
const emptyList = document.querySelector(".emptyList");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => {
  const cssClass = task.done ? "tasks_list_item done" : "tasks_list_item";

  const taskHTML = `<li id="${task.id}" class="${cssClass}">
          <span class="task_title">${task.text}</span>
          <div class="task_btn">
            <button class="btn-action" data-action="done">
              <img class="task_btn_img" src="img/done.svg" alt="" />
            </button>
            <button class="btn-action" data-action="delete">
              <img class="task_btn_img" src="img/delete.svg" alt="" />
            </button>
          </div>
        </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
});

emptyListTogle();

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  saveLocalStorage();

  const cssClass = newTask.done ? "tasks_list_item done" : "tasks_list_item";

  const taskHTML = `<li id="${newTask.id}" class="${cssClass}">
          <span class="task_title">${newTask.text}</span>
          <div class="task_btn">
            <button class="btn-action" data-action="done">
              <img class="task_btn_img" src="img/done.svg" alt="" />
            </button>
            <button class="btn-action" data-action="delete">
              <img class="task_btn_img" src="img/delete.svg" alt="" />
            </button>
          </div>
        </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  taskInput.value = "";
  taskInput.focus();

  emptyListTogle();
}

function emptyListTogle() {
  if (tasks.length > 0) {
    const emptyListEL = document.querySelector(".emptyList");
    emptyListEL ? emptyListEL.remove() : null;
  } else if (tasks.length === 0) {
    const emptyListHTML = `<li class="tasks_list_item emptyList">
    <img src="img/empty.svg" alt="empty" class="emptyList_img" />
    <span class="emptyList_text">Список задач пуст.</span>
  </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }
  saveLocalStorage();
}

function deleteTask(e) {
  if (e.target.dataset.action !== "delete") return;

  const patenNode = e.target.closest("li");

  const id = e.target.closest("li").id;

  const index = tasks.findIndex((task) => task.id == id);

  tasks.splice(index, 1);

  patenNode.remove();

  emptyListTogle();
  saveLocalStorage();
}

function doneTask(e) {
  if (e.target.dataset.action !== "done") return;

  const parentNode = e.target.closest("li");
  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  saveLocalStorage();

  parentNode.classList.toggle("done");
}

function saveLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
