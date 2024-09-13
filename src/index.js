import { task } from "./modules/task";
import { list } from "./modules/list";
import listObserver from "./modules/listObserver";
import buttonObserver from "./modules/buttonObserver";
import taskObserver from "./modules/taskObserver";
import User from "./modules/user";
import { display } from "./modules/display";
import './style.css';

// event handlers for closing list and task dialogues
document.getElementById('closeNewList').addEventListener("click", display.closeNewListDialog);
document.getElementById('closeEditList').addEventListener("click", display.closeEditListDialog);
document.getElementById('closeTask').addEventListener("click", display.closeTaskDialog);

// establishes user to save lists and tracker for currently selected list
const user = new User;
let currentList;

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
  display.displayTasks(currentList);
});

// observer functions
function updateCurrentList(data) {
  currentList = data;
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
  });
};
// function mapTask(task) {
//   let deleteTask = document.getElementById("delete-task");
//   deleteTask.addEventListener("click", function() {
//     let index = currentList.tasks.indexOf(task);
//     currentList.tasks.splice(index, 1);
//     display.clearTasks();
//     display.displayTasks(currentList.tasks);
//   });
// }
listObserver.subscribe(updateCurrentList);
buttonObserver.subscribe(mapButtons);
// taskObserver.subscribe(mapTask);