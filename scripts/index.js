$(document).ready (() => {
    longitude = 0;
    latitude = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
            longitude = data.coords.longitude;
            latitude = data.coords.latitude;
            console.log (`Longitude: ${longitude} Latitude: ${latitude}`);
            
            $.ajax ({
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAC148-4ycwCA5I7sc7TXISife7BObCRuk`,
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
                            // if (data.extremes[0].date != NaN) {
                            //     if (data.extremes[0].type == 'High') {
                            //         //document.querySelector ('highTide').innerHTML = data.extremes[0].date;
                            //         highTideTime = new Date (data.extremes[0].date)
                            //         $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
                            //     }
                            //     else {
                            //         //document.querySelector ('lowTide').innerHTML = data.extremes[0].date;
                            //         lowTideTime = new Date (data.extremes[0].date)
                            //         $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
                            //     }
                    
                            //     if (data.extremes[1].type == 'Low') {
                            //         //document.querySelector ('lowTide').innerHTML = data.extremes[1].date;
                            //         lowTideTime = new Date (data.extremes[1].date)
                            //         $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
                            //     }
                            //     else {
                            //         //document.querySelector ('highTide').innerHTML = data.extremes[1].date;
                            //         highTideTime = new Date (data.extremes[1].date)
                            //         $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
                            //     }
                    
                            //     calculateHeight (new Date (), lowTideTime, highTideTime);
                            // }
                            // else {
                            //     $('.highTide').html ("Error getting tide data.");
                            // }
                            //$('.highTide').html (data.extremes[0].date.toString());
                            if (data.extremes[0].date != NaN) {
                                if (data.extremes[0].type == 'High') {
                                    //document.querySelector ('highTide').innerHTML = data.extremes[0].date;
                                    highTideTime = new Date (data.extremes[0].date.replace(/\s/, 'T'))
                                    $('.highTide').html (highTideTime.getHours() + ":" +  highTideTime.getMinutes());
                                }
                                else {
                                    //document.querySelector ('lowTide').innerHTML = data.extremes[0].date;
                                    lowTideTime = new Date (data.extremes[0].date.replace(/\s/, 'T'))
                                    $('.lowTide').html (lowTideTime.getHours() +  ":" + lowTideTime.getMinutes());
                                }
                    
                                if (data.extremes[1].type == 'Low') {
                                    //document.querySelector ('lowTide').innerHTML = data.extremes[1].date;
                                    lowTideTime = new Date (data.extremes[1].date.replace(/\s/, 'T'))
                                    $('.lowTide').html (lowTideTime.getHours() + ":" + lowTideTime.getMinutes());
                                }
                                else {
                                    //document.querySelector ('highTide').innerHTML = data.extremes[1].date;
                                    highTideTime = new Date (data.extremes[1].date.replace(/\s/, 'T'))
                                    $('.highTide').html (highTideTime.getHours() + ":" + highTideTime.getMinutes());
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
            return
        });
    }
    else {
        $('.location').html ('Location unavailable');
    }

    dateTime = new Date();
    //document.querySelector ('time').innerHTML = dateTime
    // $('.time').html (`${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} ${(dateTime.getHours()<10?'0':'') + dateTime.getHours()}:${(dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes()}`)

    //.done(function(data) {
    //       console.log (data)
    //         if (data.extremes[0].type == 'High') {
    //             //document.querySelector ('highTide').innerHTML = data.extremes[0].date;
    //             highTideTime = new Date (data.extremes[0].date)
    //             $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
    //         }
    //         else {
    //             //document.querySelector ('lowTide').innerHTML = data.extremes[0].date;
    //             lowTideTime = new Date (data.extremes[0].date)
    //             $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
    //         }

    //         if (data.extremes[1].type == 'Low') {
    //             //document.querySelector ('lowTide').innerHTML = data.extremes[1].date;
    //             lowTideTime = new Date (data.extremes[1].date)
    //             $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
    //         }
    //         else {
    //             //document.querySelector ('highTide').innerHTML = data.extremes[1].date;
    //             highTideTime = new Date (data.extremes[1].date)
    //             $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
    //         }

    //         calculateHeight (new Date (), lowTideTime, highTideTime);
    //     });
    //     .fa
})

function calculateHeight (currentTime, nextLowTide, nextHighTide) {
    if (nextLowTide < currentTime) {
        console.log ("Low tide is less");
        currentTideTime = Math.abs(currentTime - lowTideTime);
        percentage = (currentTideTime / 22200000) * 100;
        //$('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${100 - percentage}%), cadetblue ${100 - percentage}%)`);
    }
    else if (nextLowTide > currentTime && currentTime > nextHighTide) {
        console.log ("High tides");
        currentTideTime = Math.abs(currentTime - highTideTime);
        percentage = (currentTideTime / 22200000) * 100;
        console.log (percentage)
        // $('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${percentage}%, cadetblue ${100 - percentage}%)`);
    }
    $('.data').css ('background', `linear-gradient(to top, #5f9ecf ${percentage}%, cadetblue ${percentage}%, cadetblue ${100 - percentage}%)`);
}