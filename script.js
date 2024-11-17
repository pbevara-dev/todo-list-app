const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        if (task.done) listItem.classList.add('done');
        listItem.addEventListener('click', () => toggleTask(listItem, task.text));
        taskList.appendChild(listItem);
    });
};

// Save tasks to LocalStorage
const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(item => ({
        text: item.textContent,
        done: item.classList.contains('done'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Toggle task completion
const toggleTask = (listItem, taskText) => {
    listItem.classList.toggle('done');
    saveTasks();
};

// Add a new task
addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.addEventListener('click', () => toggleTask(listItem, task));
        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasks();
    }
});

// Initialize the app
loadTasks();
