var Event = require('Event.js');

events = new Array();

function addEvent(name,date,duration,location){
	var newEvent = new Event(name,date,duration,location);
	events.push(newEvent);
}
