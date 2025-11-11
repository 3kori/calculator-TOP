

const numberBtns = document.querySelectorAll( ".number-btns" );
const input= document.querySelector( ".input-display" );
const operatorBtns = document.querySelectorAll(".operator-btns");
const equalsBtn = document.querySelector( ".equals" );
const clearBtn = document.querySelector( ".clear" );

function add( x, y ) {
    return parseFloat(( x + y ).toFixed(9) );
}

function subtract( x, y ) {
    return parseFloat(( x - y ).toFixed(9) );
}

function multiply( x, y ) {
    return parseFloat(( x * y ).toFixed(9) );
}

function divide( x, y ) {
    if ( y === 0 ) {
        return input.value = "Error";
    } else {
        return parseFloat(( x / y ).toFixed(9) );
    }
}

let firstTerm;
let secondTerm;
let arithmeticOperator;

function operate( operator, leftNo, rightNo ) {
    if( operator === "+" ) {
        return add( leftNo, rightNo );
    }

    if( operator === "-" ) {
        return subtract( leftNo, rightNo );
    }

    if( operator === "*" ) {
        return multiply( leftNo, rightNo );
    }

    if( operator === "/" ) {
        return divide( leftNo, rightNo );
    }
}

numberBtns.forEach(( numberBtn ) => {
    numberBtn.addEventListener( "click", function ( e ) {
        input.value += e.target.innerText;
    });
});

operatorBtns.forEach(( operatorBtn ) => {
    operatorBtn.addEventListener( "click", function() {
        arithmeticOperator = operatorBtn.value;
        firstTerm = parseFloat( input.value );
        numberBtns.forEach(( numberBtn ) => {
            numberBtn.addEventListener( "click", function ( e ) {
                input.value = "";
                input.value += e.target.innerText;
                secondTerm = parseFloat( input.value );
            });
        });
        
    });
});

equalsBtn.addEventListener( "click", function() {
    input.value = operate( arithmeticOperator, firstTerm, secondTerm);

    if ( input.value === "Error" ) {
        numberBtns.forEach(( numberBtn ) => {
            numberBtn.disabled = true;
            console.log(numberBtn.disabled);
        });
        console.log(input.value);
    }
});

clearBtn.addEventListener( "click", function() {
    input.value = "";
    firstTerm = "";
    secondTerm = "";
    arithmeticOperator = "";
    numberBtns.forEach(( numberBtn ) => {
        numberBtn.disabled = false;
        console.log(numberBtn.disabled);
    });
});
