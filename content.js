console.log("Hello World!");

// finds all div's that act
// as multiple choice for the page
function getDivRadioInput() 
{
    // returns all div's with a radio role
    return document.querySelectorAll("div[role='radio']");
}

// splits the input
// can be div or radio
function splitInput(inputFunction, attr)
{
    var choices = inputFunction();
    var sections = [];
    var next = 0;
    var i = 0;
    while(next < choices.length) {
        var small = [];
        var firstChoice = choices[next];
        var firstAttr = firstChoice.getAttribute(attr);
        firstAttr = firstAttr[firstAttr.length - 1];
        small.push(firstChoice);

        for (var i = next + 1; i < choices.length; i++) {
            var nextChoice = choices[i];
            var nextAttr = nextChoice.getAttribute(attr);
            nextAttr = nextAttr[nextAttr.length - 1];

            if (nextAttr == firstAttr) {
                next = i;
                break;
            }

            small.push(nextChoice);
        }

        sections.push(small);

        if (i == choices.length) break;
    }

    return sections;
}

// split up the div inputs into their respective multiple choice sections
function splitDivRadioInput() 
{

    var inputFunction = getDivRadioInput;
    // from what I noticed about each div multiple choice,
    // there's a aria-posinset that assigns each of them together
    // for example a multiple choice of 1-4 has 4 posinsets assigned 
    var attr = 'aria-posinset';
    return splitInput(inputFunction, attr);
}

// random multiple choice div
function randomDivRadioInput() {
    var sections = splitDivRadioInput();
    for (var i = 0; i < sections.length; i++) {
        sections[i][Math.floor(Math.random() * sections[i].length)].click();
    }
}


// find all the multiple choice that 
// are input files with radios
function getRadioInputs()
{
    // getting all the inputs for the document
    var inputs = document.getElementsByTagName("input");
    // will be populated with all inputs that actually have values
    var values = [];

    // populating the values field
    // These fields will only have inputs from 
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name != "") {
            values.push(input);
        }
    }
    
    return values;
} 

// finding the sections for the multiple choice
function splitRadioInput() 
{

    var inputFunction = getRadioInputs;
    // for radio inputs, the id seems to be what sets different
    // sections for multiple choice
    var attr = 'id';

    return splitInput(inputFunction, attr);
}

// random multiple choice div
function randomRadioInput() {
    var sections = splitRadioInput();
    for (var i = 0; i < sections.length; i++) {
        sections[i][Math.floor(Math.random() * sections[i].length)].checked = true;
    }
}

randomRadioInput();






