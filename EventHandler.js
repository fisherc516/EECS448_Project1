var Event = require('./Event.js');

window.events = new Array();

module.exports = {

addEvent: function(name,date,duration,location){
	var newEvent = new Event.Event(name,date,duration,location);
	window.events.push(newEvent);
},

searchEvents: function(begin, end){
	var eventsFound = new Array();
	for(var x=0;x<window.events.length;x++){
		if(window.events[x].date.between(begin,end)){
			eventsFound.push(window.events[x]);
		}
	}
	return eventsFound;
},

deleteEvent: function(idNum){
  for(var i= 0; i < events.length; i++){
    if(events[i]['id'] === idNum){
      var del = events.splice(i, 1);
      delete del;
    }
    else {
      console.log("error");
    }
  }
}

};
