const calculator = {
    displayNumber: 0,
    operator: null,
    firsNumber: null,
    secondNumber: null,
    isWaitingForSecondNumber: false,
};
function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}
function clearCalculaltor(){
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firsNumber = null;
    calculator.isWaitingForSecondNumber = false;
}
function inputDigit(digit){
    if (calculator.displayNumber == '0') {
        calculator.displayNumber = digit;
      } else {
        calculator.displayNumber += digit;
      }
}
function inverseNumber(){
    if(calculator.displayNumber =='0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber *-1;
}
function handleOperator(operator){
    if(!calculator.isWaitingForSecondNumber){
        calculator.operator = operator;
        calculator.isWaitingForSecondNumber = true;
        calculator.firsNumber = calculator.displayNumber;
        calculator.displayNumber = '0'
    } else {
        alert('Operator sudah ditetapkan');
    }
}
function performCalculation(){
    if(calculator.firsNumber == null || calculator.operator == null){
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if(calculator.operator =='+'){
        result = parseInt(calculator.firsNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firsNumber) - parseInt(calculator.displayNumber);
    }
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}
const buttons = document.querySelectorAll('.button');
for(const button of buttons){
    button.addEventListener('click', function(event){
        const target = event.target;

        if(target.classList.contains('clear')){
            clearCalculaltor();
            updateDisplay();
            return;
        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
          }
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
          }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
          }

        inputDigit(target.innerText);
        updateDisplay();
    });
}
