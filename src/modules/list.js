class List {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = [];
  }
};

export const list = (function () {
  const addList = (user, list) => {
    const newList = new List(list.title, list.description);
    user.lists.push(newList);
  };

  const editList = (user, updatedList, existingList) => {
    const index = user.lists.indexOf(existingList);
    const currentList = user.lists[index];
    currentList.title = updatedList.title;
    currentList.description = updatedList.description;
  }

  return { addList, editList };
})();