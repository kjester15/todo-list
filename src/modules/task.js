class Task {
  constructor(title, date, priority, note) {
    this.title = title;
    this.date = date;
    this.priority = priority;
    this.note = note;
  }
}

export const addTask = (list, task) => {
  const newTask = new Task(task.title, task.description);
  list.tasks.push(newTask);
};