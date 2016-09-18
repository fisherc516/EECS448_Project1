fs = require('fs');

//Returns a string of the events currently logged in the events text file
function currentEvents() {

fs.readFile("events.txt", 'utf8', (error, fileInput) => {
    if(error)
    {
        return console.log(error);
    }
    return fileInput;
  });
}
