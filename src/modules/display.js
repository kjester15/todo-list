import listObserver from "./listObserver";
import buttonObserver from "./buttonObserver";

export const display = (function () {
  const clearLists = ()=> {
    document.getElementById("lists").innerHTML = "";
  };

  const displayLists = (array) => {
    array.forEach((element) => {
      const newList = document.createElement("button");
      newList.innerHTML = `${element.title}`;
      newList.setAttribute("class", "list-name");
      document.getElementById("lists").appendChild(newList);
      newList.addEventListener("click", () => {
        clearListDetail();
        displayListDetail(element);
        listObserver.notify(element);
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
      newTask.setAttribute("id", `priority-${element.priority}`)
      const checkBox = document.createElement("input");
      checkBox.type = 'checkbox';
      newTask.appendChild(checkBox);
      const mainTaskContent = document.createElement("div");
      mainTaskContent.setAttribute("class", "task-tile-content")
      newTask.appendChild(mainTaskContent);
      const taskTitle = document.createElement("div");
      taskTitle.innerHTML = `${element.title}`;
      mainTaskContent.appendChild(taskTitle);
      const taskDate = document.createElement("div");
      taskDate.innerHTML = `${element.date}`;
      mainTaskContent.appendChild(taskDate);
      const taskDelete = document.createElement("button");
      taskDelete.setAttribute("id", "delete-task");
      newTask.appendChild(taskDelete);
      // newTask.addEventListener("click", (event) => {
        // yada yada;
      // });
      document.getElementById("tasks").appendChild(newTask);
    });
  };

  const displayButtons = () => {
    const buttonsDiv = document.getElementById("list-buttons")
    const newButton = document.createElement("button");
    newButton.innerHTML = "New Task";
    newButton.setAttribute("id", "new-task");
    newButton.addEventListener("click", function() {
      openTaskDialog();
    });
    buttonsDiv.appendChild(newButton);
    const editButton = document.createElement("button");
    editButton.setAttribute("id", "edit-list");
    buttonsDiv.appendChild(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-list");
    buttonsDiv.appendChild(deleteButton);
    buttonObserver.notify();
  };

  const clearButtons = () => {
    document.getElementById("list-buttons").innerHTML = '';
  };

  const openNewListDialog = () => {
    const dialog = document.getElementById("newListDialog");
    dialog.showModal();
  };

  const openEditListDialog = () => {
    const dialog = document.getElementById("editListDialog");
    dialog.showModal();
  };

  const closeNewListDialog = () => {
    const closeDialog = document.getElementById("newListDialog");
    closeDialog.close();
  };

  const closeEditListDialog = () => {
    const closeDialog = document.getElementById("editListDialog");
    closeDialog.close();
  };

  const openTaskDialog = (list) => {
    const dialog = document.getElementById("taskDialog");
    dialog.showModal(list);
  };

  const closeTaskDialog = () => {
    const closeDialog = document.getElementById("taskDialog");
    closeDialog.close();
  };

  const clearListDetail = () => {
    document.getElementById("list-name").innerHTML='';
    document.getElementById("list-description").innerHTML='';
    document.getElementById("tasks").innerHTML='';
  }

  const displayListDetail = (list) => {
    if(list == null) {
      document.getElementById("list-name").innerHTML='';
      document.getElementById("list-description").innerHTML='';
      clearButtons();
      clearTasks();
    } else {
      document.getElementById("list-name").innerHTML=`${list.title}`;
      document.getElementById("list-description").innerHTML=`${list.description}`;
      clearButtons();
      displayButtons();
      clearTasks();
      displayTasks(list.tasks);
    }
  };

  return { clearLists,
          displayLists,
          clearTasks,
          displayTasks,
          displayButtons,
          clearButtons,
          openNewListDialog,
          openEditListDialog,
          closeNewListDialog,
          closeEditListDialog,
          openTaskDialog,
          closeTaskDialog,
          clearListDetail,
          displayListDetail,
  };
})();