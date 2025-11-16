

const numberBtns = document.querySelectorAll( ".number-btns" );
const input= document.querySelector( ".input-display" );
const operatorBtns = document.querySelectorAll(".operator-btns");
const equalsBtn = document.querySelector( ".equals" );
const decimalBtn = document.querySelector( ".decimal");
const clearBtn = document.querySelector( ".clear" );
const deleteBtn = document.querySelector( ".delete" );

function add( x, y ) {
    return parseFloat(( x + y ).toFixed(10) );
}

function subtract( x, y ) {
    return parseFloat(( x - y ).toFixed(10) );
}

function multiply( x, y ) {
    return parseFloat(( x * y ).toFixed(10) );
}

function divide( x, y ) {
    if ( y === 0 ) {
        input.value = "Error";
        return "Error";
    } else {
        return parseFloat(( x / y ).toFixed(10) );
    }
}

let firstTerm;
let secondTerm;
let arithmeticOperator;
let result;
let calculationDone = false;

function operate( operator, leftNo, rightNo ) {
    switch ( operator ) {
        case '+':
            return add( leftNo, rightNo );
        case '-':
            return subtract( leftNo, rightNo);
        case '*':
            return multiply( leftNo, rightNo);
        case '/':
            return divide( leftNo, rightNo);
    }
}

numberBtns.forEach(( numberBtn ) => {
    numberBtn.addEventListener( "click", function ( e ) {
        if ( calculationDone === true && arithmeticOperator === undefined ) {
            input.value = "";
            input.value += e.target.innerText;
            firstTerm = parseFloat( input.value );
            secondTerm = undefined;
            calculationDone = false;
            return;
        }

        if (calculationDone === true && arithmeticOperator !== undefined) {

            input.value = e.target.innerText;
            secondTerm = parseFloat(input.value);
            calculationDone = false;
            return;
        }
        else if ( arithmeticOperator !== undefined && secondTerm !== undefined ) {
            input.value += e.target.innerText;
            secondTerm = parseFloat( input.value );
            return;
        }
        else if ( arithmeticOperator !== undefined && firstTerm !== undefined ) {
            input.value = "";
            input.value += e.target.innerText;
            secondTerm = parseFloat( input.value );
            return;
        }
        else {
            input.value += e.target.innerText;
            firstTerm = parseFloat( input.value );
            return;
        }
    });
});

operatorBtns.forEach(( operatorBtn ) => {
    operatorBtn.addEventListener( "click", function() {
        if ( firstTerm !== undefined && secondTerm !== undefined && arithmeticOperator !== undefined) {
            input.value = operate( arithmeticOperator, firstTerm, secondTerm );
            secondTerm = undefined;
            result = parseFloat( input.value );
            arithmeticOperator = operatorBtn.value;
            firstTerm = parseFloat( result );
        }
        else {
            arithmeticOperator = operatorBtn.value;
            decimalBtn.disabled = false;
        }
    });
});

equalsBtn.addEventListener( "click", function() {
    if ( input.value === "Error" ) {
        resetCalculator();
        return;
    }
    else if ( firstTerm === undefined ) {
        return input.value = "";   
    }
    else if ( firstTerm !== undefined && arithmeticOperator !== undefined  && secondTerm === undefined ) {
        return input.value = firstTerm;
    }
    else {
        input.value = operate( arithmeticOperator, firstTerm, secondTerm );
        result = parseFloat( input.value );
        firstTerm = parseFloat( result );
        result = undefined;
        secondTerm = undefined;
        arithmeticOperator = undefined;
        decimalBtn.disabled = false;
        calculationDone = true;
    }
});

decimalBtn.addEventListener( "click", function() {
    if ( calculationDone === true && arithmeticOperator === undefined ) {
        input.value = "0.";
        firstTerm = parseFloat( input.value );
        decimalBtn.disabled = true;
        calculationDone = false;
        return;
    }

    if ( input.value === "Error" ) {
        return;
    }
    else if ( firstTerm !== undefined && secondTerm === undefined && arithmeticOperator !== undefined ) {
        input.value = "0.";
        secondTerm = parseFloat( input.value );
        decimalBtn.disabled = true;
    }
    else if ( input.value === "" ) {
        input.value = "0.";
        firstTerm = parseFloat( input.value );
    }
    else if ( input.value.includes( "." )) {
        return;
    }
    else {
        input.value += decimalBtn.value;
        decimalBtn.disabled = true;
    }
});


clearBtn.addEventListener( "click", function() {
    resetCalculator();
});

deleteBtn.addEventListener( "click", function() {
    if ( arithmeticOperator !== undefined && secondTerm === undefined ) {
        arithmeticOperator = undefined;
        decimalBtn.disabled = input.value.includes( "." );
        return;
    }

    if ( input.value === "Error" ) {
        resetCalculator();
        return;
    }
    else if ( secondTerm !== undefined && result === undefined ) {
        input.value = input.value.toString().substring(0, input.value.length - 1);
        secondTerm = input.value === "" ? undefined : parseFloat( input.value);
        if ( !input.value.includes( "." )) {
            decimalBtn.disabled = false;
        }
        return;
    }
    else{
        input.value = input.value.toString().substring(0, input.value.length - 1);
        firstTerm = input.value === "" ? undefined : parseFloat( input.value);
        if ( !input.value.includes( "." )) {
            decimalBtn.disabled = false;
        }
    }
});

function resetCalculator() {
    input.value = ""
    firstTerm = undefined;
    arithmeticOperator = undefined;
    secondTerm = undefined;
    result = undefined;
    decimalBtn.disabled = false;
    calculationDone = false;
}