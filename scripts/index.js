var longitude = 0;
var latitude = 0;
var lowTideTime;
var highTideTime;

$(document).ready (() => {
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
})

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