const display = document.querySelector('.display');
let currentExpression = '';  
let result = ''; 
let isNewInput = true; 

function updateDisplay(value) {
    display.textContent = value || '0';
}

function appendCharacter(char) {
    if (isNewInput) {
        currentExpression = char;
        isNewInput = false;
    } else {
        currentExpression += char;
    }
    updateDisplay(currentExpression);
}

function addOperator(operator) {
if (currentExpression === '' && operator === '-') {
currentExpression = '-';
isNewInput = false; 
updateDisplay(currentExpression);
return;
}

if (currentExpression === '') return;  
isNewInput = false;

const lastChar = currentExpression[currentExpression.length - 1];
if (['+', '-', '×', '÷'].includes(lastChar)) {
currentExpression = currentExpression.slice(0, -1); 
}

currentExpression += operator;
updateDisplay(currentExpression);
}


function clearDisplay() {
    currentExpression = '';
    result = '';
    isNewInput = true; 
    updateDisplay(currentExpression);
}

function deleteLastCharacter() {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression);
}

function calculate() {
    if (currentExpression === '') return;   
    const lastChar = currentExpression[currentExpression.length - 1];
    if (['+', '-', '×', '÷'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1);
    }

    try {
        const sanitizedExpression = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        result = eval(sanitizedExpression).toString();
        currentExpression = result; 
        isNewInput = true; 
    } catch (error) {
        currentExpression = 'Error'; //can try w 3+.
    }
    updateDisplay(currentExpression);
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (!isNaN(value) || value === '.') {
            appendCharacter(value);
        } else if (['+', '-', '×', '÷'].includes(value)) {
            addOperator(value);
        } else if (value === 'C') {
            clearDisplay(); 
        } else if (value === '⌫') {
            deleteLastCharacter();
        } else if (value === '=') {
            calculate(); 
        }
    });
});