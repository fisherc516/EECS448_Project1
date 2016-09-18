var Datejs = require('./date.js');
//Date.js is a JavaScript library to work with dates and times

module.exports = {

Event: function(name,date,duration,location){
	this.name = name; //user defined string
	this.date = date; //JavaScript Date object, day and time to begin event
	this.duration = duration; //in minutes, int value
	this.location = location; //user defined string
	this.id = (new Date().getTime());
	this.dayToString = function(){
		return this.date.toString("MMMM d, yyyy")
	}
	this.timeToString = function(){
		var begin = this.date.toString("h:mm tt")
		var end   = this.date.add(duration).minutes().toString("h:mm tt")
		return (begin + " - " + end);
	}
}

};
