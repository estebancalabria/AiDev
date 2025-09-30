let todoList = [];

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListElement = document.getElementById('todo-list');

addTodoBtn.addEventListener('click', addTodo);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todo = {
            text: todoText,
            completed: false
        };
        todoList.push(todo);
        todoInput.value = '';
        renderTodoList();
    }
}

function renderTodoList() {
    todoListElement.innerHTML = '';
    todoList.forEach((todo, index) => {
        const todoElement = document.createElement('li');
        todoElement.textContent = todo.text;
        todoElement.addEventListener('click', () => {
            todo.completed = !todo.completed;
            renderTodoList();
        });
        if (todo.completed) {
            todoElement.style.textDecoration = 'line-through';
        }
        todoListElement.appendChild(todoElement);
    });
}
