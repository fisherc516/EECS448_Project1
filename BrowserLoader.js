var test = require('./test.js');

var eventHandler = require('./EventHandler.js');

var $ = require('./jquery-3.1.0.min.js');
window.$ - $;
window.jQuery = $;

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}//http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript#2998822

goToNewPage = function(url){
    window.location = url;
    return false;
}

goToSamePage = function(url){
    window.location = url;
    window.location.reload();
    return false;
}

function loadYear(year){
    for(m=1;m<=12;m++){
        var month = Date.parse(m+" 1 "+year);
        $('#m'+m+'title').html(month.toString("MMMM yyyy"));
        $('#month'+m).attr('href',('month.html#'+year+zeroPad(m,2)));
        $('#next').attr('onclick','goToSamePage(\''+'year.html#'+(parseInt(year)+1)+'\')');
        $('#previous').attr('onclick','goToSamePage(\''+'year.html#'+(parseInt(year)-1)+'\')');
        var offset = month.getDay();
        var days = Date.getDaysInMonth(year,m-1);
        for(w=1;w<=6;w++){
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

function loadMonth(year,month){
    var m = Date.parse(month+" 1 "+year);
    $('#title').html(m.toString("MMMM yyyy"));
    var nextMonth = month+1;
    var nextYear = year;
    var prevMonth = month-1;
    var prevYear = year;
    if(nextMonth==13){nextMonth=1;nextYear++;}
    if(prevMonth==0){prevMonth=12;prevYear--;}
    $('#next').attr('onclick','goToSamePage(\''+'month.html#'+nextYear+zeroPad(nextMonth,2)+'\')');
    $('#previous').attr('onclick','goToSamePage(\''+'month.html#'+prevYear+zeroPad(prevMonth,2)+'\')');
    $('#back').attr('onclick','goToNewPage(\''+'year.html#'+prevYear+'\')');
	var offset = m.getDay();
	var days = Date.getDaysInMonth(year,month-1);
	for(w=1;w<=6;w++){
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
            if(d==1){
             $('#w'+w).attr('onclick','goToNewPage(\''+'week.html#'+year+zeroPad(month,2)+zeroPad(urlDay,2)+'\')');
            }
			if((day>0)&&(day<=days)){
                var element = $('#w'+w+'d'+d);
				element.attr('id','d'+day);
                element = $('#d'+day);
                element.html('<a>'+day+'</a>');
			}
		}
	}
}

function loadWeek(year,month,day){
    var days = Date.getDaysInMonth(year,month-1);
    var date = day;
    var displayMonth = month;
    var begin = Date.parse(month+'/'+day+'/'+year);
    var end = Date.parse(begin.toString('MMMM d yyyy'));
    end.addDays(6);
    var previous = Date.parse(begin.toString('MMMM d yyyy'));;
    var next = Date.parse(begin.toString('MMMM d yyyy'));
    previous.addDays(-7);
    next.addDays(7);
    $('#title').html(begin.toString('MMMM d')+' - '+end.toString('MMMM d'));
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
        $('#d'+d).html(month+'/'+date);
        $('#d'+d).attr('onclick','goToNewPage(\''+'day.html#'+year+zeroPad(month,2)+zeroPad(date,2)+'\')');
        date++;
    }
}

function loadDay(year,month,day){
    var thisDay = Date.parse(month+'/'+day+'/'+year);
    console.log(thisDay);
    var previous = Date.parse(thisDay.toString('MMMM d yyyy'));;
    var next = Date.parse(thisDay.toString('MMMM d yyyy'));
    previous.addDays(-1);
    next.addDays(1);
    $('#title').html(thisDay.toString('MMMM d yyyy'));
    $('#next').attr('onclick','goToSamePage(\''+'day.html#'+(next.getYear()+1900)+zeroPad(next.getMonth()+1,2)+zeroPad(next.getDate(),2)+'\')');
    $('#previous').attr('onclick','goToSamePage(\''+'day.html#'+(previous.getYear()+1900)+zeroPad(previous.getMonth()+1,2)+zeroPad(previous.getDate(),2)+'\')');
    var startOfWeek = Date.parse(month+'/'+day+'/'+year);
    var offset = startOfWeek.getDay();
    startOfWeek.addDays(0-offset);
    $('#back').attr('onclick','goToNewPage(\''+'week.html#'+year.toString()+zeroPad(month.toString(),2)+zeroPad(startOfWeek.getDate(),2)+'\')');
}

$(document).ready(function(){
	var page = document.location.href.match(/[^\/]+$/)[0];
    page = page.substr(0,page.lastIndexOf('#'));
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('#') + 1);
	switch(page){
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
            console.log('day run');
            loadDay(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)),parseInt(id.substr(6,2)));
            break;
	}
});
