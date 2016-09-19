/**
*User clicks add event on certain day which calls the following script and gives
*the script a description of that cookie created
*
*@param date the date of the event/cookie being created
*@param time the time of the event/cookie being created
*@return  returns the description given by the user input of that event
*/
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

<<<<<<< HEAD
//deletes cookie by making it expire
||||||| merged common ancestors
=======
/**
*Deletes a cookie by making the expire time of the cookie in the past,
*which tells the computer immediately to delte the cookie with that id
*
*@param id the given id of the cookie to be accessed
*@return nothing
*/
>>>>>>> 86f4f317170eddd889c17f2fed7b9e550a5cf76e
function deleteCookie(id){
<<<<<<< HEAD
||||||| merged common ancestors
  var d = new Date();;
  d.setTime(d.getTime() + (-1*24*60*60*1000))
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
}

function lastView(){
  var content = window.location.href;
  var id = "LastView";
=======
  var d = new Date();;
  d.setTime(d.getTime() + (-1*24*60*60*1000))
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
}

/**
*Creates a cookie that is labled as the most recently viewed if the webpage
*has been closed.
*
*@param none
*@return none
*/
function lastView(){
  var content = window.location.href;
  var id = "LastView";
>>>>>>> 86f4f317170eddd889c17f2fed7b9e550a5cf76e
  var d = new Date();
  d.setTime(d.getTime() + (-1*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
}

<<<<<<< HEAD
//Populates Day view with events
||||||| merged common ancestors
//
=======
/**
*Looks for specific cookies that has the id of the date passed through the
*parameters. It then gives the html the id of the cookie and the cookie's value.

*@param date the id of a speific cookie(s)
*@return none
*/
>>>>>>> 86f4f317170eddd889c17f2fed7b9e550a5cf76e
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
