

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
        return input.value = "Error";
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
            console.log(firstTerm);
            return;
        }

        if (calculationDone === true && arithmeticOperator !== undefined) {

            input.value = e.target.innerText;
            secondTerm = parseFloat(input.value);
            calculationDone = false;
            return;
        }
        else if (input.value === "Error") {
            numberBtns.forEach(( numberBtn ) => {
                numberBtn.disabled = true;
                console.log(numberBtn.disabled);
            });
        }
        else if ( arithmeticOperator !== undefined && secondTerm !== undefined ) {
            input.value += e.target.innerText;
            secondTerm = parseFloat( input.value );
            console.log(secondTerm);
            return secondTerm;
        }
        else if ( arithmeticOperator !== undefined && firstTerm !== undefined ) {
            input.value = "";
            input.value += e.target.innerText;
            secondTerm = parseFloat( input.value );
            console.log(secondTerm);
            return secondTerm;
        }
        else {
            input.value += e.target.innerText;
            firstTerm = parseFloat( input.value );
            console.log(firstTerm);
            return firstTerm;
        }
    });
});

operatorBtns.forEach(( operatorBtn ) => {
    operatorBtn.addEventListener( "click", function() {
        if ( input.value === "Error" ) {
            operatorBtns.forEach(( operatorBtn ) => {
                operatorBtn.disabled = true;
                console.log( operatorBtn.disabled );
            });
        }
        else if ( firstTerm !== undefined && secondTerm !== undefined && arithmeticOperator !== undefined) {
            input.value = operate( arithmeticOperator, firstTerm, secondTerm );
            secondTerm = undefined;
            result = parseFloat( input.value );
            arithmeticOperator = operatorBtn.value;
            firstTerm = parseFloat( result );
            console.log("This is the firstterm when pressing the operator:", firstTerm);
            console.log("This is the arithmetic operator when pressing the operator:",arithmeticOperator);
            console.log("This is the secondterm when pressing the operator:",secondTerm);
            console.log("This is the result when pressing the operator:", result);
        }
        else {
            arithmeticOperator = operatorBtn.value;
            decimalBtn.disabled = false;
            console.log(decimalBtn.disabled);
            console.log(arithmeticOperator);
        }
    });
});

equalsBtn.addEventListener( "click", function() {
    if ( input.value === "Error" ) {
        equalsBtn.disabled = true;
        firstTerm = undefined;
        secondTerm = undefined;
        arithmeticOperator = undefined;
        console.log( equalsBtn.disabled );
    }
    else if ( firstTerm === undefined ) {
        return input.value = "";   
    }
    else if ( ( firstTerm !== undefined && secondTerm === undefined ) ) {
        return input.value = firstTerm;
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
        console.log("This is the firstterm when clicking equals sign:", firstTerm);
        console.log("This is the arithmetic operator when clicking equals sign:", arithmeticOperator);
        console.log("This is the secondterm when clicking equals sign:", secondTerm);
        console.log( "This the answer when clicking equals sign:", result);
    }
});

decimalBtn.addEventListener( "click", function() {
    if ( input.value === "Error" ) {
        decimalBtn.disabled = true;
    }
    else if ( firstTerm !== undefined && secondTerm === undefined && arithmeticOperator !== undefined ) {
        input.value = "0.";
        secondTerm = parseFloat( input.value );
        decimalBtn.disabled = true;
        console.log(secondTerm);
    }
    else if ( input.value === "" ) {
        input.value = "0.";
        firstTerm = parseFloat( input.value );
        console.log(firstTerm);
    }
    else if ( input.value.includes( "." ) ) {
        decimalBtn.disabled = true;
    }
    else {
        input.value += decimalBtn.value;
        decimalBtn.disabled = true;
    }
});


clearBtn.addEventListener( "click", function() {
    input.value = "";
    firstTerm = undefined;
    secondTerm = undefined;
    arithmeticOperator = undefined;
    result = undefined;
    numberBtns.forEach(( numberBtn ) => {
        numberBtn.disabled = false;
        console.log(numberBtn.disabled);
    });
    operatorBtns.forEach(( operatorBtn ) => {
        operatorBtn.disabled = false;
        console.log(operatorBtn.disabled);
    });
    equalsBtn.disabled = false;
    decimalBtn.disabled = false;
    console.log(equalsBtn.disabled)
    console.log(firstTerm);
    console.log(secondTerm);
    console.log(arithmeticOperator);
});

deleteBtn.addEventListener( "click", function() {
    if ( result !== undefined ) {
        input.value = "";
        firstTerm = undefined;
        secondTerm = undefined;
        arithmeticOperator = undefined;
        result = undefined;
        console.log("The result while deleting:", result);
        return result;
    }
    else if ( secondTerm !== undefined && result === undefined ) {
        input.value = input.value.toString().substring(0, input.value.length - 1);
        secondTerm = parseFloat( input.value);
        console.log("The secondterm while deleting:", secondTerm);
        return secondTerm;
    }
    else if ( firstTerm !== undefined && arithmeticOperator === undefined && secondTerm === undefined ) {
        input.value = input.value.toString().substring(0, input.value.length - 1);
        firstTerm = parseFloat( input.value);
        console.log("The firstterm while deleting:", firstTerm);
        return firstTerm;
    }

});