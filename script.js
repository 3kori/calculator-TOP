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

const numberBtns = document.querySelectorAll(".number-btns");
const input= document.querySelector(".input-display");

numberBtns.forEach(( numberBtn ) => {
    numberBtn.addEventListener("click", function (e) {
        input.value += e.target.innerText;
        console.log(input.value);
    });
});


