console.log("Hello World!");

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

// finds all div's that act
// as multiple choice for the page
function getDivRadioInput() 
{
    // returns all div's with a radio role
    return document.querySelectorAll("div[role='radio']");
}

<<<<<<< HEAD
// split up the div inputs into their respective multiple choice sections
function splitDivRadioInput() 
{
    var choices = getDivRadioInput();
    console.log(choices[0].getAttributeNames());
    var sections = [];
    var next = 0;
    var i = 0;  
    while (next < choices.length) {
        var small = []; 
        // gets the div multiple choice
        var firstDivChoice = choices[next]; 
        // from what I noticed about each div multiple choice,
        // there's a aria-posinset that assigns each of them together
        // for example a multiple choice of 1-4 has 4 posinsets assigned 
        var posinset = firstDivChoice.getAttribute('aria-posinset'); 
        // console.log(posinset);
        for (i = next+1; i < choices.length; i++) { 
            // console.log("TEST");
            var divChoice = choices[i]; 
            var divPos = divChoice.getAttribute('aria-posinset'); 
            // console.log("This is the second " + divPos);
            if (divPos == posinset) { 
                next = i; 
                break; 
            } 
            console.log("1 bites the dust " + divPos);
            small.push(divChoice); 
        } 
        sections.push(small);
        if (i == choices.length) { 
            break; 
        } 
    }

    return sections;
}

// random multiple choice div
function randomDivRadioInput() {
    var sections = splitDivRadioInput();
    for (var i = 0; i < sections.length; i++) {
        sections[i][Math.floor(Math.random() * sections[i].length)].click();
    }
}

=======
>>>>>>> 3c8411099fe69b5d1f1c30cfd679d155c5c42259
