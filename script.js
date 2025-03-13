const todoForm = document.querySelector('form');
const taskInput = document.getElementById('task-input');
const todoListUL = document.getElementById('task-list');

// Create an array to store the tasks
let allTasks = getTodos();
// Update the list of tasks when the page loads
updateToDoList();

todoForm.addEventListener('submit', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the function that actually adds the task
    addTask(); 
});

// Function to create a task item
function addTask() {
    // Get the task text from the input element and remove any leading or trailing white spaces
    const taskText = taskInput.value.trim();
    // to prevent empty task from being added
    if(taskText.length > 0) {
        // create a todo object with the task text and a completed property set to false
        // For page reload
        const todoObject = {
            text: taskText,
            completed: false
        }
        // add the task to the allTasks array
        // For page reload
        allTasks.push(todoObject);
        // update the list of tasks
        updateToDoList();
        // save the tasks to local storage
        saveTasks();
        // clear the input field after adding task
        taskInput.value = '';
    }
};

function updateToDoList() {
    // Clear the current list of tasks
    todoListUL.innerHTML = '';
    // Loop through the allTasks array and create a task item for each task
    allTasks.forEach((todo, todoIndex) => {
        // Create a task item
        todoItem = createTaskItem(todo, todoIndex);
        // Append the task item to the list
        todoListUL.append(todoItem);
    })
}

// Function to create a task item
function createTaskItem(todo, todoIndex) {
    // Create a unique ID for the task
    const todoID = "todo-" + todoIndex;
    // Create a new list item element
    const todoLI = document.createElement('li');
    // Add a class to the list item element
    const todoText = todo.text;
todoLI.className = "task";

todoLI.innerHTML = `
    <input id="${todoID}" type="checkbox" />
    <label class="custom-checkbox" for="${todoID}">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="transparent"
        >
            <path
                d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
            />
        </svg>
    </label>
    <span class="task-text">${todoText}</span>
    <button class="delete-button">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--accent-color)"
        >
            <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
            />
        </svg>
    </button>
`;

// Delete task when the delete button is clicked
const deleteButton = todoLI.querySelector('.delete-button');
// Add an event listener to the delete button
deleteButton.addEventListener("click", () => {
    // Delete the task from the allTasks array
    deleteTask(todoIndex);
})



// Function to delete a task
function deleteTask(todoIndex) {
    // Remove the task from the allTasks array
    allTasks = allTasks.filter((_, index) => index !== todoIndex);
    // Save the updated tasks to local storage
    saveTasks();
    // Update the list of tasks
    updateToDoList();
}

// Mark task as completed when the checkbox is checked
const checkbox = todoLI.querySelector('input');
// Set the checkbox to checked if the task is completed
checkbox.addEventListener('change', () => {
    // Mark the task as completed
    allTasks[todoIndex].completed = checkbox.checked;
    // Save the updated tasks to local storage
    saveTasks();
});

// Set the checkbox to checked if the task is completed
checkbox.checked = todo.completed;

return todoLI;
}

// Save the tasks to local storage

function saveTasks() {
    // Convert the allTasks array to a JSON string
    const todosJson = JSON.stringify(allTasks);
    // Save the JSON string to local storage
    localStorage.setItem('tasks', todosJson);
}

// Load the tasks from local storage
function getTodos() {
    // Get the JSON string of tasks from local storage 
    const todos = localStorage.getItem('tasks') ||  '[]';
    // Parse the JSON string into an array
    return JSON.parse(todos);
}



