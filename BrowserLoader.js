window.cookies = require('./CookieMonster.js'); //data is saved through cookies, handled by CookieMonster.js

window.cookies.lastView();

var $ = require('./jquery-3.1.0.min.js'); 
window.$ - $;   //include jQuery and set up $ function
window.jQuery = $;

function zeroPad(num, places) { //used to pad zeroes on dates
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}//http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript#2998822

goToNewPage = function(url){//change pages to different html page
    window.location = url;
    return false;
}

goToSamePage = function(url){//reload same html page with different dates
    window.location = url;
    window.location.reload();
    return false;
}

function loadYear(year){//this function loads the year view
    for(m=1;m<=12;m++){//load each month in the year
        var month = Date.parse(m+" 1 "+year);
        $('#m'+m+'title').html(month.toString("MMMM yyyy"));//load month title
        $('#month'+m).attr('href',('month.html#'+year+zeroPad(m,2)));//load links to month pages
        //load links to next and previous year
        $('#next').attr('onclick','goToSamePage(\''+'year.html#'+(parseInt(year)+1)+'\')');
        $('#previous').attr('onclick','goToSamePage(\''+'year.html#'+(parseInt(year)-1)+'\')');
        var offset = month.getDay();
        var days = Date.getDaysInMonth(year,m-1);
        for(w=1;w<=6;w++){//this nested loop loads the dates into each day of current month
            for(d=1;d<=7;d++){
                var day = (w-1)*7+d-offset;
                if((day>0)&&(day<=days)){
                    var element = $('#m'+m+'w'+w+'d'+d);
                    element.attr('id','m'+m+'d'+day);
                    element = $('#m'+m+'d'+day);
                    element.html('<a>'+day+'</a>');
                }
            }
        }
    }
}

function loadMonth(year,month){//this function loads the month view
    var m = Date.parse(month+" 1 "+year);
    $('#title').html(m.toString("MMMM yyyy"));//load title of the month
    var nextMonth = month+1;
    var nextYear = year;    //find next and previous months
    var prevMonth = month-1;
    var prevYear = year;
    if(nextMonth==13){nextMonth=1;nextYear++;}
    if(prevMonth==0){prevMonth=12;prevYear--;}
    //load links to next and previous months
    $('#next').attr('onclick','goToSamePage(\''+'month.html#'+nextYear+zeroPad(nextMonth,2)+'\')');
    $('#previous').attr('onclick','goToSamePage(\''+'month.html#'+prevYear+zeroPad(prevMonth,2)+'\')');
    $('#back').attr('onclick','goToNewPage(\''+'year.html#'+prevYear+'\')');
	var offset = m.getDay();
	var days = Date.getDaysInMonth(year,month-1);
	for(w=1;w<=6;w++){//this nested loop loads dates into each day of the month
		for(d=1;d<=7;d++){
			var day = (w-1)*7+d-offset;
            var urlDay = day;
            if(day<1){
                if(month==1){
                    urlDay += Date.getDaysInMonth(year-1,12);
                }else{
                    urlDay += Date.getDaysInMonth(year,month-1);
                }
            }
            //create link to each week view in the month
            if(d==1){
             $('#w'+w).attr('onclick','goToNewPage(\''+'week.html#'+year+zeroPad(month,2)+zeroPad(urlDay,2)+'\')');
            }
            //
			if((day>0)&&(day<=days)){
                var element = $('#w'+w+'d'+d);//changes ids of each day cell and adds dates
				element.attr('id','d'+day);
                element = $('#d'+day);
                element.html('<a>'+day+'</a>');
			}
		}
	}
}

function loadWeek(year,month,day){//this function loads the week view
    var days = Date.getDaysInMonth(year,month-1);
    var date = day;
    var displayMonth = month;
    var begin = Date.parse(month+'/'+day+'/'+year);
    var end = Date.parse(begin.toString('MMMM d yyyy'));//find beginning and ending days of week
    end.addDays(6);
    var previous = Date.parse(begin.toString('MMMM d yyyy'));;
    var next = Date.parse(begin.toString('MMMM d yyyy'));
    previous.addDays(-7);//find first day of next and previous weeks
    next.addDays(7);
    $('#title').html(begin.toString('MMMM d')+' - '+end.toString('MMMM d'));//load title of week
    //load links to next and previous weeks
    $('#next').attr('onclick','goToSamePage(\''+'week.html#'+(next.getYear()+1900)+zeroPad(next.getMonth()+1,2)+zeroPad(next.getDate(),2)+'\')');
    $('#previous').attr('onclick','goToSamePage(\''+'week.html#'+(previous.getYear()+1900)+zeroPad(previous.getMonth()+1,2)+zeroPad(previous.getDate(),2)+'\')');
    $('#back').attr('onclick','goToNewPage(\''+'month.html#'+year.toString()+month.toString()+'\')');
    
    for(d=1;d<=7;d++){
        if(date>days){
            date = 1;
            if(month==12){
                month=1;
            }else{
                month++;
            }
        }
        $('#d'+d).html(month+'/'+date);//load dates into each day of the week
        $('#d'+d).attr('onclick','goToNewPage(\''+'day.html#'+year+zeroPad(month,2)+zeroPad(date,2)+'\')');//add link to each individual day
        date++;
    }
}

function loadDay(year,month,day){//this function loads the date view
    var thisDay = Date.parse(month+'/'+day+'/'+year);
    window.date = thisDay.toString('MMddyyyy');
    var previous = Date.parse(thisDay.toString('MMMM d yyyy'));;
    var next = Date.parse(thisDay.toString('MMMM d yyyy'));
    previous.addDays(-1);
    next.addDays(1);
    $('#title').html(thisDay.toString('MMMM d yyyy'));//load title of day
    //create links to next and previous day
    $('#next').attr('onclick','goToSamePage(\''+'day.html#'+(next.getYear()+1900)+zeroPad(next.getMonth()+1,2)+zeroPad(next.getDate(),2)+'\')');
    $('#previous').attr('onclick','goToSamePage(\''+'day.html#'+(previous.getYear()+1900)+zeroPad(previous.getMonth()+1,2)+zeroPad(previous.getDate(),2)+'\')');
    var startOfWeek = Date.parse(month+'/'+day+'/'+year);
    var offset = startOfWeek.getDay();
    startOfWeek.addDays(0-offset);//find week this day is in and create link back to week view
    $('#back').attr('onclick','goToNewPage(\''+'week.html#'+year.toString()+zeroPad(month.toString(),2)+zeroPad(startOfWeek.getDate(),2)+'\')');
    var times = ['12AM','1AM','2AM','3AM','4AM','5AM','6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
    for(x=1;x<=24;x++){
        //link each add event button to the cookie handler
        $('#add'+x).attr('onclick','cookies.setCookie(\''+window.date+'\',\''+times[x-1]+'\')');
    }
    cookies.getCookie(window.date);
}

$(document).ready(function(){//this is the "main" function when each page gets loaded
	var page = document.location.href.match(/[^\/]+$/)[0];
    page = page.substr(0,page.lastIndexOf('#'));//find which page the user is on
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('#') + 1);//this id holds the date info for the page. it is appended on the end of the url after a #
	switch(page){//depending on which page the user is on, load the page with these functions
        case 'week.html':
            loadWeek(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)),parseInt(id.substr(6,2)))
            break;
		case 'month.html':
			loadMonth(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)));
			break;
        case 'year.html':
            loadYear(id);
            break;
        case 'day.html':
            loadDay(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)),parseInt(id.substr(6,2)));
            break;
        case 'start.html':
            
            break;
	}
});
