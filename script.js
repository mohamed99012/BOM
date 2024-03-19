// BOM challenge
let addBtn = document.querySelector("form input[type = 'submit']");
let taskInput = document.querySelector("form input[name = 'add']");
let tasksDiv = document.querySelector(".tasks");
let errDiv = document.querySelector(".err");
let tasksArr = [];
window.onload = function () {
  if (localStorage.getItem("tasks")) {
    tasksArr = JSON.parse(localStorage.getItem("tasks"));
    createTasks(...tasksArr);
  }
};

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let inVal = taskInput.value;

  if (
    taskInput.value != "" &&
    !Array.from(tasksArr.map((e) => e.task)).includes(inVal)
  ) {
    errDiv.innerHTML = "";
    let allIds = Array.from(tasksArr.map((e) => e.id));
    tasksArr.push({
      id: allIds.length > 0 ? allIds[allIds.length - 1] + 1 : 1,
      task: inVal,
    });
    createTasks(...tasksArr);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  } else if (Array.from(tasksArr.map((e) => e.task)).includes(inVal)) {
    errDiv.innerHTML = `${taskInput.value} Already Exist`;
  } else {
    errDiv.innerHTML = "Task Field Is Empty";
  }
});
// ####################
function createTasks(...arrElements) {
  tasksDiv.innerHTML = "";
  arrElements.forEach((el) => {
    let task = document.createElement("div");
    task.id = el.id;
    task.style.cssText = `
        position : relative ;
        background-color : white ; 
        padding : 10px ; 
        border-bottom : 2px solid #51d0de ;
        `;
    let taskName = document.createTextNode(el.task);
    let taskP = document.createElement("p");
    taskP.style.cssText = ` 
         font-size : 17px ;
         margin : 0 ;
        `;
    taskP.append(taskName);
    let delSpan = document.createElement("span");
    delSpan.className = "delete";
    delSpan.onclick = function () {
      removeElement(delSpan.parentElement.id);
    };
    delSpan.append(document.createTextNode("Delete"));
    delSpan.style.cssText = `
        font-size : 13px ;
        background-color : red ; 
        border-radius : 5px ; 
        padding : 3px 6px ; 
        position : absolute ; 
        right : 7px ; 
        top : 50% ; 
        transform : translateY(-50%);
        cursor : pointer ; 
        color : white ;
        `;
    task.appendChild(taskP);
    task.appendChild(delSpan);
    tasksDiv.appendChild(task);
  });
}
// ####################
function removeElement(id) {
  tasksArr = tasksArr.filter((el) => el.id != id);
  createTasks(...tasksArr);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}
