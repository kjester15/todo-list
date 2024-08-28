import { task } from "./modules/task";
import { list } from "./modules/list";
import User from "./modules/user";
import { display } from "./modules/display";
import './style.css';

document.getElementById('closeList').addEventListener("click", display.closeListDialog);

const user = new User;

let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  display.openListDialog();
});

let newTask = document.getElementById("new-task");
newTask.addEventListener("click", function() {
  display.openTaskDialog();
});

// Handle new list form
const listForm = document.getElementById("list-form");
listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(listForm);
});

listForm.addEventListener("formdata", (event) => {
  const newList = {}
  const data = event.formData;
  data.forEach((value, key) => (newList[`${key}`] = value))
  list.addList(user, newList)
  listForm.reset();
  display.closeListDialog();
  display.clearLists();
  display.displayLists(user.lists);
});

// Handle new task form
const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(taskForm);
});

taskForm.addEventListener("formdata", (event) => {
  const task = {}
  const data = event.formData;
  data.forEach((value, key) => (task[`${key}`] = value))
  // TODO: need to figure out how to feed appropriate list below
  // addTask(user.lists[], task)
  taskForm.reset();
  display.closeTaskDialog();
  display.clearTasks();
  // display.displayTasks(user.lists[].tasks);
});