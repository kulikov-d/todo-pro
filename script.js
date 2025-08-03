const taskInput = document.querySelector('.taskAdd');
const addBtn = document.querySelector('.btn_Add');
const taskList = document.getElementById('taskList');

const btnAll = document.getElementById('taskAll');
const btnActive = document.getElementById('taskActive');
const btnCompleted = document.getElementById('taskCompleted');

let tasks = []; 

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks(currentFilter);
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    // Кнопка удаления задачи
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(currentFilter);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

let currentFilter = 'all';

// Добавление задачи
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Введите задачу');
    return;
  }

  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  taskInput.value = '';
  renderTasks(currentFilter);
}

// Обработчики фильтров
function setFilter(filter) {
  currentFilter = filter;

  btnAll.classList.toggle('active', filter === 'all');
  btnActive.classList.toggle('active', filter === 'active');
  btnCompleted.classList.toggle('active', filter === 'completed');

  renderTasks(filter);
}

// События
addBtn.addEventListener('click', addTask);
btnAll.addEventListener('click', () => setFilter('all'));
btnActive.addEventListener('click', () => setFilter('active'));
btnCompleted.addEventListener('click', () => setFilter('completed'));

// Показываем все задачи изначально
renderTasks();

