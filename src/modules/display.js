import observable from "./observer";

export const display = (function () {
  const clearLists = ()=> {
    document.getElementById("lists").innerHTML = "";
  };

  const displayLists = (array) => {
    array.forEach((element) => {
      const newList = document.createElement("button");
      newList.innerHTML = `${element.title}`;
      // newList.setAttribute("class", "list-name");
      document.getElementById("lists").appendChild(newList);
      newList.addEventListener("click", () => {
        displayListDetail(element);
        observable.notify(element);
      });
    });
  };

  const clearTasks = ()=> {
    document.getElementById("tasks").innerHTML = "";
  };

  const displayTasks = (array) => {
    array.forEach((element) => {
      const newTask = document.createElement("button");
      newTask.setAttribute("class", "task-tile");
      const checkBox = document.createElement("input");
      checkBox.type = 'checkbox';
      newTask.appendChild(checkBox);
      const taskTitle = document.createElement("div");
      taskTitle.innerHTML = `${element.title}`;
      newTask.appendChild(taskTitle);
      // newTask.addEventListener("click", (event) => {
        // yada yada;
      // });
      document.getElementById("tasks").appendChild(newTask);
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

  const openTaskDialog = (list) => {
    const dialog = document.getElementById("taskDialog")
    dialog.showModal(list)
  };

  const closeTaskDialog = () => {
    const closeDialog = document.getElementById("taskDialog")
    closeDialog.close()
  };

  const displayListDetail = (list) => {
    document.getElementById("list-name").innerHTML=`${list.title}`;
    document.getElementById("list-description").innerHTML=`${list.description}`;

    // const header = document.getElementById("tasks-header")
    // const newTaskButton = document.createElement('button');
    // newTaskButton.innerHTML = 'New Task';
    // newTaskButton.addEventListener("click", function() {
    //   display.openTaskDialog(list);
    // });
    // header.appendChild(newTaskButton);

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

  return { clearLists,
          displayLists,
          clearTasks,
          displayTasks,
          openListDialog,
          closeListDialog,
          openTaskDialog,
          closeTaskDialog,
          displayListDetail,
  };
})();