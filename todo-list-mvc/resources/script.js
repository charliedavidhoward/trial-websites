todos = [];


function displayTodos() {
  var todosList = document.querySelector('ul');
  todosList.innerHTML = "";
  for(var i = 0; i < todos.length; i++) {
    var todoLi = document.createElement('li');
    var todo = todos[i];
//    todoLi.textContent = todo.todoText;
    todoLi.innerHTML = todo.todoText + "<button class='delete-button' onclick='deleteTodo(id)' id="+ i +">Delete</button>"
    console.log(todoLi);
    todosList.appendChild(todoLi);
  }
};

function deleteTodo(id) {
  todos.splice(id, 1);
  displayTodos();
};

function addTodo() {
  var todoText = document.getElementById("addTodo");
  todos.push({
    todoText: todoText.value,
    completed: false
  });
  todoText.value = ""
  displayTodos();
};

// 'listen' for enter key to call addTodo function
$("#addTodo").on('keyup', function(e) {
  if (e.keyCode == 13) {
    addTodo();
  };
});
