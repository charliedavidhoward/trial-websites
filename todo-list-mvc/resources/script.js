var todos = [];
var displayCompletedBool = false;
var displayUncompletedBool = false;
var allComplete = false;

function displayCompleted() {
  displayCompletedBool = true;
  displayUncompletedBool = false;
  view.displayTodos();
};

function displayUncompleted() {
  displayUncompletedBool = true;
  displayCompletedBool = false;
  view.displayTodos();
};

function displayAll() {
  displayCompletedBool = false;
  displayUncompletedBool = false;
  view.displayTodos();
};

function removeCompleted() {
  todos = todos.filter(todo => todo.completed == false);
  var completedArrow = document.getElementById("toggle-completed");
  completedArrow.innerHTML = "<input type='image' src='resources/icons/down-arrow.png' class='complete-all' onclick='completeAll()'>"
  view.displayTodos();
};

function deleteTodo(id) {
  todos.splice(id, 1);
  view.displayTodos();
};

function completeTodo(id) {
  todos[id].completed = true;
  var completed = 0;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed == true) {
      completed = completed + 1;
    }
  }
  if (completed == todos.length) {
    var completedArrow = document.getElementById("toggle-completed");
    console.log(completedArrow);
    completedArrow.innerHTML = "<input type='image' src='resources/icons/all-completed-down.png' class='complete-all' onclick='uncompleteAll()'>"
  }
  view.displayTodos();
};

function completeAll() {
  for (var i = 0; i < todos.length; i++) {
    completeTodo(i);
  }
};

function uncompleteTodo(id) {
  todos[id].completed = false;
  var uncompleted = 0;
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].completed == false) {
      uncompleted = uncompleted + 1;
    }
  }
  if (uncompleted == todos.length) {
    var completedArrow = document.getElementById("toggle-completed");
    completedArrow.innerHTML = "<input type='image' src='resources/icons/down-arrow.png' class='complete-all' onclick='completeAll()'>"
  }
  view.displayTodos();
};

function uncompleteAll() {
  for (var i = 0; i < todos.length; i++) {
    uncompleteTodo(i);
  }
};

function addTodo() {
  var todoText = document.getElementById("addTodo");
  if (todoText.value == "") { return; }
  todos.push({
    todoText: todoText.value,
    completed: false
  });
  todoText.value = ""
  view.displayTodos();
};

// 'listen' for enter key to call addTodo function
$("#addTodo").on('keyup', function(e) {
  if (e.keyCode == 13) {
    addTodo();
  };
});

var view = {
  displayTodos: function() {
  var todosList = document.querySelector('ul');
  todosList.innerHTML = "";
  todosCopy = [];
  if (displayCompletedBool == true) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].completed == true) {
        todosCopy.push(todos[i])
      }
    }
  } else if (displayUncompletedBool == true) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].completed == false) {
        todosCopy.push(todos[i])
      }
    }
  } else {
    todosCopy = todos;
  }
  for(var i = 0; i < todosCopy.length; i++) {
    var todoLi = document.createElement('li');
    var todo = todosCopy[i];
    if (todosCopy[i].completed == true) {
      todoLi.innerHTML = "<input type='image' src='resources/icons/completed.png' class='uncomplete-button' onclick='uncompleteTodo(id)' id=" + i +"><span id='completedText' class='todoText'>" + todo.todoText + "</span><input type='image' src='resources/icons/trash.png' class='delete-button' onclick='deleteTodo(id)' id=" + i +">";
    } else {
      todoLi.innerHTML = "<input type='image' src='resources/icons/not-completed.png' class='complete-button' onclick='completeTodo(id)' id="+ i +"></input><span id='uncompletedText' class='todoText'>" + todo.todoText + "</span><input type='image' src='resources/icons/trash.png' class='delete-button' onclick='deleteTodo(id)' id=" + i +">";
    }
    todosList.appendChild(todoLi);
  }
  if (todos.length > 0) {
    var todoFooter = document.createElement('li');
    var amount_left = 0;
    var completed_todos = 0
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].completed == false) {
        amount_left = amount_left + 1;
      } else if (todos[i].completed == true) {
        completed_todos = completed_todos + 1;
      }
    }
    if (amount_left == 1 && completed_todos > 0) {
      todoFooter.innerHTML = "<button class='remove-completed' onclick='removeCompleted()'>Remove Completed</button><button class='display-completed' onclick='displayCompleted()'>Display Completed</button><button class='display-uncompleted' onclick='displayUncompleted()'>Display Uncompleted</button><button class='display-all' onclick='displayAll()'>Display All</button><p>" + amount_left + " item to complete</p>";
    } else if (amount_left == 1 && completed_todos == 0) {
      todoFooter.innerHTML = "<button class='display-completed' onclick='displayCompleted()'>Display Completed</button><button class='display-uncompleted' onclick='displayUncompleted()'>Display Uncompleted</button><button class='display-all' onclick='displayAll()'>Display All</button><p>" + amount_left + " items to complete</p>";
    } else if (amount_left != 1 && completed_todos > 0) {
      todoFooter.innerHTML = "<button class='remove-completed' onclick='removeCompleted()'>Remove Completed</button><button class='display-completed' onclick='displayCompleted()'>Display Completed</button><button class='display-uncompleted' onclick='displayUncompleted()'>Display Uncompleted</button><button class='display-all' onclick='displayAll()'>Display All</button><p>" + amount_left + " items to complete</p>";
    } else if (amount_left !=1 && completed_todos == 0) {
      todoFooter.innerHTML = "<button class='display-completed' onclick='displayCompleted()'>Display Completed</button><button class='display-uncompleted' onclick='displayUncompleted()'>Display Uncompleted</button><button class='display-all' onclick='displayAll()'>Display All</button><p>" + amount_left + " items to complete</p>";
    }
    todosList.appendChild(todoFooter);
  }
}};
