import Task from "./modules/task";
import List from "./modules/list";
import { clearLists, displayLists } from "./modules/display";
import './style.css';

let lists = []

let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  const list = new List('test title', 'test description');
  lists.push(list);
  clearLists();
  displayLists(lists);
});

const list = new List('test title 1', 'test description 1');
const list2 = new List('test title 2', 'test description 2');
const test = [list, list2]
console.log(test)
// console.log(typeof DisplayController);
// displayLists(test);
// const newTask = new Task("title", "date", "priority", "note")
// newList.tasks.push(newTask);
// console.log(newList);

