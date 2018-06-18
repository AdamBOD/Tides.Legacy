var longitude = 0;
var latitude = 0;
var lowTideTime;
var highTideTime;
var windData;
var windDirection = '';
var swipeIndex = 0;
var maxSwipeIndex = 0;

$(document).ready (() => {
    init ();
});

function init () {
    maxSwipeIndex = $('#dataContainer .container-fluid.app-data').length - 1;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
            longitude = data.coords.longitude;
            latitude = data.coords.latitude;
            console.log (`Longitude: ${longitude} Latitude: ${latitude}`);
            
            $.ajax ({
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAbsryLwpbZaIvaqiIFP2RjioatW8VdAQo`,
                success: (data) => {
                    console.log (data);
                    $('.location').html (data.results[3].formatted_address);
                },
                error: (data) => {
                    console.log (data);
                    $('.location').html ('Location unavailable');
                }
            });

            $.ajax({
                url: `https://www.worldtides.info/api?extremes&lat=${latitude}&lon=${longitude}&key=611e7ad2-9684-49e0-ac23-8875a5f7f218`,
                success: (data) => {
                    console.log (data)
                    if (data.extremes[0].date !== NaN) {
                        if (data.extremes[0].type === 'High') {
                            highTideTime = new Date (data.extremes[0].date.replace(/\s/, 'T'));
                            $('.highTide').html ((highTideTime.getHours()<10?'0':'') + highTideTime.getHours() + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
                        }
                        else {
                            lowTideTime = new Date (data.extremes[0].date.replace(/\s/, 'T'));
                            $('.lowTide').html ((lowTideTime.getHours()<10?'0':'') + lowTideTime.getHours() + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
                        }
            
                        if (data.extremes[1].type == 'Low') {
                            lowTideTime = new Date (data.extremes[1].date.replace(/\s/, 'T'));
                            $('.lowTide').html ((lowTideTime.getHours()<10?'0':'') + lowTideTime.getHours() + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
                        }
                        else {
                            highTideTime = new Date (data.extremes[1].date.replace(/\s/, 'T'));
                            $('.highTide').html ((highTideTime.getHours()<10?'0':'') + highTideTime.getHours() + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
                        }
            
                        calculateHeight (new Date (), lowTideTime, highTideTime);
                    }
                    else {
                        $('.highTide').html ("Error getting tide data.");
                    }
                },
                error: (data) => {
                    $('.highTide').html (data);
                }
            });

            $.ajax ({
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=7a7717be990224fd580855c23fa8b3b5&units=metric`,
                success: (data) => {
                    console.log (data);
                    windData = data.wind;
                    if (windData.deg >= 348.75 && windData.deg < 11.25) {
                        windDirection = 'N';
                    }
                    else if (windData.deg >= 11.25 && windData.deg < 33.75) {
                        windDirection = 'NNE';
                    }
                    else if (windData.deg >= 33.75 && windData.deg < 56.25) {
                        windDirection = 'NE';
                    }
                    else if (windData.deg >= 56.25 && windData.deg < 78.75) {
                        windDirection = 'ENE';
                    }
                    else if (windData.deg >= 78.75 && windData.deg < 101.25) {
                        windDirection = 'E';
                    }
                    else if (windData.deg >= 101.25 && windData.deg < 123.75) {
                        windDirection = 'ESE';
                    }
                    else if (windData.deg >= 123.75 && windData.deg < 146.25) {
                        windDirection = 'SE';
                    }
                    else if (windData.deg >= 146.25 && windData.deg < 168.75) {
                        windDirection = 'SSE';
                    }
                    else if (windData.deg >= 168.75 && windData.deg < 191.25) {
                        windDirection = 'S';
                    }
                    else if (windData.deg >= 191.25 && windData.deg < 213.75) {
                        windDirection = 'SSW';
                    }
                    else if (windData.deg >= 213.75 && windData.deg < 236.25) {
                        windDirection = 'SW';
                    }
                    else if (windData.deg >= 236.25 && windData.deg < 258.75) {
                        windDirection = 'WSW';
                    }
                    else if (windData.deg >= 258.75 && windData.deg < 281.25) {
                        windDirection = 'W';
                    }
                    else if (windData.deg >= 281.25 && windData.deg < 303.75) {
                        windDirection = 'WNW';
                    }
                    else if (windData.deg >= 303.75 && windData.deg < 326.25) {
                        windDirection = 'NW';
                    }
                    else if (windData.deg >= 326.25 && windData.deg < 348.75) {
                        windDirection = 'NNE';
                    }
                    else {
                        windDirection = windData.deg.toString();
                    }
                    console.log (windDirection)
                    $('.windDirection').html(windDirection);
                    $('.windSpeed').html(`${windData.speed}m/s`);
                },
                error: (error) => {
                    console.log (error);
                }
            });
        }, (data) => {
            console.log ("Error: Couldn't get user location")
            $('.location').html ('Location unavailable');
            $('.highTide').html ('--:--');
            $('.lowTide').html ('--:--');
            return
        });
    }
    else {
        $('.location').html ('Location unavailable');
        $('.highTide').html ('--:--');
        $('.lowTide').html ('--:--');
    }

    initSwipe ();
}

function initSwipe () {
    var dataContainer = document.getElementById ('dataContainer');
    var mc = new Hammer (dataContainer);

    mc.on('swipeleft swiperight', (ev) => {
        var leftAdjustment = $('.container-fluid.app-data').width();
        console.log (`Event Type: ${ev.type} SwipeIndex: ${swipeIndex} Max Swipe: ${maxSwipeIndex}`);
        if (ev.type === 'swipeleft' && swipeIndex >= 0 && swipeIndex < maxSwipeIndex) {
            $('.container-fluid.app-data').animate({left: `-=${leftAdjustment}`}, 500, () => {
                if (swipeIndex === 1 && windData) {
                    $('.windDirectionIcon').addClass ('positionSet');
                    $('.windDirectionIcon.positionSet').css('-webkit-transform',`rotate(${180 + windData.deg}deg)`); 
                    $('.windDirectionIcon.positionSet').css('-moz-transform',`rotate(${180 + windData.deg}deg)`);
                    $('.windDirectionIcon.positionSet').css('transform',`rotate(${180 + windData.deg}deg)`);
                }  
            });
            swipeIndex ++;
        }
        else if (ev.type === 'swiperight' && swipeIndex > 0 && swipeIndex <= maxSwipeIndex) {
            $('.container-fluid.app-data').animate({left: `+=${leftAdjustment}`}, 500);
            swipeIndex --;
        }
    });
}

function calculateHeight (currentTime, nextLowTide, nextHighTide) {
    var percentage;
    if (nextLowTide < currentTime) {
        console.log ("Low tide is less");
        let currentTideTime = Math.abs(currentTime - lowTideTime);
        percentage = (currentTideTime / 22200000) * 100;
        //$('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${100 - percentage}%), cadetblue ${100 - percentage}%)`);
    }
    else if (nextLowTide > currentTime && currentTime > nextHighTide) {
        console.log ("High tides");
        let currentTideTime = Math.abs(currentTime - highTideTime);
        percentage = (currentTideTime / 22200000) * 100;
        console.log (percentage)
        // $('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${percentage}%, cadetblue ${100 - percentage}%)`);
    }
    $('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${percentage}%, cadetblue ${100 - percentage}%)`);
}