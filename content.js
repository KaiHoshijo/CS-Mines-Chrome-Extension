console.log("Hello World!");

class multipleChoice {
    // getter functions 

    // finds all div's that act
    // as multiple choice for the page
    getDivRadioInput() 
    {
        // returns all div's with a radio role
        return document.querySelectorAll("div[role='radio']");
    }

    // find all the multiple choice that 
    // are input files with radios
    getRadioInputs()
    {
        return document.querySelectorAll("input[type='radio']");
    } 

    // splits the input
    // can be div or radio
    splitInput(choices, attr)
    {
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

    // random assignment functions

    // get random multiple choice
    // can be used for both div radio and radio input tags
    getRandom(sections, actionFunction, arg) 
    {
        // iterating through each object and enabling it
        // this is different for div radio and radio input,
        // so an action is needed here
        for (var i = 0; i < sections.length; i++) {
            actionFunction(sections[i][Math.floor(Math.random() * sections[i].length)]);
            // Dylan's job 
            // time.sleep(random.randint(10, 30))
        }
    }

    // enablers for the multiple choice
    enableDivRadioInput(divRadio)
    {
        divRadio.click();
    }
    enableRadioInput(radio)
    {
        radio.checked = true;
    }

    randomInput(arg, attr, actionFunction) {
        var inputs = this.splitInput(arg, attr)
        this.getRandom(inputs, actionFunction, arg);
    }

    runMultipleChoice() {
        var divInput = this.getDivRadioInput();
        var radioInput = this.getRadioInputs();
        // from what I noticed about each div multiple choice,
        // there's a aria-posinset that assigns each of them together
        // for example a multiple choice of 1-4 has 4 posinsets assigned 
        if (divInput.length > 0) this.randomInput(divInput, "aria-posinset", this.enableDivRadioInput);
        // for radio inputs, the id seems to be what sets different
        // sections for multiple choice
        if (radioInput.length > 0) this.randomInput(radioInput, "id", this.enableRadioInput);

    }
};
// run Dylan's section
// runMultipleChoice();

// run Ava's section 
// find button with role = submit
// button.click()
