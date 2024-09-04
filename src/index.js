import { task } from "./modules/task";
import { list } from "./modules/list";
import observable from "./modules/observer";
import User from "./modules/user";
import { display } from "./modules/display";
import './style.css';

// event handlers for closing list and task dialogues
document.getElementById('closeList').addEventListener("click", display.closeListDialog);
document.getElementById('closeTask').addEventListener("click", display.closeTaskDialog);

// establishes user to save lists and tracker for currently selected list
const user = new User;
let currentList;

// event handlers for addings lists and tasks
let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  display.openListDialog();
});

let newTask = document.getElementById("new-task");
newTask.addEventListener("click", function() {
  display.openTaskDialog();
});

// Handle new list and task forms
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

const taskForm = document.getElementById("task-form");
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(taskForm);
});

taskForm.addEventListener("formdata", (event) => {
  const newTask = {}
  const data = event.formData;
  data.forEach((value, key) => (newTask[`${key}`] = value))
  task.addTask(currentList, newTask);
  taskForm.reset();
  display.closeTaskDialog();
  display.clearTasks();
  display.displayTasks(currentList.tasks);
});

// update current list
function updateCurrentList(data) {
  currentList = data;
}
observable.subscribe(updateCurrentList);

// observer TODO
// create observer class = DONE
// Add observer.notify to list button = DONE
// Subscribe [task detail?] to observer