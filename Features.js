const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('history-list');

let history = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

function handleInput(value) {
    switch (value) {
        case 'C':
            display.value = '';
            break;
        case '=':
            try {
                let expression = display.value;
                console.log("Expression before evaluation:", expression); // ADDED

                const result = evaluateExpression(expression);
                console.log("Result after evaluation:", result); // ADDED

                if (isNaN(result)) {
                    display.value = 'Error';
                } else {
                    addToHistory(expression, result);
                    display.value = result;
                }
            } catch (error) {
                console.error("Evaluation error:", error);
                display.value = 'Error';
            }
            break;
        default:
            display.value += value;
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);
    expression = expression.replace(/sin\(/g, 'Math.sin(');
    expression = expression.replace(/cos\(/g, 'Math.cos(');
    expression = expression.replace(/tan\(/g, 'Math.tan(');
    expression = expression.replace(/log\(/g, 'Math.log10(');
    expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');

    console.log("Expression after replacements:", expression); // ADDED

    try {
        let result = eval(expression);
        if (typeof result === 'undefined') {
            console.warn("Result is undefined after eval()");
            return NaN; // Return NaN in case of undefined
        }
        return result;
    } catch (error) {
        console.error("Eval error:", error);
        return NaN; // Return NaN in case of error
    }
}

function addToHistory(expression, result) {
    history.unshift(`${expression} = ${result}`);
    if (history.length > 10) {
        history.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('C');
    } else if (['+', '-', '*', '/', '(', ')', '%', '^'].includes(key)) {
        handleInput(key);
    } else if (key === 's') {
        handleInput('sin(');
    } else if (key === 'c') {
        handleInput('cos(');
    } else if (key === 't') {
        handleInput('tan(');
    } else if (key === 'l') {
        handleInput('log(');
    } else if (key === 'r') {
        handleInput('sqrt(');
    }
});
