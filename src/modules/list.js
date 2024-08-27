export class List {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = [];
  }
};

export const addList = (user, list) => {
  const newList = new List(list.title, list.description);
  user.lists.push(newList);
};

export function lists(list) {
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