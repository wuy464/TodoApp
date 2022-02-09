const form = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoBody = document.querySelector(".todo-body");
const url = "https://62031a6b4d21c200170b9b4b.mockapi.io/api/v1/todo";

// submit form + post data
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const valueInput = todoInput.value;
  const listTask = {
    title: this.elements["todoInput"].value,
  };
  if (valueInput !== "") {
    loading();
    await postTask(listTask);
    removeLoading();
    this.reset();
    getTask();
  }
});

// create item task + custom attr dataset
function createTask(text) {
  const template = `<div class="todo-task">
         <p class="todo-task-text">${text.title}</p>
          <div class="todo-tool">
            <span class="todo-tool-delete"
              ><i data-id =${text.id} class="icon ion-md-trash"></i
            ></span>
          </div>
        </div>`;
  todoBody.insertAdjacentHTML("beforeend", template);
}

// API fetch
async function getTask() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  todoBody.innerHTML = "";
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => {
      createTask(item);
    });
  }
}
getTask();

// API POST
async function postTask({ title }) {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
// API DELETE
async function deleteTask(id) {
  await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
// delete and check Task
document.body.addEventListener("click", async function (e) {
  if (e.target.matches(".ion-md-trash")) {
    //use custom attr get index item
    console.log(e.target);
    const id = e.target.dataset.id;
    console.log(id);
    loading();
    await deleteTask(id);
    removeLoading();
    getTask();
  }
  if (e.target.matches(".todo-task-text")) {
    e.target.classList.add("active");
  }
});

// loading
function loading() {
  const template = `<div class="loading"></div>`;
        document.body.insertAdjacentHTML("beforeend", template);
}
//remove loading
function removeLoading(){
  const loader = document.querySelector(".loading");
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
}
