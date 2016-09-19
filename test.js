var eventHandler = require('./EventHandler.js');

for(x=0;x<10;x++){
	eventHandler.addEvent("Sample Event "+x,Date.parse("October "+x+", 2016, "+x+":00pm"),x*10,"Sample Location "+x);
}