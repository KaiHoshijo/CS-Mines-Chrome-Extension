console.log("Hello World!");

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

// checking the length of the program
console.log(values.length);

const Http = new XMLHttpRequest();
const value=["<all_urls>"];
Http.open("GET", values);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}
