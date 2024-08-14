import Task from "./modules/todo-item";

const title = "hey";
const date = 45;
const priority = "so high";
const notes = "no notes";

const task = new Task(title, date, priority, notes);
console.log(task);