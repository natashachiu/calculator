let storeArr = [];
let displayValue = "";

function operate(firstNum, secondNum, operator) {
    if (operator == "+") return (firstNum + secondNum);
    if (operator == "-") return (firstNum - secondNum);
    if (operator == "×") return (firstNum * secondNum);
    if (operator == "÷") return (firstNum / secondNum);
}

const values = document.querySelectorAll('.value');
values.forEach(value => {
    value.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
    })
});

function appendNumber(num) {
    if (displayValue !== "" && display.textContent.length >= 9)
        return; // disallows typing in more than 9 digits at once
    displayValue += num.toString();
    display.textContent = displayValue;
}

const operators = document.querySelectorAll('.op');
operators.forEach(operator => {
    operator.addEventListener('click',(e) => {
        storeValues(e.target.textContent);
    })
});

window.addEventListener('keydown', handleKeyboardInput);
const display = document.querySelector(".display");
const ac = document.querySelector("#ac");
const pn = document.querySelector("#pn");
const dot = document.querySelector("#dot");
const del = document.querySelector("#del");

ac.addEventListener('click', clearDisplay);
pn.addEventListener('click', appendPn);
del.addEventListener('click', deleteNumber);
dot.addEventListener('click', appendDot);


function storeValues(strOperator) {
    if ((storeArr.length === 0)){ 
        if (strOperator === "=") return; // "12 ="
       
        if (display.textContent !== "") { // "12 + 5 = * 2" or "12 + 5 = 2 +"
            displayValue = display.textContent;
        } else {
            return;
        }
        storeArr.push(displayValue); 
        storeArr.push(strOperator);
    
    } else {
        if (displayValue === "") { // "12 + +"
            displayValue = display.textContent;
        }
        let firstNum = parseFloat(storeArr.shift());
        let operator = storeArr.shift();
        let secondNum = parseFloat(displayValue);

        if (checkDivZero(operator, secondNum)) return;

        let result = operate(firstNum, secondNum, operator);
        result = Math.round(result * 1000) / 1000;

        // doesn't show numbers that run off the screen
        if (isResultHuge(result)) return; 
        display.textContent = result;
        
        if (strOperator !== "=") {
            storeArr.push(result);
            storeArr.push(strOperator);
        } 
    }
    // console.log(storeArr); 
    displayValue = "";
}

function checkDivZero(operator, secondNum) {
    if (operator === "÷" && secondNum === 0) {
        display.textContent = "undefined";
        displayValue = "";
        storeArr.length = 0;
        return true;
    }
    return false;
}

function isResultHuge(result) {
    if (result.toString().length > 10) {
        display.textContent = "too big :O";
        displayValue = "";
        storeArr.length = 0;
        return true;
    }
    return false;
}

function appendDot() {
    if (display.textContent.includes(".")) return;

    displayValue += ".";
    display.textContent = displayValue;
}

function appendPn() {
    if (displayValue === "")
        displayValue = "-";
    else if ( displayValue === "-")
        return;
    else
        displayValue *= -1;
   
    display.textContent = displayValue;
}

function deleteNumber() {
    displayValue = displayValue.slice(0, -1);
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = "";
    display.textContent = displayValue;
    storeArr.length = 0;
}

function handleKeyboardInput(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    if (e.key >=0 || e.key <= 9) appendNumber(e.key);
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") storeValues(convertOperator(e.key));
    if (e.key === "Delete" || e.key === "Backspace") deleteNumber;
    if (e.key === "Return" || e.key === "Enter") storeValues("=");
    if (e.key === ".") appendDot;

    e.preventDefault();
}

function convertOperator(operator) {
    if (operator === "/") return "÷";
    if (operator === "*") return "×";
}
