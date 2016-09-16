fs = require('fs');

//Returns a string of the events currently logged in the events text file
function currentEvents() {
var fileInput;

fs.readFile("events.txt", 'utf8', function handleError(error, fileInput) {
    if(error)
    {
        return console.log(error);
    }
    })
return currentEvents;
}
