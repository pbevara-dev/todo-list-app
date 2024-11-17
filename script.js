const taskInput = document.getElementById('task-input');
const taskDateInput = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task');
const taskGrid = document.getElementById('task-grid');

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskCard(task.text, task.date, task.note, task.done));
};

// Save tasks to LocalStorage
const saveTasks = () => {
    const tasks = Array.from(taskGrid.children).map(card => {
        const taskText = card.querySelector('.task-text').textContent;
        const taskDate = card.querySelector('.task-date').textContent.replace('Due: ', '');
        const note = card.querySelector('.task-note').value;
        return {
            text: taskText,
            date: taskDate,
            note: note,
            done: card.classList.contains('done'),
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Add a task card with a note
const addTaskCard = (task, date, note = '', done = false) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    if (done) card.classList.add('done');

    const taskText = document.createElement('div');
    taskText.textContent = task;
    taskText.className = 'task-text';

    const taskDate = document.createElement('div');
    taskDate.textContent = `Due: ${date || 'No date'}`;
    taskDate.className = 'task-date';

    const taskNote = document.createElement('textarea');
    taskNote.className = 'task-note';
    taskNote.value = note;
    taskNote.addEventListener('input', () => saveTasks());

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        card.remove();
        saveTasks();
    });

    card.appendChild(taskText);
    card.appendChild(taskDate);
    card.appendChild(taskNote);
    card.appendChild(deleteButton);

    card.addEventListener('click', () => {
        card.classList.toggle('done');
        saveTasks();
    });

    taskGrid.appendChild(card);
    saveTasks();
};

// Add a new task
addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const dueDate = taskDateInput.value;
    if (task) {
        addTaskCard(task, dueDate);
        taskInput.value = '';
        taskDateInput.value = '';
    }
});

// Initialize the app
loadTasks();
