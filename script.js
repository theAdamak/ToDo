// document.querySelector("#push").onclick = function () {
//   if (document.querySelector("#newtask input").value.length == 0) {
//     alert("Please Enter a Task");
//   } else {
//     document.querySelector("#tasks").innerHTML += `
//             <div class="task">
//                 <span id="taskname">
//                     ${document.querySelector("#newtask input").value}
//                 </span>
//                 <button class="delete">
//                     <i class="far fa-trash-alt"></i>
//                 </button>
//             </div>
//         `;

//     var current_tasks = document.querySelectorAll(".delete");
//     for (var i = 0; i < current_tasks.length; i++) {
//       current_tasks[i].onclick = function () {
//         this.parentNode.remove();
//       };
//     }

//     var tasks = document.querySelectorAll(".task");
//     for (var i = 0; i < tasks.length; i++) {
//       tasks[i].onclick = function () {
//         this.classList.toggle("completed");
//       };
//     }

//     document.querySelector("#newtask input").value = "";
//   }
// };

// edited
const tasks = document.querySelector("#tasks");
const newtask = document.querySelector("#newtask input");
const addTask = document.querySelector("#push");

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    tasks.innerHTML += `
      <div class="task ${task.completed ? "completed" : ""}">
        <span id="taskname">${task.name}</span>
        <button class="delete"><i class="far fa-trash-alt"></i></button>
      </div>
    `;
  });

  updateEventListeners();
}

function saveTasks() {
  const taskElements = document.querySelectorAll(".task");
  const tasksToSave = [];
  taskElements.forEach((taskElement) => {
    const taskName = taskElement.querySelector("#taskname").textContent;
    const completed = taskElement.classList.contains("completed");
    tasksToSave.push({ name: taskName, completed: completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasksToSave));
}

function updateEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.onclick = function () {
      this.parentElement.remove();
      saveTasks();
    };
  });

  const tasksElements = document.querySelectorAll(".task");
  tasksElements.forEach((taskElement) => {
    taskElement.onclick = function () {
      this.classList.toggle("completed");
      saveTasks();
    };
  });
}

document.addEventListener("DOMContentLoaded", loadTasks);

addTask.onclick = function () {
  if (newtask.value.length == 0) {
    alert("Please Enter a Task");
  } else {
    tasks.innerHTML += `
      <div class="task">
        <span id="taskname">${newtask.value}</span>
        <button class="delete"><i class="far fa-trash-alt"></i></button>
      </div>
    `;

    newtask.value = "";

    updateEventListeners();
    saveTasks();
  }
};
