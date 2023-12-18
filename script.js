
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');
    const clearButton = document.getElementById('clear-button');
    let taskCounter = 0;

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    clearButton.addEventListener('click', clearTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            updateTaskCount(-1);
        });

        const priorityButtons = document.createElement('div');
        priorityButtons.className = 'priority-buttons';
        const redButton = createPriorityButton('priority-red');
        const yellowButton = createPriorityButton('priority-yellow');
        const greenButton = createPriorityButton('priority-green');

        function createPriorityButton(className) {
            const button = document.createElement('button');
            button.className = `priority-button ${className}`;
            button.addEventListener('click', function () {
                setPriority(taskItem, className);
            });
            return button;
        }

        taskItem.innerHTML = `<span>${taskText}</span>`;
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(priorityButtons);
        priorityButtons.appendChild(redButton);
        priorityButtons.appendChild(yellowButton);
        priorityButtons.appendChild(greenButton);

        const date = new Date();
        const dateString = `${date.toLocaleDateString()}`;
        const existingDateElement = taskList.querySelector(`.task-date[data-date="${dateString}"]`);

        if (existingDateElement) {
            existingDateElement.parentNode.insertBefore(taskItem, existingDateElement.nextSibling);
        } else {
            const dateElement = document.createElement('div');
            dateElement.className = 'task-date';
            dateElement.textContent = dateString;
            dateElement.setAttribute('data-date', dateString);
            taskList.appendChild(dateElement);
            taskList.appendChild(taskItem);
        }

        taskInput.value = '';
        updateTaskCount(1);
    }

    function updateTaskCount(change) {
        taskCounter += change;
        taskCount.textContent = taskCounter;
    }

    function clearTasks() {
        taskList.innerHTML = '';
        taskCounter = 0;
        taskCount.textContent = taskCounter;
    }

    function setPriority(taskItem, priorityClassName) {
        taskItem.className = `task-item ${priorityClassName}`;
    }
});
