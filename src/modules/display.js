const clearLists = ()=> {
  document.getElementById("lists").innerHTML = "";
};

const displayLists = (array) => {
  array.forEach((element) => {
    const newList = document.createElement("button");
    newList.innerHTML = `${element.title}`;
    // newList.setAttribute("class", "list-name");
    // newList.setAttribute("id", `list-${i}`);
    document.getElementById("lists").appendChild(newList);
    // newList.addEventListener("click", (event) => {
      // GamePlay.processMove(event.target);
    // });
  });
};

const clearTasks = ()=> {
  document.getElementById("lists").innerHTML = "";
};

const displayTasks = (array) => {
  array.forEach((i) => {
    const newTask = document.createElement("div");
    newTask.setAttribute("class", "task-tile");
    newTask.setAttribute("id", `task-${i}`);
    document.getElementById("tasks").appendChild(newTask);
    newTask.addEventListener("click", (event) => {
      // GamePlay.processMove(event.target);
    });
  });
};

const openDialog = () => {
  const dialog = document.getElementById("dialog")
  dialog.showModal()
};

const closeDialog = () => {
  const closeDialog = document.getElementById("dialog")
  closeDialog.close()
};

export { clearLists, displayLists, clearTasks, displayTasks, openDialog, closeDialog };