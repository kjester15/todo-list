import { addTask } from "./modules/task";
import { addList } from "./modules/list";
import User from "./modules/user";
import { clearLists, displayLists, openListDialog, closeListDialog } from "./modules/display";
import './style.css';

document.getElementById('closeList').addEventListener("click", closeListDialog);

const user = new User;

let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  openListDialog();
});

// Handle new list form
const listForm = document.getElementById("list-form");
listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(listForm);
});

listForm.addEventListener("formdata", (event) => {
  const list = {}
  const data = event.formData;
  data.forEach((value, key) => (list[`${key}`] = value))
  addList(user, list)
  listForm.reset();
  closeListDialog();
  clearLists();
  displayLists(user.lists);
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
  closeTaskDialog();
  clearTasks();
  // displayTasks(user.lists[].tasks);
});
