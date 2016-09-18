var Event = require('./Event.js');

module.exports = {

events: new Array(),

addEvent: function(name,date,duration,location){
	var newEvent = new Event.Event(name,date,duration,location);
	module.exports.events.push(newEvent);
},

searchEvents: function(begin, end){
	var eventsFound = new Array();
	for(var x=0;x<module.exports.events.length;x++){
		if(module.exports.events[x].date.between(begin,end)){
			eventsFound.push(module.exports.events[x]);
		}
	}
	return eventsFound;
}

};
