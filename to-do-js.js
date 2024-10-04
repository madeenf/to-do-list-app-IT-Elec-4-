let tasks = [];

// function to load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks(); // render the tasks after loading
}

// function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// function to render tasks
function renderTasks() {
    const taskList = document.getElementById("myUL");
    taskList.innerHTML = ""; // clear the list before rendering
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.date} - ${task.title}</span>
            <div class="button-container">
                <button class="close" onclick="deleteTask(${index})">×</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// function to add a task
function addTask() {
    const inputValue = document.getElementById("myInput").value;
    const dateValue = document.getElementById("myDate").value;

    if (inputValue === '' || dateValue === '') {
        alert("You must write a task and select a date!");
    } else {
        tasks.push({ title: inputValue, date: dateValue });
        saveTasks(); // save tasks to localStorage
        document.getElementById("myInput").value = "";
        document.getElementById("myDate").value = "";
        renderTasks();
    }
}

// function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // remove the task from the array
    saveTasks(); // save the updated tasks to localStorage
    renderTasks(); // re-render the list
}

// function to edit a task
function editTask(index) {
    const newTitle = prompt("Edit your task:", tasks[index].title);
    const newDate = prompt("Edit the date:", tasks[index].date);
    if (newTitle !== null && newDate !== null) {
        tasks[index] = { title: newTitle, date: newDate };
        saveTasks(); // save the updated tasks to localStorage
        renderTasks(); // re-render the list
    }
}

// load tasks from localStorage when the page loads
window.onload = loadTasks;
