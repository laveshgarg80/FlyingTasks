
import {createNewTaskElement,deleteButton,pickAndDropTask} from './helper.js'

if (localStorage.getItem('Tasks')) {
    let data = localStorage.getItem('Tasks');
    data = JSON.parse(data);
    console.log(data);
    for (let taskBox in data) {
        const parent = document.querySelector(`#${taskBox}`);
        data[taskBox].map(ele => {
            createNewTaskElement(ele, parent);
        })
    }
    pickAndDropTask();
    deleteButton('localstorage');
}