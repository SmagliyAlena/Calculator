let display = document.querySelector('.display');

const state = {
    left: {leftNumber: 0,
           pointPosition:0,
    }, 
    right: {rightNumber: 0,
            pointPosition:0,},
    operation: null,
    mode: 'integerLeft',
};
// mode can be
//'integerLeft'
//'fractionalLeft'
//'integerRight'
//'fractionalRight'

function onButtonClick(ev) {
    let text = ev.target.innerText;
    let number = parseInt(text)
    
    if (isNaN(number)) {
        processOperation(text);
    }
    else {
        processNumber(number)
    }
}
function init() {
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', onButtonClick)
    })
}

function processOperation(operation) {
    switch (operation) {
        case '+': 
        case '-': 
        case '÷': 
        case '×':
            if (state.mode == 'integerLeft' || state.mode == 'fractionalLeft') {
                state.mode = 'integerRight'
            }
            state.operation = operation;
            display.innerText = '';
            console.log(operation);

            break;
        case '·':
            if (state.mode == 'integerLeft') {
                display.innerText += '.';
                //state.operation = operation;
                state.mode = 'fractionalLeft'; 
                break; 
            }
            else if (state.mode == 'integerRight') {
                display.innerText += '.';
                
                state.mode = 'fractionalRight'; 
                break; 
            }
            display.innerText += '.';
            state.operation = operation;
            break;
        case '=':
            countResult();
            break;
    }
}

function processNumber(digit) {
    if (state.mode == 'integerLeft') {
        state.left.leftNumber = (state.left.leftNumber * 10) + digit;
        //display.innerText = state.left.leftNumber;
        display.innerText += digit
    }    
    else if (state.mode == 'fractionalLeft') {
        state.left.pointPosition += 1; 
        let power = (0.1 ** state.left.pointPosition); 
        state.left.leftNumber = (digit * power) + state.left.leftNumber;

        state.left.leftNumber = parseFloat(state.left.leftNumber.toFixed(state.left.pointPosition))
        
        //display.innerText = state.left.leftNumber

        
        display.innerText += digit; 
        console.log(state.left.leftNumber)
    }    
    else if (state.mode ==  'integerRight') {
        state.right.rightNumber = (state.right.rightNumber * 10) + digit;
        //display.innerText = state.right.rightNumber;
        
        display.innerText += digit
        console.log(state.right)
    }
    else if (state.mode == 'fractionalRight'){
        state.right.pointPosition += 1; 
        let power = (0.1 ** state.right.pointPosition);
            
        state.right.rightNumber = (digit * power) + state.right.rightNumber;
        //display.innerText = state.right.rightNumber
        display.innerText += digit
    }
}   
const operations = {
    '+': (l,r) => l + r,
    '-': (l,r) => l - r,
    '÷': (l,r) => l / r,
    '×': (l,r) => l * r,
}  
function countResult() {

    const result = operations[state.operation](state.left.leftNumber, state.right.rightNumber);

    display.innerText = result;

    state.left.leftNumber = result;
    state.right.rightNumber = 0;
    state.left.pointPosition = 0;
    state.right.pointPosition = 0; 
    state.operation = null;
    state.mode = 'integerLeft'
}



init()
