// Initializing routing control
control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);

logger.info("Control is ready");


control.on('routeselected', function(e) {

    logger.info("You selected a route");

    var start_wp = (control.getWaypoints()[0]); //returns starting waypoint info
    document.getElementById("s_start_place").value = start_wp.name.split(",", 1); //sets the city name in the form
    document.getElementById("s_start_lat").value = start_wp.latLng.lat; //adds lat to form
    document.getElementById("s_start_long").value = start_wp.latLng.lng; //adds long to form

    logger.info("Start WP name is: " + start_wp.name.split(",", 1) + " Looking it up for you.");
    var start_query = "http://en.wikipedia.org/wiki/" + start_wp.name.split(",", 1);
    queryWiki(start_query)
        .then(function (data) {
            console.log(data);
        });

    var finish_wp = (control.getWaypoints()[control.getWaypoints().length - 1]); // returns finish waypoint info
    document.getElementById("s_finish_place").value = finish_wp.name.split(",", 1); //sets the city name in the form
    document.getElementById("s_finish_lat").value = finish_wp.latLng.lat; //adds lat to form
    document.getElementById("s_finish_long").value = finish_wp.latLng.lng; //adds long to form

    logger.info("Finish WP name is: " + finish_wp.name.split(",", 1) + " Looking it up for you.");
    var finish_query = "http://en.wikipedia.org/wiki/" + finish_wp.name.split(",", 1);
    queryWiki(finish_query);


    logger.info("Your route was added to the form");
});

// console.log(route.coordinates); to get every coordinate pair in the route

// routeControl.getPlan().setWaypoints([]); to clear the route
