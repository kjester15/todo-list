import Task from "./modules/task";
import List from "./modules/list";
import User from "./modules/user";
import { clearLists, displayLists, openListDialog, closeListDialog } from "./modules/display";
import './style.css';

document.getElementById('closeList').addEventListener("click", closeListDialog);

const user = new User;

let newList = document.getElementById("new-list");
newList.addEventListener("click", function() {
  openListDialog();
  const list = new List('test title', 'test description');
  user.lists.push(list);
  clearLists();
  displayLists(user.lists);
});