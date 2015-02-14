/*
 * jQuery Kalendar - A light-weight calendar plugin
 *
 * Licensed under The MIT License
 *
 * @author  : Mahmoud Alzarroug
 * @doc     : http://www.mahmoudz.com/
 * @date    : 2015-02-14
 * @version : 1.0.0
 *
 */

$.fn.kalendar = function(options) {
  
	// a functin to convert SQL date string to JS date obj
	function getDate(str) {
		if (str) {
			str = str.replace(/\-/g,'/');
			return new Date(str);
		} else return new Date();
	}
	// push CSS to DOM
	$('body').prepend('<style>.calendar-day-box{position:relative;width:14%;height:100px;margin-bottom:0px;display:inline-block;border-right:solid 1px #ccc;border-bottom:solid 1px #ccc;overflow:hidden;background-color:#fff;}.calendar-day-box-selected{position:absolute;display:inline-block;border:solid 1px #DDD;background-color:#fff;z-index:1000;padding:5px 5px 25px;margin:-5px;box-shadow:1px 0 10px #AAA}.calendar-day-tag{bottom:1px;right:1px;position:absolute;font-size:16px}.calendar-more-tag{bottom:0;left:3px;display:none;position:absolute;font-size:14px;cursor:pointer}.calendar{border-left:solid 1px #ccc;margin-top:10px}.calendar-filler-day{background-color:#F5F5F5}.calendar-day-header{background-color:#fff;height:50px;font-weight:700;text-align:center;border-top:solid 1px #ccc;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;margin-buttom:0;position:relative;width:14%;display:inline-block}.calendar-event{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;margin:3px 5px;}.calendar-today {background-color: #FEFFE5;}</style>');
	
	// replace current calendar
	$(this).find('.calendar').remove();
	
	// config init
	var container = $('<div class="calendar"></div>');
	if (typeof options == "undefined") {var options = {}}
	if (!options['date'] || options['date'].indexOf('-')<0) options['date'] = new Date().getFullYear() + '-' + (new Date().getMonth()+1);
	if (!options['labels'] || options['labels'].length < 7) options['labels'] = ["Sun", "Mon", "Tue", "Wed", "Thur", "Friday", "Sat"];
	if (typeof options['showToday'] == "undefined") options['showToday'] = true;
	var month = options['date'].split('-')[1];
	var padDays = getDate(options['date']+'-01').getDay();
	var now = new Date();
	
	for (var i=0; i<7; i++) // Headers
		container.append('<div class="calendar-day-header">'+options['labels'][i]+'</div>');
	for (var i=0; i<padDays; i++) // filler days. eg: days from previous month
		container.append('<div class="calendar-day-box calendar-filler-day"></div>');
	for (var i=1; i<=31; i++) { // displaying days grid
		var thisDate = getDate(options['date']+'-'+("0"+i).slice(-2));
		if (thisDate.getMonth()+1 == month)
			container.append('<div class="calendar-day-box'+ (options['showToday'] && thisDate.getDate()==now.getDate() && thisDate.getMonth()==now.getMonth()?' calendar-today':'') +' calendar-'+i+'"><span class="calendar-more-tag">+<span>0</span> more</span><span class="calendar-day-tag">'+i+'</span></div>');
	}
	
	// displaying events
	if ( options['events'] && $.isArray(options['events']) ) { // display events
		// $.each is slow, but needed for attaching events to elements
		$.each(options['events'], function(i, a) {
			var event = $('<div title="'+a.title.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '')+'" class="calendar-event '+ (a.classes?a.classes:'') +'">'+a.title+'</div>').click(options['onEventClick']?function() {options['onEventClick'](a)}:function(){});
			eventsCount = container.find('.calendar-'+a.day+' .calendar-event').length;
			
			// display "more" button instead
			if (eventsCount > 2) {
				if (eventsCount == 3) {
					container.find('.calendar-'+a.day+' .calendar-more-tag').show().click(function(){
						var box = $(this).parent().clone().hide();
						box.addClass('calendar-day-box-selected').removeClass('calendar-day-box').find('.calendar-more-tag').hide();
						box.find('.calendar-event').show();
						box.mouseleave(function(){$(this).fadeOut('fast', function(){$(this).remove()})});
						box.insertBefore($(this).parent()).show('fast');
					});
				}
				container.find('.calendar-'+a.day+' .calendar-more-tag span').text( eventsCount - 2 );
				event.addClass('hide');
			}
			container.find('.calendar-'+a.day).append(event);
		});
	}
	$(this).append(container);
}
