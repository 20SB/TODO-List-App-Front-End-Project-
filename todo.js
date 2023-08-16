let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function renderList() {
  taskList.innerHTML = "";
  for (let task of tasks) {
    addtaskToDOM(task);
    // console.log(task);
  }
  tasksCounter.innerHTML = tasks.length;
}

function addtaskToDOM(task) {
     const li = document.createElement('li');
  
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? "checked" : ""} class="custom-checkbox">
        <label for="${task.id}"> ${task.text} </label>
        <img src="bin.svg" class="delete" data-id="${task.id}" />
        `;
    taskList.append(li);
}

function toggleTask(taskId) {
  const task = tasks.filter((task) => {
    return task.id === taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification("Task Toggled Successfully");
    console.log(tasks);
    return;
  }
//   console.log(tasks);
  showNotification("Something went wrong");
}

function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("Task Deleted Successfully");
  console.log(tasks);
}

function addTask(task) {
  tasks.push(task);
//   console.log(tasks);
  renderList();
  showNotification("Task Added Successfully");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  // console.log(e.key +' '+ e.target.value);
  if (e.key === "Enter") {
    const text = e.target.value;
    // console.log("text: ", text);
    if (!text) {
      // console.error("Empty Input");
      showNotification("Text cannot be Empty");
      return;
    }
    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
function handleClickListener(e){
 const target = e.target;
 if(target.className === 'delete'){
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
 }
 else if(target.className === 'custom-checkbox'){
    const taskId = target.id;
    toggleTask(taskId);
    return;
 }

}
addTaskInput.addEventListener("keyup", handleInputKeyPress);
document.addEventListener('click', handleClickListener);