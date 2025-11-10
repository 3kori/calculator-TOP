function add( x, y ) {
    return x + y;
}

function subtract( x, y ) {
    return x - y;
}

function multiply( x, y ) {
    return x * y;
}

function divide( x, y ) {
    return x / y;
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

const numberBtns = document.querySelectorAll( ".number-btns" );
const input= document.querySelector( ".input-display" );
const operatorBtns = document.querySelectorAll(".operator-btns");
const equalsBtn = document.querySelector( ".equals" );


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
    input.value = operate( arithmenticOperator, firstTerm, secondTerm);
})
