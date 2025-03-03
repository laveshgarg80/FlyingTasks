export function createNewTaskElement(taskName, parentColumn) {
    const newTaskToAdd = document.createElement('div');
    newTaskToAdd.classList.add('task');
    newTaskToAdd.setAttribute('draggable', true);

    const taskHeading = document.createElement('h5');
    taskHeading.innerHTML = taskName;
    taskHeading.classList.add('task-heading');
    newTaskToAdd.appendChild(taskHeading);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('task-delete-btn');
    deleteBtn.innerHTML = 'X';
    newTaskToAdd.appendChild(deleteBtn);
    parentColumn.appendChild(newTaskToAdd)
}

export function deleteButton(kahaSeAye) {
    const allTasksDeleteButton = document.querySelectorAll('.task-delete-btn');
    allTasksDeleteButton.forEach((taskDeleteBtn) => {

        taskDeleteBtn.addEventListener('click', () => {
            const taskNode = taskDeleteBtn.parentNode;
            const taskBoxNode = taskNode.parentNode;

            let data = localStorage.getItem('Tasks');
            data = JSON.parse(data);
            const index = Array.from(taskBoxNode.children).indexOf(taskNode)
            data[taskBoxNode.id].splice(index, 1);
            localStorage.setItem('Tasks', JSON.stringify(data));

            taskBoxNode.removeChild(taskNode);
        })
    });
}

export function pickAndDropTask() {
    const allTasks = document.querySelectorAll('.task');
    allTasks.forEach((task) => {
        task.addEventListener('dragstart', () => {
            task.classList.add('current-dragging-task');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('current-dragging-task');
        })
    });
}
