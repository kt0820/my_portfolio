document.addEventListener("DOMContentLoaded", () => { 
    const clearButton = document.getElementById("clearDisplay"); // Select the buttons by ID's
    const signButton = document.getElementById("toggleSign");
    const percentButton = document.getElementById("percent");
    const divideButton = document.getElementById("divide");
    const multiplyButton = document.getElementById("multiply");
    const additionButton = document.getElementById("add");
    const subtractButton = document.getElementById("subtract");
    const squarerootButton = document.getElementById("squareRoot");
    const decimalButton = document.getElementById("decimal");
    const equalsButton = document.getElementById("equals");
    const numberButtons = document.querySelectorAll(".number"); // Select all buttons with class 'number'
    const display = document.getElementById("display"); 

    // Adding event listeners
    clearButton.addEventListener("click", clearDisplay); 
    signButton.addEventListener("click", toggleSign); 
    percentButton.addEventListener("click", percent); 
    divideButton.addEventListener("click", () => setOperation('/'));
    multiplyButton.addEventListener("click", () => setOperation('*'));
    additionButton.addEventListener("click", () => setOperation('+'));
    subtractButton.addEventListener("click", () => setOperation('-'));
    squarerootButton.addEventListener("click", calculateSquareRoot);
    decimalButton.addEventListener("click", appendDecimal);
    equalsButton.addEventListener("click", evaluate);

    numberButtons.forEach(button => { // Add event listener to each number button
        button.addEventListener("click", () => appendNumber(button.textContent));
    });

});

const MAX_DISPLAY_LENGTH = 10; // MAXIMUM ALLOWED LENGTH ON DISPLAY
const display = document.getElementById("display"); // display screen

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;


function appendNumber(number) { // function to append number to display
    if (shouldResetDisplay) { // user just clicked an operator
        display.textContent = number; // replace the display with the number
        shouldResetDisplay = false; // reset the flag back to false 
    } else {
        if (display.textContent === '0' || display.textContent === 'Error') { // if display is 0 or error
            display.textContent = number; // replace the display with the number
        } else if (display.textContent.length < MAX_DISPLAY_LENGTH) { // if display length is less than max length
            display.textContent += number; // append the number to the display
        }
    }
}

function setOperation(operator) { // function to set the operation
    if (currentOperator !== null) {
        evaluate(); // If an operation is already set, calculate first
    }

    firstNumber = display.textContent; // Store the first number
    currentOperator = operator; // Store the operator
    shouldResetDisplay = true; // Set the flag to true
}

function evaluate() { // function to evaluate the expression
    if (currentOperator === null || shouldResetDisplay) return; // If no operator is set or display needs to be reset, do nothing

    secondNumber = display.textContent; // Store the second number

    const num1 = parseFloat(firstNumber); // convert the 2 numbers from str to float
    const num2 = parseFloat(secondNumber);
    let result = 0; // initialize result

    switch (currentOperator) { // Perform the operation based on the operator
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) { // if denominator is 0
                result = "Error"; // set result to error
            } else {
                result = num1 / num2; // perform division
            }
            break;
    }
    let resultString = result.toString(); // convert result to string

    if (resultString.length > MAX_DISPLAY_LENGTH) { // if result exceeds max length
        resultString = resultString.slice(0, MAX_DISPLAY_LENGTH); // truncate to max length
    }
    display.textContent = resultString; // update display with result

    firstNumber = result; // store result for further operations
    secondNumber = ""; // reset second number
    currentOperator = null; // reset operator
    shouldResetDisplay = true; // reset flag to true
}

function toggleSign(event) { // function to toggle the sign of the number on display
    let currentValue = display.textContent;

    if (currentValue === '0' || currentValue === '') {
        return; // do nothing if display is 0 or empty
    }

    if (currentValue.charAt(0) === '-') { // if leading character is a negative sign
        display.textContent = currentValue.slice(1); // remove the negative sign
    } else { // else if leading character is not a negative sign
        display.textContent = '-' + currentValue; // add a negative sign
    }
}

function percent() { // function to calculate percentage
    let currentValue = display.textContent;
    let number = parseFloat(currentValue); // convert string to number

    if (currentValue === '0' || currentValue === '') {
        return; // do nothing if display is 0 or empty
    }   

    let result = number / 100; // calculate percentage
    let resultString = result.toString(); // convert result to string

    if (resultString.length > MAX_DISPLAY_LENGTH) { // if result exceeds max length
        resultString = resultString.slice(0, MAX_DISPLAY_LENGTH); // truncate to max length
    }
    display.textContent = resultString; // update display with result  
}

function squareRoot(number) { // helper function to calculate square root using binary search 
    let start = 0, end = number, mid, ans;

    while (start <= end) {
        // Find mid
        mid = Math.floor((start + end) / 2);
        // If number is perfect square then break
        if (mid * mid == number) {
            ans = mid;
            break;
        }
        // Increment start if integral part lies on right side of the mid
        if (mid * mid < number) {
            // First start value should be added to answer
            ans = start;
            // Then start should be changed
            start = mid + 1;
        }
        // Decrement end if integral part lies on the left side of the mid
        else {
            end = mid - 1;
        }
    }
    // To find the fractional part of square root upto 6 decimal
    let increment = 0.1;

    for (let i = 0; i < 6; i++) {
        while (ans * ans <= number) {
            ans += increment;
        }
        // Loop terminates, when ans * ans > number
        ans = ans - increment;
        increment = increment / 10;
    }
    return ans;
}

function calculateSquareRoot() { // function to calculate square root
    let currentValue = display.textContent;
    let number = parseFloat(currentValue); // convert string to number

    if (currentValue === '0' || currentValue === '') {
        return; // do nothing if display is 0 or empty
    }

    const startTime = performance.now(); // performance measurement start

    let result = squareRoot(number); // calculate square root

    const endTime = performance.now(); // performance measurement end

    let resultString = result.toString(); // convert result to string

    if (resultString.length > MAX_DISPLAY_LENGTH) { // if result exceeds max length
        resultString = resultString.slice(0, MAX_DISPLAY_LENGTH); // truncate to max length
    }

    display.textContent = resultString; // update display with result

    const executionTime = endTime - startTime;
    console.log(`Execution time: ${executionTime} milliseconds`);
}

function appendDecimal() { // function to add a demical point
    let currentValue = display.textContent;

    if (currentValue.includes('.')) {
        return; // do nothing if decimal point already exists
    }

    if (currentValue === '0') {
        display.textContent = '0.'; // add decimal point to 0
    } else {
        display.textContent += '.'; // append decimal point
    }
}

function clearDisplay() { // function to clear the display screen
    display.textContent = "0"; // reset display to 0
}