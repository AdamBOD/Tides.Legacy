$(document).ready (() => {
    longitude = 0;
    latitude = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
            longitude = data.coords.longitude;
            latitude = data.coords.latitude;
        });
    }
    else {
        $('.location').html ('Location unavailable')
        console.log ()
    }

    dateTime = new Date();
    //document.querySelector ('time').innerHTML = dateTime
    $('.time').html (`${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} ${dateTime.getHours()}:${(dateTime.getMinutes()<10?'0':'') + dateTime.getMinutes()}`)

    $.ajax({
        url: `https://www.worldtides.info/api?extremes&lat=${latitude}&lon=${longitude}&key=611e7ad2-9684-49e0-ac23-8875a5f7f218`
      }).done(function(data) {
          console.log (data)
            if (data.extremes[0].type == 'High') {
                //document.querySelector ('highTide').innerHTML = data.extremes[0].date;
                highTideTime = new Date (data.extremes[0].date)
                $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
            }
            else {
                //document.querySelector ('lowTide').innerHTML = data.extremes[0].date;
                lowTideTime = new Date (data.extremes[0].date)
                $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
            }

            if (data.extremes[1].type == 'Low') {
                //document.querySelector ('lowTide').innerHTML = data.extremes[1].date;
                lowTideTime = new Date (data.extremes[1].date)
                $('.lowTide').html (lowTideTime.getHours() + 1 + ":" + (lowTideTime.getMinutes()<10?'0':'') + lowTideTime.getMinutes());
            }
            else {
                //document.querySelector ('highTide').innerHTML = data.extremes[1].date;
                highTideTime = new Date (data.extremes[1].date)
                $('.highTide').html (highTideTime.getHours() + 1 + ":" + (highTideTime.getMinutes()<10?'0':'') + highTideTime.getMinutes());
            }

            calculateHeight (new Date (), lowTideTime, highTideTime);
        });
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