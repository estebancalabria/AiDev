document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoTime = document.getElementById('todo-time');
    const todoList = document.getElementById('todo-list');
    let editingIndex = -1;

    // Establecer la fecha y hora actual como valor mínimo
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    todoTime.min = `${year}-${month}-${day}T${hours}:${minutes}`;

    // Cargar tareas guardadas
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Formatear fecha para mostrar
    const formatDateTime = (dateString) => {
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString('es-ES', options);
    };

    // Verificar si una tarea está vencida
    const isOverdue = (dateString) => {
        return new Date(dateString) < new Date();
    };

    // Renderizar tareas
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            const isTaskOverdue = isOverdue(todo.datetime);
            
            todoItem.className = `flex items-center justify-between p-3 bg-gray-50 rounded-lg ${todo.completed ? 'task-done' : ''} 
                                ${isTaskOverdue && !todo.completed ? 'bg-red-100' : ''}`;
            
            todoItem.innerHTML = `
                <div class="flex items-center gap-3 flex-1">
                    <input 
                        type="checkbox" 
                        ${todo.completed ? 'checked' : ''} 
                        class="w-5 h-5 text-blue-500"
                        onchange="toggleTodo(${index})"
                    >
                    <div class="flex flex-col flex-1">
                        ${editingIndex === index ? 
                            `<input 
                                type="text" 
                                class="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                                value="${todo.text}"
                                id="edit-input-${index}"
                            >
                            <input 
                                type="datetime-local" 
                                class="w-full mt-2 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                                value="${todo.datetime}"
                                id="edit-time-${index}"
                            >` : 
                            `<span class="text-gray-800">${todo.text}</span>
                            <span class="text-sm text-gray-500">
                                ${isTaskOverdue && !todo.completed ? '⚠️ ' : ''}
                                ${formatDateTime(todo.datetime)}
                            </span>`
                        }
                    </div>
                </div>
                <div class="flex gap-2">
                    <button 
                        onclick="${editingIndex === index ? `saveEdit(${index})` : `startEdit(${index})`}" 
                        class="text-gray-600 hover:text-blue-600"
                        title="${editingIndex === index ? 'Guardar' : 'Editar'}"
                    >
                        ${editingIndex === index ? 
                            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>` :
                            `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                            </svg>`
                        }
                    </button>
                    <button 
                        onclick="deleteTodo(${index})" 
                        class="text-red-500 hover:text-red-700"
                        title="Eliminar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            `;
            
            todoList.appendChild(todoItem);
        });
        
        if (editingIndex !== -1) {
            const editInput = document.getElementById(`edit-input-${editingIndex}`);
            if (editInput) {
                editInput.focus();
                editInput.setSelectionRange(editInput.value.length, editInput.value.length);
            }
        }
        
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Agregar nueva tarea
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        const datetime = todoTime.value;
        
        if (todoText && datetime) {
            todos.push({
                text: todoText,
                datetime: datetime,
                completed: false
            });
            todoInput.value = '';
            todoTime.value = '';
            renderTodos();
        }
    });

    // Función para alternar el estado de una tarea
    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    // Función para eliminar una tarea
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        editingIndex = -1;
        renderTodos();
    };

    // Función para iniciar la edición
    window.startEdit = (index) => {
        editingIndex = index;
        renderTodos();
    };

    // Función para guardar la edición
    window.saveEdit = (index) => {
        const editInput = document.getElementById(`edit-input-${index}`);
        const editTime = document.getElementById(`edit-time-${index}`);
        const newText = editInput.value.trim();
        const newTime = editTime.value;
        
        if (newText && newTime) {
            todos[index].text = newText;
            todos[index].datetime = newTime;
            editingIndex = -1;
            renderTodos();
        }
    };

    // Escuchar la tecla Enter para guardar la edición
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && editingIndex !== -1) {
            saveEdit(editingIndex);
        }
        if (e.key === 'Escape' && editingIndex !== -1) {
            editingIndex = -1;
            renderTodos();
        }
    });

    // Renderizar tareas iniciales
    renderTodos();
}); 