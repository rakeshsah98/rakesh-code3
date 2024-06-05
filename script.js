// script.js

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Define an array of colors for tasks
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#FF8F33'];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';

            const colorCircle = document.createElement('span');
            colorCircle.className = 'task-color';
            colorCircle.style.backgroundColor = colors[index % colors.length];
            taskItem.appendChild(colorCircle);

            const taskText = document.createElement('span');
            taskText.className = 'task-item';
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const actions = document.createElement('div');
            actions.className = 'task-actions';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editTask(index));
            actions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(index));
            actions.appendChild(deleteButton);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
            completeButton.addEventListener('click', () => toggleCompleteTask(index));
            actions.appendChild(completeButton);

            taskItem.appendChild(actions);
            taskList.appendChild(taskItem);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});
