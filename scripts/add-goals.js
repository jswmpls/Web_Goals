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

// Работа с Goal Card
const nameGoal = document.querySelector(".name-goal");
const descGoal = document.querySelector(".descr-goal");
const categoryGoal = document.querySelector("#category");
const priorityGoal = document.querySelector("#priority");
const deadlineGoal = document.querySelector("#deadline");
const btnAddGoal = document.querySelector(".add-goal");

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

initDef();
renderGoals();
