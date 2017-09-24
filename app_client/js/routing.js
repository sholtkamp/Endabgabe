// Initializing routing control
control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    router: L.Routing.mapbox('pk.eyJ1Ijoibm9jZW9uIiwiYSI6ImNpenpwc3N0aTAyNWIycWxqdG54NnpxOWUifQ.gjSEXP47NeZUiVF0_T9kXQ')
}).addTo(map);
logger.info("Control is ready");

// Initializing global variable coord_array used for stages
coord_array = [];

/**
 * Function started as route is constructed
 * extracts coordinates from the route for the stage_GeoJSON
 * bilds wikipedia URL und queries it
 */
control.on('routeselected', function (e) {

    coord_array.length = 0; // clears the global variable coord_array to allow constructing multiple stages in one map

    logger.info("You selected a route");
    var route = e.route;

    // puts route info into global array
    function storeCoordinate(lat, long) {
        coord_array.push([long, lat]);
    }

    //iterates over routes info to push into global coord_array
    for (i = 0; i <= route.coordinates.length - 1; i++) {
        var lat = route.coordinates[i].lat;
        var long = route.coordinates[i].lng;
        storeCoordinate(lat, long);
    }


    var start_wp = (control.getWaypoints()[0]); //returns starting waypoint info
    document.getElementById("s_start_place").value = start_wp.name.split(",", 1); //sets the city name in the form

    logger.info("Start WP name is: " + start_wp.name.split(",", 1) + ", looking it up for you.");
    var start_query = "http://en.wikipedia.org/wiki/" + start_wp.name.split(",", 1);
    var s_title = start_query.split("/");
    s_title = s_title[s_title.length - 1];

    //Source: http://jsfiddle.net/gautamadude/HMJJg/1/
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&prop=exintro=true&page=" + s_title + "&prop=text&section=0&format=json&callback=?", function (data) {
        try {
            for (text in data.parse.text) {
                var text = data.parse.text[text].split("<p>");
                var pText = "";

                for (p in text) {
                    //Remove html comment
                    text[p] = text[p].split("<!--");
                    if (text[p].length > 1) {
                        text[p][0] = text[p][0].split(/\r\n|\r|\n/);
                        text[p][0] = text[p][0][0];
                        text[p][0] += "</p> ";
                    }
                    text[p] = text[p][0];

                    //Construct a string from paragraphs
                    if (text[p].indexOf("</p>") == text[p].length - 5) {
                        var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
                        var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
                        for (newline in splitNewline) {
                            if (splitNewline[newline].substring(0, 11) != "Cite error:") {
                                pText += splitNewline[newline];
                                pText += "\n";
                            }
                        }
                    }
                }
                pText = pText.substring(0, pText.length - 2); //Remove extra newline
                pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)

                var s_first = pText.split("\n", 1); // Leaves only the first paragraph
                document.getElementById("s_start_wiki").value = s_first;
            }
        }
        catch (err) {
            logger.info("There is no Wikipedia entry for: " + start_wp.name.split(",", 1));
        }
    });

    var finish_wp = (control.getWaypoints()[control.getWaypoints().length - 1]); // returns finish waypoint info
    document.getElementById("s_finish_place").value = finish_wp.name.split(",", 1); //sets the city name in the form

    logger.info("Finish WP name is: " + finish_wp.name.split(",", 1) + ", looking it up for you.");
    var finish_query = "http://en.wikipedia.org/wiki/" + finish_wp.name.split(",", 1);
    var f_title = finish_query.split("/");
    f_title = f_title[f_title.length - 1];

    //Source: http://jsfiddle.net/gautamadude/HMJJg/1/
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&prop=exintro=true&page=" + f_title + "&prop=text&section=0&format=json&callback=?", function (data) {
        try {
            for (text in data.parse.text) {
                var text = data.parse.text[text].split("<p>");
                var pText = "";

                for (p in text) {
                    //Remove html comment
                    text[p] = text[p].split("<!--");
                    if (text[p].length > 1) {
                        text[p][0] = text[p][0].split(/\r\n|\r|\n/);
                        text[p][0] = text[p][0][0];
                        text[p][0] += "</p> ";
                    }
                    text[p] = text[p][0];

                    //Construct a string from paragraphs
                    if (text[p].indexOf("</p>") == text[p].length - 5) {
                        var htmlStrip = text[p].replace(/<(?:.|\n)*?>/gm, '') //Remove HTML
                        var splitNewline = htmlStrip.split(/\r\n|\r|\n/); //Split on newlines
                        for (newline in splitNewline) {
                            if (splitNewline[newline].substring(0, 11) != "Cite error:") {
                                pText += splitNewline[newline];
                                pText += "\n";
                            }
                        }
                    }
                }
                pText = pText.substring(0, pText.length - 2); //Remove extra newline
                pText = pText.replace(/\[\d+\]/g, ""); //Remove reference tags (e.x. [1], [4], etc)

                var f_first = pText.split("\n", 1); // Leaves only the first paragraph
                document.getElementById("s_finish_wiki").value = f_first;
            }
        }
        catch (err) {
            logger.info("There is no Wikipedia entry for: " + finish_wp.name.split(",", 1));
        }
    });

    logger.info("Your route was added to the form");
});


