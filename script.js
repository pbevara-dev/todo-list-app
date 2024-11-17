const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        listItem.addEventListener('click', () => {
            listItem.classList.toggle('done');
        });

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});

