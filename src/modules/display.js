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
    newList.addEventListener("click", () => {
      displayListTasks(element);
    });
  });
};

const clearTasks = ()=> {
  document.getElementById("tasks").innerHTML = "";
};

const displayTasks = (array) => {
  array.forEach((element) => {
    const newTask = document.createElement("div");
    // newTask.setAttribute("class", "task-tile");
    // newTask.setAttribute("id", `task-${i}`);
    document.getElementById("tasks").appendChild(newTask);
    // newTask.addEventListener("click", (event) => {
      // GamePlay.processMove(event.target);
    // });
  });
};

const openListDialog = () => {
  const dialog = document.getElementById("listDialog")
  dialog.showModal()
};

const closeListDialog = () => {
  const closeDialog = document.getElementById("listDialog")
  closeDialog.close()
};

const openTaskDialog = () => {
  const dialog = document.getElementById("taskDialog")
  dialog.showModal()
};

const closeTaskDialog = () => {
  const closeDialog = document.getElementById("taskDialog")
  closeDialog.close()
};

const displayListTasks = (list) => {
  document.getElementById("list-name").innerHTML=`${list.title}`;
  document.getElementById("list-description").innerHTML=`${list.description}`;
  const taskDiv = document.createElement('div');
  list.tasks.forEach((task) => {
    const taskTitle = document.createElement('h4');
    taskTitle.innerHTML = `${task.title}`;
    taskDiv.appendChild(taskTitle);
    const taskDesc = document.createElement('h5');
    taskDesc.innerHTML = `${task.description}`;
    taskDiv.appendChild(taskDesc);
  });
  document.getElementById("tasks").appendChild(taskDiv);
};

export { clearLists,
         displayLists,
         clearTasks,
         displayTasks,
         openListDialog,
         closeListDialog,
         openTaskDialog,
         closeTaskDialog,
         displayListTasks,
};