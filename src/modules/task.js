class Task {
  constructor(title, date, priority, note, status) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.note = note;
    this.status = status;
  }
}

export const task = (function () {
  const addTask = (list, task) => {
    const newTask = new Task(task.title, task.date, task.priority, task.note);
    list.tasks.push(newTask);
  };

  const editTask = (existingTask, updatedTask, currentList) => {
    const index = currentList.tasks.indexOf(existingTask);
    currentList.tasks[index].title = updatedTask.title;
    currentList.tasks[index].date = updatedTask.date;
    currentList.tasks[index].priority = updatedTask.priority;
    currentList.tasks[index].note = updatedTask.note;
    currentList.tasks[index].status = updatedTask.status;
  }

  return { addTask, editTask };
})();