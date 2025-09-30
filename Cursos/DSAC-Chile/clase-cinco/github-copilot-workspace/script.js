class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.nextId = this.getNextId();
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }
    
    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }
    
    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }
    
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;
        
        const todo = {
            id: this.nextId++,
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.todos.push(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    editTodo(id, newText) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
        }
    }
    
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }
    
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.renderEmptyState();
        } else {
            this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
            this.bindTodoEvents();
        }
        
        this.updateStats();
    }
    
    renderEmptyState() {
        const emptyMessages = {
            all: 'No tienes tareas. ¡Agrega una nueva!',
            active: 'No tienes tareas activas. ¡Buen trabajo!',
            completed: 'No tienes tareas completadas.'
        };
        
        this.todoList.innerHTML = `
            <div class="empty-state">
                <h3>Lista vacía</h3>
                <p>${emptyMessages[this.currentFilter]}</p>
            </div>
        `;
    }
    
    createTodoHTML(todo) {
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            </li>
        `;
    }
    
    bindTodoEvents() {
        // Checkboxes
        this.todoList.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                this.toggleTodo(id);
            });
        });
        
        // Delete buttons
        this.todoList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.todo-item').dataset.id);
                this.deleteTodo(id);
            });
        });
        
        // Edit buttons
        this.todoList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const todoItem = e.target.closest('.todo-item');
                const id = parseInt(todoItem.dataset.id);
                this.startEdit(todoItem, id);
            });
        });
    }
    
    startEdit(todoItem, id) {
        const textSpan = todoItem.querySelector('.todo-text');
        const currentText = textSpan.textContent;
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-edit-input';
        input.value = currentText;
        
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                this.editTodo(id, newText);
            } else {
                this.render();
            }
        };
        
        const cancelEdit = () => {
            this.render();
        };
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
        });
        
        input.addEventListener('blur', saveEdit);
        
        textSpan.parentNode.replaceChild(input, textSpan);
        input.focus();
        input.select();
    }
    
    updateStats() {
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        const completedTodos = this.todos.filter(todo => todo.completed).length;
        
        if (activeTodos === 0 && this.todos.length > 0) {
            this.todoCount.textContent = '¡Todas las tareas completadas!';
        } else if (activeTodos === 1) {
            this.todoCount.textContent = '1 tarea restante';
        } else {
            this.todoCount.textContent = `${activeTodos} tareas restantes`;
        }
        
        this.clearCompletedBtn.style.display = completedTodos > 0 ? 'block' : 'none';
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('nextId', this.nextId.toString());
    }
    
    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }
    
    getNextId() {
        const saved = localStorage.getItem('nextId');
        return saved ? parseInt(saved) : 1;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});

// Opcional: Agregar algunos datos de demostración si no hay todos guardados
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todos') === null) {
        const demoTodos = [
            { id: 1, text: 'Bienvenido a tu lista de tareas', completed: false, createdAt: new Date().toISOString() },
            { id: 2, text: 'Haz clic en el checkbox para marcar como completada', completed: false, createdAt: new Date().toISOString() },
            { id: 3, text: 'Usa los botones de filtro para ver diferentes vistas', completed: false, createdAt: new Date().toISOString() }
        ];
        localStorage.setItem('todos', JSON.stringify(demoTodos));
        localStorage.setItem('nextId', '4');
    }
});