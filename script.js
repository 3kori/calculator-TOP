

const numberBtns = document.querySelectorAll( ".number-btns" );
const input= document.querySelector( ".input-display" );
const operatorBtns = document.querySelectorAll(".operator-btns");
const equalsBtn = document.querySelector( ".equals" );
const clearBtn = document.querySelector( ".clear" );

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
        if (input.value === "Error") {
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
        if ( firstTerm !== undefined && secondTerm !== undefined ) {
            input.value = operate( arithmeticOperator, firstTerm, secondTerm );
            firstTerm = parseFloat( input.value );
            arithmeticOperator = operatorBtn.value;
            secondTerm = undefined;
            console.log(firstTerm);
            console.log(secondTerm);
            console.log(arithmeticOperator);
        }
        else {
            arithmeticOperator = operatorBtn.value;
            console.log(arithmeticOperator);
        }
    });
});

equalsBtn.addEventListener( "click", function() {
    if ( firstTerm === undefined ) {
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
        if ( input.value === "Error" ) {
            firstTerm = undefined;
            secondTerm = undefined;
            arithmeticOperator = undefined;
            return;
        }
        firstTerm = parseFloat( input.value );
        console.log(firstTerm);
        secondTerm = undefined;
        arithmeticOperator = undefined;
    }
});

clearBtn.addEventListener( "click", function() {
    input.value = "";
    firstTerm = undefined;
    secondTerm = undefined;
    arithmeticOperator = undefined;
    numberBtns.forEach(( numberBtn ) => {
        numberBtn.disabled = false;
        console.log(numberBtn.disabled);
    });
    console.log(firstTerm);
    console.log(secondTerm);
    console.log(arithmeticOperator);
});
