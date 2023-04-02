
let storeArr = [];

let displayValue = "";

function add(a, b) {
    return (a + b);
  };
function subtract(a, b) {
      return (a - b);
  };
function multiply(a, b) {
    return (a * b);
}
function divide(a, b) {
    return (a / b);
}

// takes an operator and 2 numbers, calls one of the above functions on the numbers.
function operate(firstNum, secondNum, operator) {
    if (operator == "+") return add(firstNum, secondNum);
    if (operator == "-") return subtract(firstNum, secondNum);
    if (operator == "*") return multiply(firstNum, secondNum);
    if (operator == "/") return divide(firstNum, secondNum);

}

const btn_0 = document.querySelector("#zero");
const btn_1 = document.querySelector("#one");
const btn_2 = document.querySelector("#two");
const btn_3 = document.querySelector("#three");
const btn_4 = document.querySelector("#four");
const btn_5 = document.querySelector("#five");
const btn_6 = document.querySelector("#six");
const btn_7 = document.querySelector("#seven");
const btn_8 = document.querySelector("#eight");
const btn_9 = document.querySelector("#nine");
const plus_btn = document.querySelector("#plus");
const minus_btn = document.querySelector("#minus");
const multiply_btn = document.querySelector("#multiply");
const divide_btn = document.querySelector("#div");
const equal_btn = document.querySelector("#equal");
const display = document.querySelector(".display");
const ac = document.querySelector("#ac");


btn_0.addEventListener('mousedown', () => displayValue += "0");
btn_1.addEventListener('mousedown', () => displayValue += "1");
btn_2.addEventListener('mousedown', () => displayValue += "2");
btn_3.addEventListener('mousedown', () => displayValue += "3");
btn_4.addEventListener('mousedown', () => displayValue += "4");
btn_5.addEventListener('mousedown', () => displayValue += "5");
btn_6.addEventListener('mousedown', () => displayValue += "6");
btn_7.addEventListener('mousedown', () => displayValue += "7");
btn_8.addEventListener('mousedown', () => displayValue += "8");
btn_9.addEventListener('mousedown', () => displayValue += "9");
plus_btn.addEventListener('mousedown', () => storeValues("+"));
minus_btn.addEventListener('mousedown', () => storeValues("-"));
multiply_btn.addEventListener('mousedown', () => storeValues("*"));
divide_btn.addEventListener('mousedown', () => storeValues("/"));
equal_btn.addEventListener('mousedown', () => storeValues("="));
ac.addEventListener('mousedown', () => clearDisplay());


function storeValues(strOperator) {
    

    if (storeArr.length === 0) {
        storeArr.push(displayValue);
        storeArr.push(strOperator);

    } else if (storeArr.length === 1) {
        storeArr.push(strOperator);
    } else {
        let firstNum = parseFloat(storeArr.shift());
        let operator = storeArr.shift();
        let secondNum = parseFloat(displayValue);

        let result = operate(firstNum, secondNum, operator);
        result = result.toFixed(6);
        display.textContent = result;
        storeArr.push(result);
        
        if (strOperator !== "=") {
            storeArr.push(strOperator);
        } 

    }
    console.log(storeArr);

    displayValue = "";
}


const values = document.querySelectorAll('.value');
values.forEach(value => {
    value.addEventListener('mousedown', () => display.textContent = displayValue)
});


function clearDisplay() {
    displayValue = "";
    display.textContent = displayValue;
    storeArr.length = 0;
}

/* bugs
    - display result with no decimals when not necessary, only 6 when needed 
    - pressing "=" before entering all of the numbers or an operator
    
*/