const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const allClearBtn = document.getElementById("all-clear");
const deleteBtn = document.getElementById("delete");
const equalsBtn = document.querySelector(".equalBtn");
const previousDisplayNum = document.querySelector(".previous-num");
const currentDisplayNum = document.querySelector(".current-num");
const addDecimalBtn = document.querySelector(".addDecimalBtn");

let currentNum = "";
let previousNum = "";
let operator = "";

// Math functions

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function roundNumber(num) {
  return Math.round((num * 10000) / 10000);
}

// Display buttons

numberBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    handleNum(e.target.textContent);
  });
});

function handleNum(num) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentDisplayNum.textContent = currentNum;
  } else if (currentNum.length <= 11) {
    currentNum += num;
    currentDisplayNum.textContent = currentNum;
  }
}

operationBtn.forEach((op) => {
  op.addEventListener("click", (e) => {
    handleOp(e.target.textContent);
  });
});

function handleOp(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    checkOp(op);
  } else if (currentNum === "") {
    checkOp(op);
  } else {
    operate();
    operator = op;
    currentDisplayNum.textContent = "0";
    previousDisplayNum.textContent = previousNum;
  }
}

function checkOp(text) {
  operator = text;
  previousDisplayNum.textContent = previousNum + "" + operator;
  currentDisplayNum.textContent = "0";
  currentNum = "";
}

equalsBtn.addEventListener("click", () => {
  if (currentNum !== "" && previousNum !== "") {
    operate();
  }
  console.log("hi");
});

// Calculate

function operate(a, b) {
  a = Number(previousNum);
  b = Number(currentNum);

  if (operator === "+") {
    previousNum = add(a, b);
  } else if (operator === "-") {
    previousNum = substract(a, b);
  } else if (operator === "x") {
    previousNum = multiply(a, b);
  } else if (operator === "/") {
    if (currentNum <= "0") {
      previousNum = "MATH Error";
      displayResult();
      return;
    }
    previousNum = divide(a, b);
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResult();
}

function displayResult() {
  if (previousNum.length <= 11) {
    currentDisplayNum.textContent = previousNum;
  } else {
    currentDisplayNum.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNum.textContent = "";
  operator = "";
  currentNum = "";
}

// Manage buttons

allClearBtn.addEventListener("click", () => {
  allClear();
});

function allClear() {
  currentNum = "";
  previousNum = "";
  previousDisplayNum.textContent = "";
  operator = "";
  currentDisplayNum.textContent = "0";
}

deleteBtn.addEventListener("click", () => {
  deleteNum();
});

function deleteNum() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNum.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNum.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNum.textContent = previousNum;
  }
}

addDecimalBtn.addEventListener("click", () => {
  handleDecimal();
});

function handleDecimal() {
  if (!currentDisplayNum.textContent.includes(".")) {
    currentNum += ".";
    currentDisplayNum.textContent = currentNum;
  }
}
