class Task {
  constructor(title, date, priority, note) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.note = note;
  }
}

export const task = (function () {
  const addTask = (list, task) => {
    const newTask = new Task(task.title, task.date, task.priority, task.note);
    list.tasks.push(newTask);
  };

  return { addTask };
})();