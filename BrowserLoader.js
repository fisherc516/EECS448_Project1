var test = require('./test.js');

var eventHandler = require('./EventHandler.js');

var $ = require('./jquery-3.1.0.min.js');
window.$ - $;
window.jQuery = $;

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}//http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript#2998822

reloadPage = function(){
    //Save file her
    window.location.reload();
}

goToPage = function(url){
    window.location = url;
    window.location.reload();
    return false;
}

function loadYear(year){
    for(m=1;m<=12;m++){
        var month = Date.parse(m+" 1 "+year);
        $('#m'+m+'title').html(month.toString("MMMM yyyy"));
        $('#month'+m).attr('href',('month.html#'+year+zeroPad(m,2)));
        $('#next').attr('onclick','goToPage(\''+'year.html#'+(parseInt(year)+1)+'\')');
        $('#previous').attr('onclick','goToPage(\''+'year.html#'+(parseInt(year)-1)+'\')');
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
    $('#next').attr('onclick','goToPage(\''+'month.html#'+nextYear+zeroPad(nextMonth,2)+'\')');
    $('#previous').attr('onclick','goToPage(\''+'month.html#'+prevYear+zeroPad(prevMonth,2)+'\')');
	var offset = m.getDay();
	var days = Date.getDaysInMonth(year,month-1);
	for(w=1;w<=6;w++){
		for(d=1;d<=7;d++){
			var day = (w-1)*7+d-offset;
            if(d==1){
             $('#w'+w).attr('onclick','goToPage(\''+'week.html#'+year+zeroPad(month,2)+zeroPad(day,2)+'\')');
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
    alert(days);
    var date = day;
    var displayMonth = month;
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
        date++;
    }
}

$(document).ready(function(){
	var page = document.location.href.match(/[^\/]+$/)[0];
    page = page.substr(0,page.lastIndexOf('#'));
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('#') + 1);
	switch(page){
        case 'week.html':
            alert('test');
            loadWeek(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)),parseInt(id.substr(6,2)))
            break;
		case 'month.html':
			loadMonth(parseInt(id.substr(0,4)),parseInt(id.substr(4,2)));
			break;
        case 'year.html':
            loadYear(id);
            break;
	}
});
