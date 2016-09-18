var EventHandler = require('./EventHandler');

deleteEvent: function(index){
	delete events.splice(index, 1)[0];
}
