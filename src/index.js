import { task } from "./modules/task";
import { list } from "./modules/list";
import listObserver from "./modules/listObserver";
import taskObserver from "./modules/taskObserver";
import buttonObserver from "./modules/buttonObserver";
import saveObserver from "./modules/saveObserver";
import User from "./modules/user";
import { display } from "./modules/display";
import './style.css';

// event handlers for closing list and task dialogues
document.getElementById('closeNewList').addEventListener("click", display.closeNewListDialog);
document.getElementById('closeEditList').addEventListener("click", display.closeEditListDialog);
document.getElementById('closeNewTask').addEventListener("click", display.closeNewTaskDialog);
document.getElementById('closeEditTask').addEventListener("click", display.closeEditTaskDialog);

// establishes user to save lists and tracker for currently selected list
let user = new User;
let userSaveData;
let currentList;
let currentTask;

// look for saved data when page is opened
function restoreData() {
  let userSaveStr = localStorage.getItem("userSaveData");
  if (userSaveStr !== null) {
    user = JSON.parse(userSaveStr);
    display.displayLists(user.lists);
  }
};

window.addEventListener("load", () => {
  restoreData();
});

// event handlers for addings lists and tasks
let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  display.openNewListDialog();
});

// Handle new list, edit list, and task forms
const newListForm = document.getElementById("new-list-form");
newListForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(newListForm);
});

newListForm.addEventListener("formdata", (event) => {
  const newList = {}
  const data = event.formData;
  data.forEach((value, key) => (newList[`${key}`] = value))
  list.addList(user, newList)
  newListForm.reset();
  display.closeNewListDialog();
  display.clearLists();
  display.displayLists(user.lists);
  saveObserver.notify();
});

const editListForm = document.getElementById("edit-list-form");
editListForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(editListForm);
});

editListForm.addEventListener("formdata", (event) => {
  const editList = {}
  const data = event.formData;
  data.forEach((value, key) => (editList[`${key}`] = value))
  list.editList(user, editList, currentList)
  editListForm.reset();
  display.closeEditListDialog();
  display.clearLists();
  display.displayLists(user.lists);
  display.displayListDetail(currentList);
  saveObserver.notify();
});

const newTaskForm = document.getElementById("task-form");
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(newTaskForm);
});

newTaskForm.addEventListener("formdata", (event) => {
  const newTask = {}
  const data = event.formData;
  data.forEach((value, key) => (newTask[`${key}`] = value))
  task.addTask(currentList, newTask);
  newTaskForm.reset();
  display.closeNewTaskDialog();
  display.clearTasks();
  display.displayTasks(currentList);
  saveObserver.notify();
});

const editTaskForm = document.getElementById("edit-task-form");
editTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(editTaskForm);
});

editTaskForm.addEventListener("formdata", (event) => {
  const editTask = {}
  const data = event.formData;
  data.forEach((value, key) => (editTask[`${key}`] = value))
  task.editTask(currentTask, editTask, currentList)
  editTaskForm.reset();
  display.closeEditTaskDialog();
  display.clearTasks();
  display.displayTasks(currentList);
  saveObserver.notify();
});

// observer functions
function updateCurrentList(data) {
  currentList = data;
};
function updateCurrentTask(data) {
  currentTask = data;
};
function mapButtons() {
  let editList = document.getElementById("edit-list");
  editList.addEventListener("click", function() {
    let index = user.lists.indexOf(currentList);
    let formIndex = 0;
    for (const child of editListForm.children) {
      if (child.nodeName === "INPUT") {
        child.value = currentList[Object.keys(currentList)[formIndex]];
        formIndex++;
      }
    };
    display.openEditListDialog();
    display.displayListDetail(user.lists[index]);
  });

  let deleteList = document.getElementById("delete-list");
  deleteList.addEventListener("click", function() {
    let index = user.lists.indexOf(currentList);
    user.lists.splice(index, 1);
    display.clearLists();
    display.displayLists(user.lists);
    display.displayListDetail(user.lists[0]);
    updateCurrentList(null);
    saveObserver.notify();
  });
};
// save todo list
function saveData() {
  userSaveData = JSON.stringify(user)
  localStorage.setItem("userSaveData", userSaveData)
};
listObserver.subscribe(updateCurrentList);
taskObserver.subscribe(updateCurrentTask);
buttonObserver.subscribe(mapButtons);
saveObserver.subscribe(saveData);

// need to save after delete lists or tasks