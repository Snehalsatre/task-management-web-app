const API = "http://localhost:3000/tasks";

function loadTasks() {
  fetch(API)
    .then(res => res.json())
    .then(tasks => {
      taskList.innerHTML = "";
      tasks.forEach(t => {
        taskList.innerHTML += `
          <li class="task">
            <div>
              <h4>${t.title}</h4>
              <p>${t.description}</p>
           <span class="status">${t.status ?? "Pending"}</span>

            </div>
            <div>
              <button onclick="editTask(${t.id})">Edit</button>
              <button class="del" onclick="deleteTask(${t.id})">Delete</button>
            </div>
          </li>
        `;
      });
    });
}

function addTask() {
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      description: desc.value,
      status: status.value
    })
  }).then(() => {
    clearForm();
    loadTasks();
  });
}

function editTask(id) {
  fetch(API)
    .then(res => res.json())
    .then(tasks => {
      const task = tasks.find(t => t.id === id);

      title.value = task.title;
      desc.value = task.description;
      status.value = task.status;

      const btn = document.getElementById("addBtn");
      btn.innerText = "Update Task";
      btn.onclick = function () {
        fetch(`${API}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.value,
            description: desc.value,
            status: status.value
          })
        }).then(() => {
          btn.innerText = "Add Task";
          btn.onclick = addTask;
          clearForm();
          loadTasks();
        });
      };
    });
}

function deleteTask(id) {
  fetch(`${API}/${id}`, { method: "DELETE" })
    .then(loadTasks);
}

function clearForm() {
  title.value = "";
  desc.value = "";
  status.value = "Pending";
}

loadTasks();
