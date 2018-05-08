$(document).ready (() => {
    longitude = 0;
    latitude = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
            longitude = data.coords.longitude;
            latitude = data.coords.latitude;
        });
    }

    dateTime = new Date();
    //document.querySelector ('time').innerHTML = dateTime
    $('.time').html (`${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`)

    $.ajax({
        url: `https://www.worldtides.info/api?extremes&lat=${latitude}&lon=${longitude}&key=611e7ad2-9684-49e0-ac23-8875a5f7f218`
      }).done(function(data) {
            if (data.extremes[0].type == 'High') {
                //document.querySelector ('highTide').innerHTML = data.extremes[0].date;
                dateTime = new Date (data.extremes[0].date)
                $('.highTide').html (dateTime.getHours() + 1 + ":" + (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes());
            }
            else {
                //document.querySelector ('lowTide').innerHTML = data.extremes[0].date;
                dateTime = new Date (data.extremes[0].date)
                $('.lowTide').html (dateTime.getHours() + 1 + ":" + (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes());
            }

            if (data.extremes[1].type == 'Low') {
                //document.querySelector ('lowTide').innerHTML = data.extremes[1].date;
                dateTime = new Date (data.extremes[1].date)
                $('.lowTide').html (dateTime.getHours() + 1 + ":" + (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes());
            }
            else {
                //document.querySelector ('highTide').innerHTML = data.extremes[1].date;
                dateTime = new Date (data.extremes[1].date)
                $('.highTide').html (dateTime.getHours() + 1 + ":" + (dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes());
            }
        });
})

function calculateHeight (currentTime, nextHighTide) {
    
}