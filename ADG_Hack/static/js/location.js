/**
 * Created by rahul on 4/17/16.
 */

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(successFunction,errorFunction);
}
else{
    alert("Geolocation ain't enabled");
}

function successFunction(position){
    var lat=position.coords.latitude;
    var long=position.coords.longitude;
    console.log("Latitude:"+lat+"<br>Longitude:"+long);
    var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyDIWKEbTDAQJxQtecEvP6FqGimcpjWVGRo";
    console.log(geocodingAPI);
    $.getJSON(geocodingAPI, function (json) {
        if (json.status == "OK") {
            //Check result 0
            var result = json.results[0];
            //look for locality tag and administrative_area_level_1
            var street="";
            var place="";
            var city = "";
            var state = "";
            for (var i = 0, len = result.address_components.length; i < len; i++) {
                var ac = result.address_components[i];
                if (ac.types.indexOf("route") >=0) street =ac.short_name;
                if (ac.types.indexOf("sublocality_level_1")>=0) place=ac.short_name;
                if (ac.types.indexOf("locality") >= 0) city = ac.short_name;
                if (ac.types.indexOf("administrative_area_level_1")>=0) state=ac.short_name;
            }
            if (state != '') {
                console.log("Successfully obtained values from Google Maps APIs");
                document.getElementById("location").value = street+","+","+place+","+city+","+state;
            }
        }

    });
}

function errorFunction(position){
    console.log("Error!");
    alert("Turn on location services for a while and refresh the page to avoid manually entering data.");
};