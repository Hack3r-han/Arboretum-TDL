//declare tasks as a global variable
let tasks = [];

window.addEventListener('load', () => {
    //retrieve tasks from localStorage or initialize an empty array
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    displayTasks();

    const newTaskForm = document.querySelector('#newTaskForm');

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault(); //prevent the default behaviour of the form, which is to reload the page upon submission

        const task = {
            content: e.target.elements.content.value, //event>form>elements>content>text
            done: false,
            createdAt: new Date().getTime()
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        e.target.reset(); //clear the form input fields after submission

        displayTasks(); //update the displayed tasks on the page
    });
});

function displayTasks() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('todoItem');

        //the following variables create the required elements for the task:

        const label = document.createElement('label'); //checkbox
        const input = document.createElement('input');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = task.done;

        //these lines add CSS classes to specific elements created earlier in the code:

        content.classList.add('taskContent');
        actions.classList.add('taskActions');
        edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
        edit.innerHTML = 'Editar';
        deleteBtn.innerHTML = 'Borrar';

        //these lines structure and assemble the various elements to create a single task item (taskItem), and then append it to the todoList element.

        label.appendChild(input);
        actions.appendChild(edit);
        actions.appendChild(deleteBtn); 
        taskItem.appendChild(label);
        taskItem.appendChild(content);
        taskItem.appendChild(actions);

        todoList.appendChild(taskItem);

        //add event listener to each checkbox after adding elements to the DOM
        const inp = taskItem.querySelector('input[type="checkbox"]');
        inp.addEventListener('change', function () {
            tasks[index].done = this.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTaskStyle(content, this.checked);
        });

        //add event listener to delete tasks
        deleteBtn.addEventListener('click', function () {
        deleteTask(index);
        });
    });
}

//function to update task style based on checkbox state
function updateTaskStyle(content, isChecked) {
const taskInput = content.querySelector('input[type="text"]');
if (isChecked) {
    taskInput.style.textDecoration = 'line-through';
    taskInput.style.color = 'gray';
} else {
    taskInput.style.textDecoration = 'none';
    taskInput.style.color = 'black';
}
}

//function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}