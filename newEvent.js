<<<<<<< HEAD
Event = require('./EventHandler.js');
fs = require('browserify-fs');
=======
Event = require('./EventHandler.js')
fs = require('browserify-fs')
>>>>>>> f63bb17ae40f9186c5d23bfafe23d509d6703d60

//Clears the events.txt file and writes all of the elements in the event array
//Requires an event array

module.exports = {
    
newSave: function(){

    fs.writeFile('events.txt', "", (err) => {
        if(err)
        {
            return console.log(err);
        }
    })
    for(var i = 0; i < window.events.length; i++)
    {
        alert('test');

        fs.appendFile('events.txt', window.events[i].name + "\n" + window.events[i].date + "\n" + window.events[i].duration + "\n" + window.events[i].location + "\n\n", 'utf8', (err) => {
        if(err)
        {
            return console.log(err);
        }
        })
    }
},

//Adds a single event on the events.txt file
//Requires an event array
function newEvent()
{
    fs.appendFile('events.txt', window.events.name + "\n" + window.events.date + "\n" + window.events.duration + "\n" + window.events.location + "\n\n", 'utf8', (err) => {
    if(err)
    {
        return console.log(err);
    }
    })
}

};
