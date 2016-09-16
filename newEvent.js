firstEvent = require('./EventHandler.js')
fs = require('fs')

//Clears the events.txt file and writes all of the elements in the event array
//Requires an event array
function newSave(firstEvent){
    
    fs.writeFile('events.txt', "", (err) => {
        if(err)
        {
            return console.log(err);
        }
    })
    for(var i = 0; i < firstEvent.events.length; i++)
    {
    
        fs.appendFile('events.txt', firstEvent.events[i].name + "\n" + firstEvent.events[i].date + "\n" + firstEvent.events[i].duration + "\n" + firstEvent.events[i].location + "\n\n", 'utf8', (err) => {
        if(err)
        {
            return console.log(err);
        }
        })
    }
}

//Adds a single event on the events.txt file
//Requires an event array
function newEvent(firstEvent)
{
    fs.appendFile('events.txt', firstEvent.events.name + "\n" + firstEvent.events.date + "\n" + firstEvent.events.duration + "\n" + firstEvent.events.location + "\n\n", 'utf8', (err) => {
    if(err)
    {
        return console.log(err);
    }
    })
}
