//user clicks add event on certain day which calls the following script and gives
//the script a  date and time

function setCookie(date, time){
  var id = date+"-"+time+"-"+new Date().getTime();
  var name=prompt("Please enter the name of the Event:","");//set name
  var location=prompt("Please enter the location: ","");//set location
  var duration=prompt("Please enter duration: ",""); //set duration
  var content = name+" at "+location+" for "+duration;// create cookie content
  var d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000)); //current time plus 30 days
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+content+"; "+expires;// create cookie
  return content;// return cookie content to be displayed in day view.
}

//deletes cookie by making it expire
function deleteCookie(id){
  var d = new Date();
  d.setTime(d.getTime() + (-1*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
}

//Populates Day view with events
function getCookie(date) {
    var doc = document.cookie.split(';');
    for(var i=0; i<doc.length; i++) {
        var cookie = doc[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if(cookie.includes(date))
        {
          var crumb = cookie.split('=');
          var content = crumb[1];
          var crumb2 = crumb[0].split('-');
          var time = crumb2[1];
          var id = crumb[0];
          $('#'+time).html(content);

        }
      }
}
//saves the last window viewed in cookie
function lastView(){
  var content = window.location.href;
  var id = "LastView";
  var d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000)); //current time plus 30 days
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+content+"; "+expires;// create cookie
}

//returns to the last viewed page when program is closed then reopened.
function getLastView(){
  var doc = document.cookie.split(';');
  for(var i=0; i<doc.length; i++) {
      var cookie = doc[i];
      while (cookie.charAt(0)==' ') {
          cookie = cookie.substring(1);
      }
      if(cookie.includes("LastView"))
      {
        var crumb = cookie.split('=');
        var content = crumb[1];
        window.location = content;
        window.location.reload();
      }
      else{

      }


}
