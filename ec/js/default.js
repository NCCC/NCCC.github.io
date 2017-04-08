// Default JavaScript Functions and Initiations

// Load Custom Google Font
WebFont.load({
  google: {
    families: ['Ubuntu:300,400,500,700', 'Montserrat:400,700']
  }
});

// Logo Animation
$svg = $('.logo > svg').drawsvg({
  duration: 1500,
  callback: function() {
    $('.logo').addClass('active');
  }
});

function animateLogo() {
  $svg.drawsvg('animate');  
}

animateLogo();


// Swipe Controls for Carousel
$('.carousel').swiperight(function() {
  $(this).carousel('prev');
});
$('.carousel').swipeleft(function() {
  $(this).carousel('next');
});

// Google Map
function googleMap() {
  var map = document.getElementById('google-map');

  var map_options = {
    center: new google.maps.LatLng(59.486599,17.569076),
    scrollwheel: false,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(map, map_options)

  // Map Marker
  var myLatlng = new google.maps.LatLng(59.486599,17.569076);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: 'img/location-pin.svg'
  });
}
google.maps.event.addDomListener(window, 'load', googleMap);

// Countdown
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    if(t.total < 0) {
      var timeToEndOfCamp = getTimeRemaining(endOfCamp);
      if(timeToEndOfCamp.total <= 0) {
        showMessage('Easter Camp is over for this year, hope to see you again next year!');
      } else {
        showMessage('Easter Camp 2017 is on! Are you there? :-)');
      }
    } else {
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function showMessage(msg) {
  var clock = document.getElementById(clockdiv);
  clock.innerHTML = '<h2>' + msg + '</h2>';
}

// If today is before registration deadline, countdown to registration
// If today is after registration deadline, countdown to camp start
// If today is between camp dates, show "Easter Camp 2017 is on! See you there!"
// If today is after camp, countdown to next Easter
var deadline = new Date(Date.parse("2017-04-14 18:00"));
var endOfCamp = new Date(Date.parse("2017-04-17 12:30"));
var clockdiv = 'clockdiv';
initializeClock(clockdiv, deadline);