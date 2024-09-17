let a1 = [
  [0, 0, 0, 6, 0, 1],
  [0, 0, 0, 4, 5, 0],
  [6, 0, 0, 0, 2, 5],
  [3, 5, 0, 0, 0, 6],
  [0, 3, 6, 0, 0, 0],
  [2, 0, 1, 0, 0, 0],
];
let a2 = [
  [0, 0, 0, 6, 0, 1],
  [0, 0, 0, 4, 5, 0],
  [5, 0, 0, 0, 2, 4],
  [2, 5, 0, 0, 0, 6],
  [0, 3, 6, 0, 0, 0],
  [3, 0, 1, 0, 0, 0],
];

let play = document
  .querySelector(".play-button")
  .addEventListener("click", () => {
    document.querySelector(".main-page").style.display = "none";
    document.querySelector(".boxes").style.display = "block";
    playGame();
  });
function playGame() {
  displayBoxes();

  fixedBoxesColor();
  alert(
    "Press 'C' to check empty boxes. Once you enter all boxes correctly the game will automatically move towards next level"
  );
  inputChecker();
}
function displayBoxes() {
  let boxHTML = "";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (a1[i][j] !== 0) {
        boxHTML += ` <input type="number" required class="num${i}${j} fixed" data-column="${j}" data-row="${i}"value=${a1[i][j]} readonly pattern="[1-9]">`;
      } else {
        boxHTML += ` <input type="number" required class="num${i}${j} " data-column="${j}" data-row="${i}" pattern="[1-9]">`;
      }
    }
  }
  document.querySelector(".input-boxes").innerHTML = boxHTML;
}

function inputChecker() {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      const { row } = input.dataset;
      const { column } = input.dataset;

      let inputbox = document.querySelector(`.num${row}${column}`);
      let value = inputbox.value;

      let arr = [];
      for (let i = 0; i < 6; i++) {
        arr[i] = a1[i][column];
      }

      if (value === "") inputbox.style.backgroundColor = "white";
      else {
        if (value < 1 || value > 6) inputbox.value = "";
        else inputbox.style.backgroundColor = "white";
        if (a1[row].includes(Number(value))) {
          inputbox.style.backgroundColor = "red";
        }
        if (arr.includes(Number(value))) {
          inputbox.style.backgroundColor = "red";
        }
      }

      a1[row][column] = Number(value);
      console.log("checking");
      if (winchecker()) {
        alert("Win!!!!!");
        a1 = a2;
        playGame();
      }
    });
  });
}

function fixedBoxesColor() {
  document.querySelectorAll(".fixed").forEach((box) => {
    box.style.backgroundColor = "lightgreen";
  });
}

let cPressed = false;
function cButton(event) {
  if (!cPressed) {
    if (event.key === "C" || event.key === "c") {
      cPressed = true;

      document.querySelectorAll("input").forEach((input) => {
        const { row } = input.dataset;
        const { column } = input.dataset;

        let inputbox = document.querySelector(`.num${row}${column}`);
        let value = inputbox.value;

        if (value === "") inputbox.style.backgroundColor = "red";
      });
    }
  } else {
    cPressed = false;
    document.querySelectorAll("input").forEach((input) => {
      const { row } = input.dataset;
      const { column } = input.dataset;

      let inputbox = document.querySelector(`.num${row}${column}`);
      let value = inputbox.value;

      if (value === "") inputbox.style.backgroundColor = "white";
    });
  }
}

function winchecker() {
  for (let i = 0; i < 6; i++) {
    if (a1[i].includes(0)) {
      return 0;
    }
  }
  document.querySelectorAll("input").forEach((input) => {
    if (input.style.backgroundColor === "red") {
      return 0;
    }
  });

  return 1;
}
