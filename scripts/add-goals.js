// Начальные значения для тестирования
function initDef() {
  const fromLocal = loadFormLocalStorage();
  if (fromLocal && fromLocal.length > 0) {
    goals = fromLocal;
    nextId = Math.max(...goals.map((goal) => goal.id)) + 1;
  } else {
    goals = [
      {
        id: 0,
        name: "10.000 шагов в день",
        description: "Я не придумала",
        category: "health",
        priority: "high",
        deadline: "30.12.2025",
      },
      {
        id: 1,
        name: "Получить повышение до препода",
        description: "Я не придумала",
        category: "career",
        priority: "medium",
        deadline: "30.12.2025",
      },
      {
        id: 2,
        name: "Найти работу во Frontend",
        description: "Я не придумала",
        category: "career",
        priority: "medium",
        deadline: "30.12.2025",
      },
    ];
    nextId = 3;
    saveLocalStorage();
  }
}

// Сохранение
function saveLocalStorage() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

// Загрузка
function loadFormLocalStorage() {
  const localGoals = localStorage.getItem("goals");
  if (localGoals) {
    return JSON.parse(localGoals);
  } else {
    return null;
  }
}

let currentGoalId = null;

// Работа с Goal Card
const nameGoal = document.querySelector(".name-goal");
const descGoal = document.querySelector(".descr-goal");
const categoryGoal = document.querySelector("#category");
const priorityGoal = document.querySelector("#priority");
const deadlineGoal = document.querySelector("#deadline");
const btnAddGoal = document
  .querySelector(".add-goal")
  .addEventListener("click", AddGoal);

// Модальное окно
const modalWindow = document.querySelector(".modal");
const closeBtn = document
  .querySelector(".close-btn")
  .addEventListener("click", openModalWindow);
const modalTitle = document.querySelector(".modal-title");
const modalDescr = document.querySelector(".modal-descr");
const modalCategory = document.querySelector(".p-modal__category");
const modalPriority = document.querySelector(".p-modal__priority");
const modalDeadline = document.querySelector(".p-modal__deadline");

// Работа со списками по категориям
const listGoalsHealth = document.querySelector(".block-health");
const listGoalsCareer = document.querySelector(".block-career");
const listGoalsEducation = document.querySelector(".block-education");
const listGoalsPersonal = document.querySelector(".block-personal");

// Добавление новой цели
function AddGoal() {
  console.log(nameGoal.value);

  if (
    nameGoal.value == "" ||
    descGoal.value == "" ||
    deadlineGoal.value == ""
  ) {
    alert("Ошибка! Задайте имя, описание и дедлайн для своей цели");
  } else {
    //TODO: Добавление цели
    const newGoal = {
      id: nextId,
      name: nameGoal.value,
      description: descGoal.value,
      category: categoryGoal.value,
      priority: priorityGoal.value,
      deadline: deadlineGoal.value,
    };
    goals.push(newGoal);
    nextId++;
    renderGoals();

    nameGoal.value = "";
    descGoal.value = "";
    categoryGoal.value = "health";
    priorityGoal.value = "high";
    deadlineGoal.value = "";
  }

  saveLocalStorage();
}

// Создание новой цели
function createGoal(goal) {
  const li = document.createElement("li");
  li.classList.add("block-item");
  li.textContent = goal.name;

  li.addEventListener("click", function () {
    currentGoalId = goal.id;
    openModalWindow();
  });

  return li;
}

// Рендер списка всех целей
function renderGoals() {
  listGoalsHealth.innerHTML = "";
  listGoalsCareer.innerHTML = "";
  listGoalsEducation.innerHTML = "";
  listGoalsPersonal.innerHTML = "";

  for (goal of goals) {
    const goalElement = createGoal(goal);

    if (goal.category == "health") {
      listGoalsHealth.appendChild(goalElement);
    } else if (goal.category == "career") {
      listGoalsCareer.appendChild(goalElement);
    } else if (goal.category == "education") {
      listGoalsEducation.appendChild(goalElement);
    } else {
      listGoalsPersonal.appendChild(goalElement);
    }
  }
}

function deleteGoal(goalId) {
  const indexGoal = goals.findIndex((goal) => goal.id == goalId);
  if (indexGoal != -1) {
    goals.splice(indexGoal, 1);
    saveLocalStorage();
    renderGoals();
  }
}

// Работа с модальным окном
function openModalWindow() {
  const indexGoal = goals.findIndex((goal) => currentGoalId == goal.id);

  modalTitle.textContent = goals[indexGoal].name;
  modalDescr.textContent = goals[indexGoal].description;
  switch (goals[indexGoal].category) {
    case "health":
      modalCategory.textContent = "🏃‍♂️ Здоровье";
      break;
    case "career":
      modalCategory.textContent = "💼 Карьера";
      break;
    case "education":
      modalCategory.textContent = "🎓 Образование";
      break;
    case "personal":
      modalCategory.textContent = "❤️ Личное";
      break;
  }
  switch (goals[indexGoal].priority) {
    case "high":
      modalPriority.textContent = "⬆️ Высокий";
      break;
    case "medium":
      modalPriority.textContent = "➡️ Средний";
      break;
    case "low":
      modalPriority.textContent = "↘️ Низкий";
      break;
  }
  modalDeadline.textContent = goals[indexGoal].deadline;

  const delGoal = document
    .querySelector(".delete-goal")
    .addEventListener("click", function () {
      deleteGoal(currentGoalId);
      modalWindow.classList.add("hide");
    });
  const completeGoal = document
    .querySelector(".complete-goal")
    .addEventListener("click", function () {
      deleteGoal(currentGoalId);
      modalWindow.classList.add("hide");
    });

  modalWindow.classList.toggle("hide");
}

initDef();
renderGoals();
