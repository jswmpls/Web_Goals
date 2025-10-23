// Начальные значения для тестирования
function initDef() {
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
      priority: "high",
      deadline: "30.12.2025",
    },
    {
      id: 2,
      name: "Найти работу во Frontend",
      description: "Я не придумала",
      category: "career",
      priority: "high",
      deadline: "30.12.2025",
    },
  ];
}
let nextId = 3;
let currentGoalId = null;

// Работа с Goal Card
const nameGoal = document.querySelector(".name-goal");
const descGoal = document.querySelector(".descr-goal");
const categoryGoal = document.querySelector("#category");
const priorityGoal = document.querySelector("#priority");
const deadlineGoal = document.querySelector("#deadline");
const btnAddGoal = document.querySelector(".add-goal");

// Модальное окно
const modalWindow = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.querySelector(".modal-title");
const modalDescr = document.querySelector(".modal-descr");
const modalCategory = document.querySelector(".p-modal__category");
const modalPriority = document.querySelector(".p-modal__priority");
const modalDeadline = document.querySelector(".p-modal__deadline");

btnAddGoal.addEventListener("click", AddGoal);

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
}

// Работа со списками по категориям
const listGoalsHealth = document.querySelector(".block-health");
const listGoalsCareer = document.querySelector(".block-career");
const listGoalsEducation = document.querySelector(".block-education");
const listGoalsPersonal = document.querySelector(".block-personal");

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
    renderGoals();
  }
}

// Работа с модальным окном
closeBtn.addEventListener("click", openModalWindow);
function openModalWindow() {
  const indexGoal = goals.findIndex((goal) => currentGoalId == goal.id);

  modalTitle.textContent = goals[indexGoal].name;
  modalDescr.textContent = goals[indexGoal].description;
  modalCategory.textContent = goals[indexGoal].category;
  modalPriority.textContent = goals[indexGoal].priority;
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
