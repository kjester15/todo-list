import Task from "./modules/task";
import List from "./modules/list";
import './style.css';

const newList = new List("project 1", "the best project to ever exist")
console.log(newList);
const newTask = new Task("title", "date", "priority", "note")
newList.tasks.push(newTask);
console.log(newList);

