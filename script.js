let storeArr = [];
let displayValue = "";

function operate(firstNum, secondNum, operator) {
    if (operator == "+") return (firstNum + secondNum);
    if (operator == "-") return (firstNum - secondNum);
    if (operator == "*") return (firstNum * secondNum);
    if (operator == "/") return (firstNum / secondNum);

}

const values = document.querySelectorAll('.value');
values.forEach(value => {
    value.addEventListener('mousedown', (e) => {
        let num = e.target.textContent;
        displayValue += num.toString();
        display.textContent = displayValue;
    })
});

const display = document.querySelector(".display");
const ac = document.querySelector("#ac");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#div");
const equal = document.querySelector("#equal");
// const dot = document.querySelector("#dot");

ac.addEventListener('mousedown', () => clearDisplay());
plus.addEventListener('mousedown', () => storeValues("+"));
minus.addEventListener('mousedown', () => storeValues("-"));
multiply.addEventListener('mousedown', () => storeValues("*"));
divide.addEventListener('mousedown', () => storeValues("/"));
equal.addEventListener('mousedown', () => storeValues("="));
// dot.addEventListener('mousedown', () => {
//     displayValue += ".";
//     display.textContent = displayValue;
// })


function storeValues(strOperator) {
    if ((storeArr.length === 0)){ 
        if (strOperator === "=") return; // "12 ="
       
        if (display.textContent !== "") { // "12 + 5 = * 2" or "12 + 5 = 2 +"
            displayValue = display.textContent;
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
        result = Math.round(result * 1000000) / 1000000;
        display.textContent = result;
        
        if (strOperator !== "=") {
            storeArr.push(result);
            storeArr.push(strOperator);
        } 
    }
    console.log(storeArr);

    displayValue = "";
}

function checkDivZero(operator, secondNum) {
    if (operator === "/" && secondNum === 0) {
        display.textContent = "undefined :(";
        displayValue = "";
        storeArr.length = 0;
        return true;
    }
    return false;
}

// function checkDecimals(str) {
//     let occ = 0;
//     for (let i = 0; i < str.length; i++) {
//         if (i === ".")
//             occ ++;
//     }
//     if (occ > 1)
//         dot.removeEventListener
        
// }


function clearDisplay() {
    displayValue = "";
    display.textContent = displayValue;
    storeArr.length = 0;
}
