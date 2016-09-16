var eventHandler = require('EventHandler.js');

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
});//http://stackoverflow.com/questions/1801160/can-i-use-jquery-with-node-js


