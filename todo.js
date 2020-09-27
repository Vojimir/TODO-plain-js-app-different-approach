const todoArray = [];
const newTodoList = document.getElementById('new-list');
const addToListButton = document.getElementById('addToList');
const todoNewInput = document.getElementById('todoInput');

var isEditing = false;
var editingKey = 0;

const addToList = () => {
  if (isEditing === true) {
    const editingTodoInput = todoNewInput.value;
    if (!editingTodoInput) return;
    const editedItem = `<div class="todo" data-key="${editingKey}">
    <li class="todo-item"> <span> ${editingTodoInput} </span> </li>
        <button class="trash-btn" onClick="removeElemFromList(${editingKey})"><i class="fas fa-trash"></i></button>
        <button class="edit-btn" onClick="editElem(${editingKey})"><i class="fas fa-edit"></i></button>
        <button class="complete-btn" onClick="completeTask(event, ${editingKey})"><i class="fas fa-check"></i></button>
  </div>`;

    todoArray.splice(elemPosition(editingKey), 1, editedItem);
    todoNewInput.value = '';
    isEditing = false;
    refreshList();
  } else {
    const inputValue = todoNewInput.value;
    const newKey = todoArray.length + 1;
    if (!inputValue) return;

    const newItem = `<div class="todo" data-key="${newKey}">
    <li class="todo-item"> <span> ${inputValue} </span> </li>
        <button class="trash-btn" onClick="removeElemFromList(${newKey})"><i class="fas fa-trash"></i></button>
        <button class="edit-btn" onClick="editElem(${newKey})"><i class="fas fa-edit"></i></button>
        <button class="complete-btn" onClick="completeTask(event, ${newKey})"><i class="fas fa-check"></i></button>
  </div>`;

    todoArray.push(newItem);
    todoNewInput.value = '';

    refreshList();
  }
};

addToListButton.addEventListener('click', () => addToList());

const findElem = (newKey) => todoArray.find((w) => w.includes(newKey));

const elemPosition = (newKey) => todoArray.indexOf(findElem(newKey));

const removeElemFromList = (newKey) => {
  todoArray.splice(elemPosition(newKey), 1);

  refreshList();
};

const refreshList = () => {
  const preparedList = todoArray.join('');

  newTodoList.innerHTML = preparedList;
};

refreshList();

const editElem = (newKey) => {
  isEditing = true;
  const str = findElem(newKey);
  todoNewInput.value = str.substring(
    str.lastIndexOf('<span>') + 6,
    str.lastIndexOf('</span>'),
  );
  editingKey = newKey;
};

const completeTask = (event, newKey) => {
  const item = event.target;
  const todo = item.parentElement;
  if (!todo.classList[1]) {
    todo.classList.toggle('completed');
    const ToggledClassElem = `<div class="todo completed" data-key="${newKey}">${todo.innerHTML}</div>`;
    todoArray.splice(elemPosition(newKey), 1, ToggledClassElem);
    refreshList();
  } else {
    todo.classList.toggle('completed');
    const ToggledClassElem = `<div class="todo" data-key="${newKey}">${todo.innerHTML}</div>`;
    todoArray.splice(elemPosition(newKey), 1, ToggledClassElem);
    refreshList();
  }
};
