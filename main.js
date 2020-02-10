document.addEventListener('DOMContentLoaded', function() {
  let todoList = document.getElementById('todoList');
  let todoForm = document.getElementById('todoForm');
  let toggleForm = document.getElementById('toggleForm');

  // retrieve from localStorage

  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  for (let i = 0; i < savedTodos.length; i++) {
    let removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    let newTodo = document.createElement('li');
    newTodo.innerText = savedTodos[i].task;
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (newTodo.isCompleted) {
      newTodo.style.textDecoration = 'line-through';
    }
    todoList.appendChild(newTodo);
    newTodo.appendChild(removeButton);
  }

  todoForm.addEventListener('keypress', function(e) {
    if (e.which === 13) {
      let removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      let todoText = todoForm.value;
      todoForm.value = '';
      let newTodo = document.createElement('li');
      newTodo.innerHTML = `
        ${todoText}`;
      newTodo.isCompleted = false;
      todoList.appendChild(newTodo);
      newTodo.appendChild(removeButton);

      // save to localStorage
      savedTodos.push({
        task: newTodo.innerText,
        isCompleted: false,
        key: newTodo.innerText
      });
      localStorage.setItem('todos', JSON.stringify(savedTodos));
    }
  });

  todoList.addEventListener('click', function(e) {
    const targetTagToLowerCase = e.target.tagName.toLowerCase();
    let content = e.target.parentNode.textContent;
    if (targetTagToLowerCase === 'li') {
      e.target.classList.toggle('complete');
    } else if (targetTagToLowerCase === 'button') {
      for (let i = 0; i < savedTodos.length; i++) {
        if (content === savedTodos[i].task) {
          savedTodos.splice(i, 1);
          localStorage.setItem('todos', JSON.stringify(savedTodos));
          console.log(savedTodos);
        }
      }

      e.target.parentNode.remove();
    }
  });
});

toggleForm.addEventListener('click', function(e) {
  window.localStorage.removeItem('todos');
  location.reload();
});
