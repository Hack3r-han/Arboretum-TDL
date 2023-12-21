//declare tasks as a global variable
let tasks = [];

window.addEventListener('load', () => {
    //retrieve tasks from localStorage or initialize an empty array
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //call the function to display the tasks
    displayTasks();

    //select the form with the id newTaskForm
    const newTaskForm = document.querySelector('#newTaskForm');

    //Add a 'submit' event to the form
    newTaskForm.addEventListener('submit', e => {
        e.preventDefault(); //prevent the default behaviour of the form, which is to reload the page upon submission

        //Create a task object with the info of the form
        const task = {
            content: e.target.elements.content.value, //event>form>elements>content>text (obtain the value)
            done: false,
            // createdAt: new Date().getTime()
        };

        //Add the new task to the task array
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); //keep the tasks in localStorage
        e.target.reset(); //clear the form input fields after submission

        displayTasks(); //update the displayed tasks on the page
    });
});

//function to show the tasks on the page
function displayTasks() {
    //select the element with the id todo-list
    const todoList = document.querySelector('#todo-list');

    //clean the content
    todoList.innerHTML = '';

    //iterate through the tasks
    tasks.forEach((task, index) => {
        //Create HTML elements to represent the task
        const taskItem = document.createElement('div');
        taskItem.classList.add('todoItem');

        //the following variables create the required elements for the task:

        const label = document.createElement('label'); //checkbox
        const input = document.createElement('input');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        // const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        //Configure the attributes and content of the elements created
        input.type = 'checkbox';
        input.checked = task.done;

        //these lines add CSS classes to specific elements created earlier in the code:

        content.classList.add('taskContent');
        actions.classList.add('taskActions');
        // edit.classList.add('edit');
        deleteBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
        // edit.innerHTML = 'Editar';
        deleteBtn.innerHTML = 'Borrar';

        //these lines structure and assemble the various elements to create a single task item (taskItem), and then append it to the todoList element.

        label.appendChild(input);
        // actions.appendChild(edit);
        actions.appendChild(deleteBtn); 
        taskItem.appendChild(label);
        taskItem.appendChild(content);
        taskItem.appendChild(actions);

        todoList.appendChild(taskItem);

        //Add a 'change' event to the checkbox to mark the task as completed or not completed
        const inp = taskItem.querySelector('input[type="checkbox"]');
        inp.addEventListener('change', function () {
            tasks[index].done = this.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTaskStyle(content, this.checked);
        });

        //add a 'click' event to the 'deleteBtn' button to delete the task
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

//function to delete a task from the array 'tasks'
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}