function createNewTaskElement(taskName, parentColumn) {
    const newTaskToAdd = document.createElement('div');
    newTaskToAdd.classList.add('task');
    newTaskToAdd.setAttribute('draggable', true);
    newTaskToAdd.innerHTML = taskName;
    parentColumn.appendChild(newTaskToAdd)
}


if (localStorage.getItem('Tasks')) {
    let data = localStorage.getItem('Tasks');
    data = JSON.parse(data);
    for (let taskBox in data) {
        const parent = document.querySelector(`#${taskBox}`);
        data[taskBox].map(ele => {
            createNewTaskElement(ele, parent);
        })
    }
}

const newTaskBtn = document.querySelector('#new-task');

function pickAndDropTask() {
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

newTaskBtn.addEventListener('click', () => {
    if (!localStorage.getItem('Tasks')) localStorage.setItem('Tasks', JSON.stringify({ 'todo-box-tasks': [], 'in-progress-tasks': [], 'done-tasks': [] }));
    const newTaskName = prompt('Please enter a new task!!');
    if (!newTaskName) return;

    //constructing a new task
    const todoBoxTasks = document.querySelector('#todo-box-tasks');
    createNewTaskElement(newTaskName, todoBoxTasks);

    let data = localStorage.getItem('Tasks');
    data = JSON.parse(data);
    data['todo-box-tasks'].push(newTaskName);
    localStorage.setItem('Tasks', JSON.stringify(data));

    pickAndDropTask();
});

pickAndDropTask();

const allTaskBox = document.querySelectorAll('.task-box')
allTaskBox.forEach((taskBox) => {
    taskBox.addEventListener('dragover', (event) => {
        event.preventDefault();
    });


    taskBox.addEventListener('drop', () => {
        const taskToAdd = document.querySelector('.current-dragging-task');
        const destinationTaskBox = taskBox.querySelector('.tasks');
        const sourceTaskBox = document.querySelector('.removeTaskFromMe');
        
        let data = localStorage.getItem('Tasks');
        data = JSON.parse(data);

        //delete from Source
        const index = Array.from(sourceTaskBox.children).indexOf(taskToAdd)
        data[sourceTaskBox.id].splice(index, 1);
        sourceTaskBox.classList.remove('removeTaskFromMe');

        //Add in Destination
        data[destinationTaskBox.id].push(taskToAdd.innerHTML);
        localStorage.setItem('Tasks', JSON.stringify(data));
        
        destinationTaskBox.appendChild(taskToAdd);
    })

    taskBox.addEventListener('dragstart', () => {
        taskBox.querySelector('.tasks').classList.add('removeTaskFromMe')
    });
})

