console.log("Hello World!");

// getter functions 

// finds all div's that act
// as multiple choice for the page
function getDivRadioInput() 
{
    // returns all div's with a radio role
    var x = [];
    document.querySelectorAll("div[role='radio']").forEach((element) => {
        if (element.ariaPosInSet) {
            x.push(element);
        }
    });
    return x;
}

function getDivCheckBoxInput()
{
    return document.querySelectorAll("div[role='checkbox']");
}

// find all the multiple choice that 
// are input files with radios
function getRadioInputs()
{
    var x = [];
    document.querySelectorAll("input[type='radio']").forEach((element) => {
        if (element.name) {
            x.push(element);
        }
    });
    return x;
} 

function getCheckboxInputs() {
    var x = [];
    document.querySelectorAll("[type='checkbox']").forEach((element) => {
        if (element.name) {
            x.push(element);
        }
    });
    return x;
}

function getInputText() {
    return document.querySelectorAll("[type='text']"); 
}

function getTextarea() {
    return document.querySelectorAll("textarea");
}

// splits the input
function splitInput(choices)
{
    var attr = "aria-posinset";
    var sections = [];
    var next = 0;
    var i = 0;
    while(next < choices.length) {
        var small = [];
        var prevChoice = choices[next];
        var prevAttr = prevChoice.getAttribute(attr).split("_");
        prevAttr = parseInt(prevAttr[prevAttr.length - 1], 10);
        small.push(prevChoice);

        for (var i = next + 1; i < choices.length; i++) {
            var nextChoice = choices[i];
            var nextAttr = nextChoice.getAttribute(attr).split("_");
            nextAttr = parseInt(nextAttr[nextAttr.length - 1], 10);
            if (nextAttr != (prevAttr + 1)) {
                next = i;
                break;
            }

            small.push(nextChoice);
            prevChoice = nextChoice;
            prevAttr = nextAttr;
        }

        sections.push(small);

        if (i == choices.length) break;
    }

    return sections;
}

function splitRadioInput(choices) {
    var sections = [];
    var i = 0;
    var j = 0;
    while (i < choices.length) {
        var firstChoice = choices[i];
        var small = [firstChoice];
        for (j = i + 1; j < choices.length; j++) {
            var nextChoice = choices[j];
            if (nextChoice.getAttribute("name") != firstChoice.getAttribute("name")) {
                i = j;
                break;
            }
            small.push(nextChoice);
        }
        sections.push(small);
        if (j == choices.length) break;
    }
    return sections;
}

function splitDivCheckBox(inputs) {
    var lists = document.querySelectorAll("div[role='list']");
    var sections = [];
    var i = 0;
    if (lists.length == 1) return;
    var nextList = 1;
    var next = 0;
    while (next < inputs.length) {
        var small = [];
        var firstChoice = inputs[next];
        small.push(firstChoice);
        for (var i = next + 1; i < inputs.length; i++) {
            var nextInput = inputs[i];
            if (!lists[nextList].contains(nextInput)) {
                next = i;
                nextList++;
                break;
            }

            small.push(nextInput);
        }
        sections.push(small);
        if (i == inputs.length) break;
    }
    return sections;
}

// random assignment functions

function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}

// get random multiple choice
// can be used for both div radio and radio input tags
async function getRandom(sections, actionFunction) 
{
    // iterating through each object and enabling it
    // this is different for div radio and radio input,
    // so an action is needed here
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        // console.log(section);
        var button = section[Math.floor(Math.random() * section.length)];
        await sleep(2000)
        actionFunction(button); 
        fireEvents(button);
        // Dylan's job 
        // time.sleep(random.randint(10, 30))
    }
}

function randomLetter() {
    let characters = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function randomNumber() {
    let numbers = "1234567890"; 
    return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function randomWord(length) {
    let result = "";
    for (var i = 0; i < length; i++) {
        result += randomLetter();
    }
    return result;
}

function inputText(input) {
    let result = "";
    let numOfWords = Math.floor(Math.random() * 10) + 1;
    for (var i = 0; i < numOfWords; i++) {
        result += randomWord(Math.floor(Math.random() * 10) + 2) + " ";
    }
    // console.log(result);
    input.value = result;
}

// burrowed from fake filler's github
// https://github.com/FakeFiller/fake-filler-extension/blob/master/src/common/element-filler.ts
function fireEvents(element) {
    ["input", "click", "change", "blur"].forEach((event) => {
        const changeEvent = new Event(event, { bubbles: true, cancelable: true });
        element.dispatchEvent(changeEvent);
    });
}

function randomCheckBox(sections, actionFunction) {
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        // console.log(section);
        var totalRandom = Math.floor(Math.random() * section.length) + 1;
        var currentRandom = [];
        while (currentRandom.length != totalRandom) {
            var random = Math.floor(Math.random() * section.length);
            if (!currentRandom.includes(random)) {
                currentRandom.push(random);
                actionFunction(section[random])
                fireEvents(section[random]);
            }
        }
    }
}

function fillInput(inputs, actionFunction) {

    for (var i = 0; i < inputs.length; i++) {
        actionFunction(inputs[i]); 
        fireEvents(inputs[i]);
    }    

} 

// enablers for the multiple choice
function enableDivRadioInput(divRadio)
{
    divRadio.click();
}
function enableRadioInput(radio)
{
    radio.checked = true;
}

function randomInput(splitter, arg, actionFunction) {
    var inputs = splitter(arg)
    getRandom(inputs, actionFunction);
}

function runMultipleChoice() {
    var divInput = getDivRadioInput();
    var radioInput = getRadioInputs();
    // from what I noticed about each div multiple choice,
    // there's a aria-posinset that assigns each of them together
    // for example a multiple choice of 1-4 has 4 posinsets assigned 
    console.log("div radio input " + divInput.length);
    if (divInput.length > 0) randomInput(splitInput, divInput, enableDivRadioInput);
    // for radio inputs, the id seems to be what sets different
    // sections for multiple choice
    console.log("radio input length " + radioInput.length); 
    if (radioInput.length > 0) {
        console.log(radioInput[0].attributes);
        randomInput(splitRadioInput, radioInput, enableRadioInput);
    }

}

function runCheckBox() {
    var divCheck = getDivCheckBoxInput();
    var splitCheck = splitDivCheckBox(divCheck);
    var inputCheck = getCheckboxInputs();
    if (divCheck.length > 0) randomCheckBox(splitCheck, enableDivRadioInput);
    if (inputCheck.length > 0) randomInput(splitRadioInput, inputCheck, enableRadioInput);
}

function fillText() {
    let inputsText = getInputText();
    let textAreas = getTextarea();
    fillInput(inputsText, inputText);
    fillInput(textAreas, inputText);
}

fillText();
runMultipleChoice();
runCheckBox();
// $(".submit").click();
