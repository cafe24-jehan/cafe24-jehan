document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('.todo-list');
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');

    // localStorage에서 todos 가져오기
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    renderTodos();

    todoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function renderTodos() {
        todoList.innerHTML = '';
        
        // todos 배열을 기반으로 Todo 아이템 생성
        todos.forEach(todo => {
            const todoItem = createTodoItem(todo);
            todoList.appendChild(todoItem);
        });
    }

    function createTodoItem(todo) {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.className = 'todo-text';
        if (todo.completed) span.classList.add('completed');
        span.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'todo-delete';
        deleteButton.textContent = '×';
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(span);
        todoItem.appendChild(deleteButton);
        
        setupTodoItemListeners(todoItem, checkbox, deleteButton, span, todo);
        
        return todoItem;
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        // 새로운 todo 객체 생성
        const todo = {
            id: Date.now(), // 고유 ID 생성. 정확히 어떤 항목을 삭제해야하는지 구분
            text: todoText,
            completed: false
        };

        // todos 배열에 추가
        todos.push(todo);
        
        // localStorage 업데이트
        saveTodos();
        
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
        
        todoInput.value = '';
    }

    function setupTodoItemListeners(todoItem, checkbox, deleteButton, span, todo) {
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            span.classList.toggle('completed', checkbox.checked);
            saveTodos();
        });

        deleteButton.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveTodos();
            todoItem.remove();
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});