document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.querySelector('.todo-list');
    const todoInput = document.querySelector('.todo-input');
    const todoButton = document.querySelector('.todo-button');

    todoButton.addEventListener('click', () => {
        const todoText = todoInput.value;
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;
        todoList.appendChild(todoItem);
        todoInput.value = '';
        todoItem.addEventListener('click', () => {
            todoItem.style.textDecoration = 'line-through';
        });

    });
});