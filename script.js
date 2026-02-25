const taskInput = document.querySelector("#task-input");
const dateInput = document.querySelector("#date-input");
const addButton = document.querySelector(".add-button");
const alertMessage = document.querySelector(".alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllBtn = document.querySelector(".deleteAll");
const pendingBtn = document.querySelector(".pending");
const doBtn = document.querySelector(".DoBtn");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
const editAgianBtn = document.querySelector("#edit");


const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};
const addToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(allTodos));
};

const showTodos = () => {
  todosBody.innerHTML = "";
  if (!allTodos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!!</td></tr>";
    return;
  }
  allTodos.forEach((item) => {
    todosBody.innerHTML += `
    <tr>
        <td>${item.Task}</td>
    <td>${item.date}</td>
    <td>${item.completed ? "Completed" : "Pending"}</td>
    <td>
    <button onclick= 'editHandler(${item.id})'>Edit</button>
    <button onclick= 'changeDostatus(${item.id})' class='DoBtn'>${item.completed ? "UnDo" : "Do"}</button>   
    <button onclick='deletehandler(${item.id})'>Delete</button>       
    </td>
    </tr>
    `;
  });
};
showTodos();
const addHandler = () => {
  const isDuplicated = allTodos.some(
    (item) => item.Task === taskInput.value.trim().toLowerCase(),
  );
  // console.log(allTodos);
  // console.log(!!dateInput.value, "sh");
  if (!taskInput.value.trim()) {
    showAlert("Please Enter a Todo!", "error");
  } else if (isDuplicated) {
    showAlert("this Todo is already exist", "error");
  } else if (!!taskInput.value && !dateInput.value) {
    // console.log("f u");
    const myTodoObject = {
      id: Date.now(),
      Task: taskInput.value,
      date: "No Date",
      completed: false,
    };
    allTodos.push(myTodoObject);
    addToLocalStorage();
    showTodos();
    // console.log(allTodos);
    showAlert("Todo added successfully", "success");
  } else if (taskInput.value && dateInput.value) {
    const myTodoObject = {
      id: Date.now(),
      Task: taskInput.value,
      date: dateInput.value,
      completed: false,
    };
    allTodos.push(myTodoObject);
    addToLocalStorage();
    showTodos();
    console.log(allTodos);
    showAlert("Todo added successfully", "success");
  }
  taskInput.value = "";
  dateInput.value = "";
};

taskInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addButton.click();
  }
});
dateInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addButton.click();
  }
});
// taskInput.addEventListener("keydown", (e) => {
//   if (e.key == "Enter") {
//     editAgianBtn.click();
//   }
// });
// dateInput.addEventListener("keydown", (e) => {
//   if (e.key == "Enter") {
//     editAgianBtn.click();
//   }
// });



const changeDostatus = (id) => {
  const todo = allTodos.find((item) => item.id === id);
  console.log(todo);
  if (todo) {
    todo.completed = !todo.completed;
    showTodos();
    addToLocalStorage();
  }
};
const deleteAllHandler = () => {
  if (allTodos.length) {
    allTodos = [];
    addToLocalStorage();
    showTodos();
    showAlert("All todos cleared successfully", "success");
  } else {
    showAlert("you dont have any todos to delete", "error");
  }
};
const editHandler = (id) => {
  const foundedTodo = allTodos.filter((item) => item.id === id);
  foundedTodo.forEach((item) => {
    taskInput.value = item.Task;
    if (item.date == "No Date") {
      dateInput.value = "";
      showAlert(
        "Now you can set a date for your todo and edit it!!",
        "warning",
      );
    } else {
      dateInput.value = item.date;
      showAlert(
        "Now you can edit your todo title and your todo date!!",
        "warning",
      );
    }
    if (addButton.classList.contains("add-button")) {
      addButton.classList.remove("add-button");
      addButton.classList.add("add-button1");
      editAgianBtn.classList.remove("EditAgain-button1");
      editAgianBtn.classList.add("EditAgain-button");
    }
    editAgianBtn.dataset.id = id;
  });
};

const editTodo = (event) => {
  const id = event.target.dataset.id;
  const todo = allTodos.find((item) => item.id == id);
  console.log(todo);
  todo.Task = taskInput.value;
  dateInput.value ? (todo.date = dateInput.value) : (todo.date = "No Date");
  taskInput.value = "";
  dateInput.value = "";
  addToLocalStorage();
  showTodos();
  showAlert("todo successfully edited", "success");
  console.log(id);
  if (editAgianBtn.classList.contains("EditAgain-button")) {
    addButton.classList.add("add-button");
    addButton.classList.remove("add-button1");
    editAgianBtn.classList.add("EditAgain-button1");
    editAgianBtn.classList.remove("EditAgain-button");
  }
};
editAgianBtn.addEventListener("click", editTodo);

const filterByPending = () => {
  const getFromLocal = JSON.parse(localStorage.getItem("todos"));
  const filteredByPendingTodos = getFromLocal.filter((item) => !item.completed);
  todosBody.innerHTML = "";
  if (!filteredByPendingTodos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!!</td></tr>";
    return;
  }
  filteredByPendingTodos.forEach((item) => {
    todosBody.innerHTML += `
    <tr>
        <td>${item.Task}</td>
    <td>${item.date}</td>
    <td>${item.completed ? "Completed" : "Pending"}</td>
    <td>
    <button onclick= 'editHandler(${item.id})'>Edit</button>
    <button onclick= 'changeDostatus(${item.id})' class='DoBtn'>${item.completed ? "UnDo" : "Do"}</button>   
    <button onclick='deletehandler(${item.id})'>Delete</button>       
    </td>
    </tr>
    `;
  });

  // addToLocalStorage()
  console.log(filteredByPendingTodos);
};
const filterByCompleted = () => {
  const f = JSON.parse(localStorage.getItem("todos"));
  const f2 = f.filter((item) => item.completed);
  console.log(f);
  console.log(f2);
  todosBody.innerHTML = "";
  if (!f2.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!!</td></tr>";
    return;
  }
  // console.log({filteredByCompletedTodos} , "salam")
  f2.forEach((item) => {
    todosBody.innerHTML += `
    <tr>
        <td>${item.Task}</td>
    <td>${item.date}</td>
    <td>${item.completed ? "Completed" : "Pending"}</td>
    <td>
    <button onclick= 'editHandler(${item.id})'>Edit</button>
    <button onclick= 'changeDostatus(${item.id})' class='DoBtn'>${item.completed ? "UnDo" : "Do"}</button>   
    <button onclick='deletehandler(${item.id})'>Delete</button>       
    </td>
    </tr>
    `;
  });
};
const filterByAll = () => {
  const filteredByAllTodos = JSON.parse(localStorage.getItem("todos")) || [];

  todosBody.innerHTML = "";
  if (!filteredByAllTodos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!!</td></tr>";
    return;
  }
  filteredByAllTodos.forEach((item) => {
    todosBody.innerHTML += `
    <tr>
        <td>${item.Task}</td>
    <td>${item.date}</td>
    <td>${item.completed ? "Completed" : "Pending"}</td>
    <td>
    <button onclick= 'editHandler(${item.id})'>Edit</button>
    <button onclick= 'changeDostatus(${item.id})' class='DoBtn'>${item.completed ? "UnDo" : "Do"}</button>   
    <button onclick='deletehandler(${item.id})'>Delete</button>       
    </td>
    </tr>
    `;
  });
  // console.log(filteredByAllTodos);
};

const deletehandler = (id) => {
  // console.log(id);
  const newTodos = allTodos.filter((item) => item.id !== id);
  allTodos = newTodos;
  addToLocalStorage();
  showTodos();
  showAlert("Todo successfully deleted", "success");
};

window.addEventListener("DOMContentLoaded", showTodos);
addButton.addEventListener("click", addHandler);
pendingBtn.addEventListener("click", filterByPending);
deleteAllBtn.addEventListener("click", deleteAllHandler);
completedBtn.addEventListener("click", filterByCompleted);
allBtn.addEventListener("click", filterByAll);
