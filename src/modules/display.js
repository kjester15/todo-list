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
        clearListDetail();
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

  const clearListDetail = () => {
    document.getElementById("list-name").innerHTML='';
    document.getElementById("list-description").innerHTML='';
    document.getElementById("tasks").innerHTML='';
  }

  const displayListDetail = (list) => {
    document.getElementById("list-name").innerHTML=`${list.title}`;
    document.getElementById("list-description").innerHTML=`${list.description}`;
    displayTasks(list.tasks);
  };

  return { clearLists,
          displayLists,
          clearTasks,
          displayTasks,
          openListDialog,
          closeListDialog,
          openTaskDialog,
          closeTaskDialog,
          clearListDetail,
          displayListDetail,
  };
})();