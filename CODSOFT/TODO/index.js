document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasks();

    // Add a new task
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    // Handle the 'Enter' key press
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Delete a task
    taskList.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            const li = event.target.parentElement;
            removeTask(li);
        }
    });

    function addTask(text) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${text}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(li);

        
        saveTasks();
    }

    function removeTask(task) {
        task.remove();

        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map((task) => task.querySelector("span").textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((taskText) => {
            addTask(taskText);
        });
    }
});
