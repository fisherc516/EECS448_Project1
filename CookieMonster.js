//user clicks add event on certain day which calls the following script and gives
//the script a  unique ID
var $ = require('./jquery-3.1.0.min.js');
window.$ - $;
window.jQuery = $;

module.exports = {
    
setCookie: function(date, time){
  var id = date+"-"+time+"-"+new Date().getTime();
  var name=prompt("Please enter the name of the Event:","");//set name
  var location=prompt("Please enter the location: ","");//set location
  var duration=prompt("Please enter duration: ",""); //set duration
  var content = name+" at "+location+" for "+duration;// create cookie content
  var d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000)) //current time plus 30 days but could be event date.
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+content+"; "+expires;// create cookie
    window.location.reload();
  return content;// return cookie content to be displayed in day view.
},

deleteCookie: function(id){
  var d = new Date();;
  d.setTime(d.getTime() + (-1*24*60*60*1000))
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
    window.location.reload();
},

lastView: function(){
  var content = window.location.href;
  var id = "LastView";
  var d = new Date();
  d.setTime(d.getTime() + (-1*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+content+"; "+expires;
},
    
getLastView: function(){
    var doc = document.cookie.split(';');
    for(var i=0;i<doc.length;i++){
        var cookie = doc[i];
        while(cookie.charAt(0)==' '){
            cookie = cookie.substring(1);
        }
        if(cookie.includes("LastView")){
            var crumb = cookie.split('=');
            var content = crumb[1];
            window.location = content;
        }else{
            window.location = 'year.html#2016';
        }
    }
},

getCookie: function(date) {
    var times = ['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
    var doc = document.cookie.split(';');
    for(var i=0; i<doc.length; i++) {
        var cookie = doc[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if(cookie.includes(date)){
          var crumb = cookie.split('=');
          var content = crumb[1];
          var crumb2 = crumb[0].split('-');
          var time = crumb2[1];
          var id = crumb[0];
          $('#'+time).append(content+'<br><br>');
          var remNum = times.indexOf(time)+1;
          $('#rem'+remNum).attr('onclick','cookies.deleteCookie(\''+id+'\')');
        }
      }
    }

}