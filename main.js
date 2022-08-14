let inputTask = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".todo-list");
let storage = localStorage.getItem("tasks");

let allTasks = storage ? JSON.parse(storage) : [];

function show() {
  tasks.innerHTML = allTasks
    .map(
      (task) =>
        `<li>
<div class = 'first'>
<button class = 'correct'><i class="far fa-check-circle"></i></button>
${task.input}
</div> 

				<div class = 'icons'>
				<button class= "done" data-id = ${task.id} ><i class="fas fa-trash-alt"></i></button>
				</div> </li>`
    )
    .join(" ");
}

// add tasks
add.onclick = function () {
  let input = inputTask.value.trim();
  if (input !== "") {
    allTasks.push({ id: Date.now(), input, check: false });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    inputTask.value = "";
    inputTask.focus();
    show();
  } else if (input == "" && tasks.children.length == 0) {
    let div = document.createElement("div");
    let btn = document.createElement("button");
    btn.innerHTML = "CLOSE";
    btn.onclick = () => {
      btn.parentElement.remove();
    };
    let title = document.createElement("h1");
    title.innerHTML = "ما تنطق يابني التاسكات فين ؟";
    div.className = "divImg";
    let img = document.createElement("img");
    img.setAttribute("src", "./images/DBZG39cXUAQA9Ye.jpg");
    div.append(img);
    div.append(title);
    div.append(btn);
    tasks.append(div);
  } else if (
    input == "" &&
    tasks.children.length == 1 &&
    tasks.children[0].className == "divImg"
  ) {
    let div = document.querySelector(".divImg");
    let oldTitle = document.querySelector(".divImg h1");
    oldTitle.innerHTML = "!انت بدوس تاني ليه";
    let oldImg = document.querySelector(".divImg img");
    oldImg.setAttribute("src", "./images/spPV-Ugd_400x400.jpg");
    div.prepend(oldTitle);
  }
};
show();

// Delete Tasks
tasks.addEventListener("click", (ev) => {
  // Delete
  if (ev.target.className == "done") {
    const todo = ev.target.parentElement.parentElement;
    todo.classList.add("rotate");
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
    let id = ev.target.dataset.id;
    allTasks = allTasks.filter((e) => e.id != id);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }
  //correct
  else if (ev.target.className == "correct") {
    let todo = ev.target.parentElement.parentElement;
    todo.classList.toggle("right");
  }
});
