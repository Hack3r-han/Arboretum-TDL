//declare tasks as a global variable
let tasks = [];

window.addEventListener('load', () => {
    //retrieve tasks from localStorage or initialize an empty array
    tasks = JSON.parse(localStorage.getItem('tasks')) || []; //converting a JSON string into a JavaScript object (native format)

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

        displayTasks(); //update the displayed tasks on the page by calling the displayTasks function
    });
});

//function to show the tasks on the page
function displayTasks() {
    //select the element with the id todo-list
    const todoList = document.querySelector('#todo-list');

    //clean the content to avoid duplication
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
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        //Configure the attributes and content of the elements created
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

        //Add a 'change' event to the checkbox to mark the task as completed or not completed
        const taskCheckbox = taskItem.querySelector('input[type="checkbox"]'); //searches for an <input> element with the type attribute set to "checkbox" within that task container.
        taskCheckbox.addEventListener('change', function () {
            tasks[index].done = this.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateTaskStyle(content, this.checked);
        });

        //add a 'click' event to the 'deleteBtn' button to delete the task
        deleteBtn.addEventListener('click', function () {
            deleteTask(index); //call the delete function and determine which task is targeted for deletion from the array
        });  

        //add a 'click' rvent to the 'edit' button to edit the task
        edit.addEventListener('click', (event) => {
            handleEdit(index, content, edit);
        })
    });
}

//function to update task style based on checkbox state
function updateTaskStyle(content, isChecked) {
const taskInput = content.querySelector('input[type="text"]'); //access the element in HTML
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

//function to edit the task content
function handleEdit(index, contentDiv, editButton) {
    const task = tasks[index];
    
    //create an input field
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.content;

    //replace the content div with the input field
    contentDiv.innerHTML = '';
    contentDiv.appendChild(editInput);

    //change the button text to "Guardar"
    editButton.innerHTML = 'Guardar';

    //save button event listener
    editButton.addEventListener('click', function () {
        task.content = editInput.value; //update the task content with the new value
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(); //update the displayed tasks
    });
}

//add the "Clean Tasks" button functionality
const cleanTasksButton = document.getElementById('doneBtn');

// Add a 'click' event listener to the button
cleanTasksButton.addEventListener('click', function () {
    // Clear tasks from the display
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    // Clear tasks from local storage
    localStorage.removeItem('tasks');

    // Update the tasks array to an empty array
    tasks = [];
});


//add a sound to the doneBtn

function sound(){
    var snd = new Audio('sounds/birds.mp3')
    snd.play()
}

module.exports = {
    updateTaskStyle,
}