# kalendar
A light-weight jQuery Calendar plugin

# How to use
var events = [
		   {
		    "title": "Meeting with Jane Do", // Mandatory
		    "day":7, // Mandatory: day of the month (1-31)
		    "classes":"colorBlue", // optional: css classes for the event
		    },
		    {
		    "title": "Dentist appointment. Ouch!",
		    "day":15,
		    },
		    {
		    "title": "Meet in-laws!",
		    "day":17,
		    },
		    {
		    "title": "Get groceries..",
		    "day":17,
		    },
		    {
		    "title": "Cook dinner",
		    "day":17,
		    },
		    {
		    "title": "bleh",
		    "day":17,
		    }
		];
$('#container').kalendar({events: events});

# Available options
## Custome days
$('#container').kalendar({events: events, labels: ["dies Solis", "dies Lunae", "dies Martis", "dies Mercurii", "dies Jovis", "dies Veneris", "dies Saturni"]});

## a specific date
$('#container').kalendar({events: events, date: '2015-01'});

## attaching click event when clicking on a calendar event
$('#container').kalendar({events: events, date: '2015-01', onEventClick: function(a) { alert(a.title); } });
