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