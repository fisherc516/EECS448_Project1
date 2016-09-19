//user clicks add event on certain day which calls the following script and gives
//the script a  unique ID

function setCookie(date, time){
  var id = date+"-"+time+"-"+new Date().getTime();
  var name=prompt("Please enter the name of the Event:","");//set name
  var location=prompt("Please enter the location: ","");//set location
  var duration=prompt("Please enter duration: ",""); //set duration
  var content = name+" at "+location+" for "+duration;// create cookie content
  var d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000)) //current time plus 30 days but could be event date.
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+content+"; "+expires;// create cookie
  return content;// return cookie content to be displayed in day view.
}

function deleteCookie(id){
  var d = new Date();;
  d.setTime(d.getTime() + (-1*24*60*60*1000))
  var expires = "expires=" + d.toGMTString();
  document.cookie = id+"="+""+"; "+expires;
}

function lastView(){
  var view = window.location.href;
}

function getCookie(date) {
    var doc = document.cookie.split(';');
    for(var i=0; i<doc.length; i++) {
        var cookie = doc[i];
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1);
        }
        if(cookie.includes(date))
        {
          var crumb = cookie.split('-')
          var time = crumb[1];
          var crumb2 = crumb[2].split('=')
          var content = crumb2[1];
          $('#'+time).html(content);
        }
      }
    }
