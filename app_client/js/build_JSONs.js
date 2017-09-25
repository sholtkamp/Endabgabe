var feature_GeoJSON;
var stage_GeoJSON;

/**
 * Used to gather coordinates on map per click
 */
function set_place() {

    map.on('click', function (e) {
        document.getElementById("lat").value = e.latlng.lat;
        document.getElementById("long").value = e.latlng.lng;
    });
}

function build_GeoJSON() {

    /**
     * Fetching form data
     */
    var lat = document.getElementById("lat").value;
    var long = document.getElementById("long").value;
    var cat = document.getElementById("cat").value;
    var val1 = document.getElementById("val1").value;
    var val2 = document.getElementById("val2").value;
    var val3 = document.getElementById("val3").value;


    /**
     * building GeoJSON with formdata
     * @type {{type: string, geometry: {type: string, coordinates: [*]}, properties: {name, category}}}
     */
    feature_GeoJSON = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [lat, long]
        },
        "properties": {
            "category": cat,
            "attributes": {
                "name": val1,
                "price": val2,
                "capacity": val3
            }
        }
    };

    logger.info("build_GeoJSON was called");
    console.log(feature_GeoJSON);
    logger.info("was built");

    addNewLayer(feature_GeoJSON);

    /**
     * Builds a Marker for the geo_JSON and places it on the map in a new Layer
     */
    function addNewLayer(JSON) {

        var mark_lat = (JSON.geometry.coordinates[0]);
        var mark_lng = (JSON.geometry.coordinates[1]);
        console.log(mark_lat);
        console.log(mark_lng);

        var marker_feature = L.marker([mark_lat, mark_lng]);
        feature_group.addLayer(marker_feature);
        marker_feature.bindPopup("Name: " + JSON.properties.attributes.name + "<br><br>" +
            "Category: " + JSON.properties.category + "<br>" +
            "Price: " + JSON.properties.attributes.price + "<br>" +
            "Capacity: " + JSON.properties.attributes.capacity).openPopup();
        // map.fitBounds(marker_feature.getBounds());

        layerControl.addOverlay(marker_feature, JSON.properties.attributes.name);
    }
}

function build_stage_JSON() {

    /**
     * Fetching form data
     */
    var s_name = document.getElementById("s_name").value;
    var start = document.getElementById("s_start_place").value;
    var finish = document.getElementById("s_finish_place").value;
    var s_start_date = document.getElementById("s_start_date").value;
    var s_finish_date = document.getElementById("s_finish_date").value;
    var s_link = document.getElementById("s_link").value;
    var s_start_up = document.getElementById("s_start_up").value;
    var s_finish_up = document.getElementById("s_finish_up").value;

    /**
     * building GeoJSON with formdata
     */
    stage_GeoJSON = {

        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": coord_array,
        },
        "properties": {
            "name": s_name,
            "start": start,
            "finish": finish,
            "start_date": s_start_date,
            "finish_date": s_finish_date,
            "link": s_link,
            "start_pic": s_start_up,
            "finish_pic": s_finish_up

        }
    };
    logger.info("build_stage_GeoJSON was called");
    console.log(stage_GeoJSON);
    logger.info("was built");

    addNewStageLayer(stage_GeoJSON);

    /**
     * Builds Markers for the stage_GeoJSON and places it on the map in a new Layer
     */
    function addNewStageLayer(JSON) {

        var stage = L.geoJSON(JSON);

        try {
            //builds wiki marker for start
            var s_lat = (coord_array[0][0]);
            var s_lng = (coord_array[0][1]);
            var s_latlng = L.latLng(s_lng, s_lat);
            var s_marker = L.marker(s_latlng);
            s_marker.bindPopup(start_wiki.toString());
        }
        catch (err) {
            console.log("Nor marker added for start");
        }

       try {

           //builds wiki marker for finish
           var f_lat = (coord_array[coord_array.length - 1][0]);
           var f_lng = (coord_array[coord_array.length - 1][1]);
           var f_latlng = L.latLng(f_lng, f_lat);
           var f_marker = L.marker(f_latlng);
           f_marker.bindPopup(finish_wiki.toString());
       }
       catch (err) {
           console.log("Nor marker added for finish");
       }

        // builds layergroup for route and its markers
        var stage_group = L.layerGroup([stage, s_marker, f_marker]).addTo(map);
        // feature_group.addLayer(stage_group);
        layerControl.addOverlay(stage_group, JSON.properties.name);

        // Clears Route
        control.getPlan().setWaypoints([]);
    }
}

