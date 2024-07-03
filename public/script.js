let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const pauseTimer = () => {
  paused = true;
  clearInterval(set);
  startBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("show");
};

const resetTime = () => {
  pauseTimer();
  switch (active) {
    case "long":
      minCount = 14;
      break;
    case "short":
      minCount = 4;
      break;
    default:
      minCount = 24;
      break;
  }
  count = 59;
  time.textContent = `${minCount + 1}:00`;
};

reset.addEventListener("click", resetTime);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  active = "focus";
  resetTime();
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  resetTime();
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  resetTime();
});

pause.addEventListener("click", pauseTimer);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 59;
        } else {
          clearInterval(set);
        }
      }
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    }, 1000);
  }
});


const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();

    const nav = document.getElementById('nav');
    nav.classList.toggle('active');

    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', 'true');

    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu"')
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);


const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");


// LISTA DE TAREFAS


