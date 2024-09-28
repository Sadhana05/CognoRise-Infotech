document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); // Fixed getItem

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskList(); // Fixed function call
        updateStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Fixed setItem
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0; // Handle division by zero
    const progressBar = document.getElementById("progress");

    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks} / ${totalTasks}`;

    if (tasks.length && completeTasks === totalTasks) {
        blastConfetti(); // Corrected function name
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear the task list before adding new items

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class='bx bx-edit' onClick="editTask(${index})"></i>
                    <i class='bx bx-trash' onClick="deleteTask(${index})"></i>
                </div>
            </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index)); // Use change event for checkbox
        taskList.append(listItem);
    });
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

const blastConfetti = () => { // Fixed typo
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
};


