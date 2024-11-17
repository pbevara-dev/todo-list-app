const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.text} (Due: ${task.date || 'No date'})`;
        if (task.done) listItem.classList.add('done');
        addDeleteButton(listItem);
        listItem.addEventListener('click', () => toggleTask(listItem, task.text));
        taskList.appendChild(listItem);
    });
};

// Save tasks to LocalStorage
const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(item => {
        const [text, dueDatePart] = item.textContent.split(' (Due: ');
        const date = dueDatePart ? dueDatePart.replace(')', '') : '';
        return {
            text: text.trim(),
            date: date.trim(),
            done: item.classList.contains('done'),
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Toggle task completion
const toggleTask = (listItem) => {
    listItem.classList.toggle('done');
    saveTasks();
};

// Add delete button to a task
const addDeleteButton = (listItem) => {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        saveTasks();
    });
    listItem.appendChild(deleteButton);
};

// Add a new task
addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const dueDate = taskDateInput.value;
    if (task) {
        const listItem = document.createElement('li');
        listItem.textContent = `${task} (Due: ${dueDate || 'No date'})`;
        addDeleteButton(listItem);
        listItem.addEventListener('click', () => toggleTask(listItem));
        taskList.appendChild(listItem);
        taskInput.value = '';
        taskDateInput.value = '';
        saveTasks();
    }
});

// Initialize the app
loadTasks();
