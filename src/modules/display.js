import listObserver from "./listObserver";
import taskObserver from "./taskObserver";
import buttonObserver from "./buttonObserver";
import saveObserver from "./saveObserver";
import { format } from "date-fns";

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

  const displayTasks = (list) => {
    
    list.tasks.forEach((element) => {
      const newTask = document.createElement("div");
      newTask.setAttribute("class", "task-tile");
      newTask.setAttribute("id", `priority-${element.priority}`)
      const checkBox = document.createElement("input");
      checkBox.type = 'checkbox';
      newTask.appendChild(checkBox);
      const mainTaskContent = document.createElement("div");
      mainTaskContent.setAttribute("class", "task-tile-content")
      newTask.appendChild(mainTaskContent);
      const taskTitle = document.createElement("h4");
      taskTitle.innerHTML = `${element.title}`;
      taskTitle.setAttribute("class", "text-right");
      mainTaskContent.appendChild(taskTitle);
      const taskDate = document.createElement("div");
      const formattedDate = element.date.split("-").join("/");
      const newDate = format(new Date(formattedDate), "MM/dd/yyyy");
      taskDate.innerHTML = `Due: ${newDate}`;
      taskDate.setAttribute("id", "task-date");
      taskDate.setAttribute("class", "text-right");
      mainTaskContent.appendChild(taskDate);
      if (element.status == "true") {
        checkBox.checked = true;
        taskTitle.classList.toggle("completed");
        taskDate.classList.toggle("completed");
      }
      checkBox.addEventListener("click", (event) => {
        taskTitle.classList.toggle("completed");
        taskDate.classList.toggle("completed");
        if (element.status == "true") {
          element.status = "false";
        } else {
          element.status = "true";
        }
        clearTasks();
        displayTasks(list);
        event.stopPropagation();
        saveObserver.notify();
      })
      const taskDelete = document.createElement("button");
      taskDelete.setAttribute("id", "delete-task");
      taskDelete.addEventListener("click", (event) => {
        let index = list.tasks.indexOf(element);
        list.tasks.splice(index, 1);
        clearTasks();
        displayTasks(list);
        event.stopPropagation();
        saveObserver.notify();
      })
      newTask.appendChild(taskDelete);
      newTask.addEventListener("click", () => {
        taskObserver.notify(element);
        openEditTaskDialog(element);
        const form = document.getElementById("edit-task-form");
        for (const child of form.children) {
          if (child.id == "title") {
            child.value = element.title;
          } else if (child.id == "date") {
            child.value = element.date;
          } else if (child.id == "priority") {
            child.value = element.priority;
          } else if (child.id == "note") {
            child.value = element.note;
          } else if (child.id == "status") {
            child.value = element.status;
          }
        };
      });
      document.getElementById("tasks").appendChild(newTask);
    });
  };

  const displayButtons = () => {
    const buttonsDiv = document.getElementById("list-buttons")
    const newButton = document.createElement("button");
    newButton.innerHTML = "New Task";
    newButton.setAttribute("id", "new-task");
    newButton.addEventListener("click", function() {
      openNewTaskDialog();
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

  const openNewTaskDialog = (list) => {
    const dialog = document.getElementById("newTaskDialog");
    dialog.showModal(list);
  };

  const closeNewTaskDialog = () => {
    const closeDialog = document.getElementById("newTaskDialog");
    closeDialog.close();
  };

  const openEditTaskDialog = (list) => {
    const dialog = document.getElementById("editTaskDialog");
    dialog.showModal(list);
  };

  const closeEditTaskDialog = () => {
    const closeDialog = document.getElementById("editTaskDialog");
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
      displayTasks(list);
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
          openNewTaskDialog,
          closeNewTaskDialog,
          openEditTaskDialog,
          closeEditTaskDialog,
          clearListDetail,
          displayListDetail,
  };
})();