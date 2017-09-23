// Initializing routing control
control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim(),
    router: L.Routing.mapbox('pk.eyJ1Ijoibm9jZW9uIiwiYSI6ImNpenpwc3N0aTAyNWIycWxqdG54NnpxOWUifQ.gjSEXP47NeZUiVF0_T9kXQ')
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
    var s_title = start_query.split("/");
    s_title = s_title[s_title.length - 1];

    //Source: http://jsfiddle.net/gautamadude/HMJJg/1/
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&prop=exintro=true&page=" + s_title + "&prop=text&section=0&format=json&callback=?", function (data) {

        var s_first = "";

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
            console.log("s_title was used: ");
            console.log(s_first);

            document.getElementById("s_start_wiki").value = s_first;
        }
    });


    var finish_wp = (control.getWaypoints()[control.getWaypoints().length - 1]); // returns finish waypoint info
    document.getElementById("s_finish_place").value = finish_wp.name.split(",", 1); //sets the city name in the form
    document.getElementById("s_finish_lat").value = finish_wp.latLng.lat; //adds lat to form
    document.getElementById("s_finish_long").value = finish_wp.latLng.lng; //adds long to form

    logger.info("Finish WP name is: " + finish_wp.name.split(",", 1) + " Looking it up for you.");
    var finish_query = "http://en.wikipedia.org/wiki/" + finish_wp.name.split(",", 1);
    var f_title = finish_query.split("/");
    f_title = f_title[f_title.length - 1];

    //Source: http://jsfiddle.net/gautamadude/HMJJg/1/
    $.getJSON("http://en.wikipedia.org/w/api.php?action=parse&prop=exintro=true&page=" + f_title + "&prop=text&section=0&format=json&callback=?", function (data) {
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
            console.log("f_title was used: ");
            console.log(f_first);

            document.getElementById("s_finish_wiki").value = f_first;
        }
    });
    logger.info("Your route was added to the form");
});

// console.log(route.coordinates);
