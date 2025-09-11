let todoList = [];

document.getElementById('add-btn').addEventListener('click', () => {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        todoList.push(todoText);
        todoInput.value = '';
        renderTodoList();
    }
});

function renderTodoList() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';
    todoList.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        const todoText = document.createTextNode(todo);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.setAttribute('aria-label', 'Eliminar tarea');
        deleteButton.setAttribute('title', 'Eliminar');
        deleteButton.onclick = () => {
            Swal.fire({
                title: '¿Borrar tarea?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    todoList.splice(index, 1);
                    renderTodoList();
                    Swal.fire({
                        title: 'Eliminada',
                        text: 'La tarea fue eliminada.',
                        icon: 'success',
                        timer: 1200,
                        showConfirmButton: false
                    });
                }
            });
        };
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);
        todoListElement.appendChild(todoItem);
    });
}
