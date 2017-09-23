var feature_GeoJSON;
var stage_GeoJSON;

function set_place(){
    map.on('click', function(e) {
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
    var name = document.getElementById("name").value;
    var cat = document.getElementById("cat").value;
    var att1 = document.getElementById("att1").value;
    var val1 = document.getElementById("val1").value;
    var att2 = document.getElementById("att2").value;
    var val2 = document.getElementById("val2").value;
    var att3 = document.getElementById("att3").value;
    var val3 = document.getElementById("val3").value;


    //noinspection JSAnnotator
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
            "name": name,
            "category": cat,
            "attributes": {
                [att1]: val1,
                [att2]: val2,
                [att3]: val3
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
    function addNewLayer() {

        var marker_feature = L.geoJSON(feature_GeoJSON).addTo(map);
        marker_feature.bindPopup(name + "<br><br>" + "Category: " + cat + "<br>" + att1 + ": " + val1 + "<br>" + att2 + ": " + val2 + "<br>" + att3 + ": " + val3).openPopup();
        map.fitBounds(marker_feature.getBounds());

        layerControl.addOverlay(marker_feature, feature_GeoJSON.properties.name);

    }
}

function build_stage_JSON() {

    /**
     * Fetching form data
     */
    var s_name = document.getElementById("s_name").value;
    var start = document.getElementById("s_start_place").value;
    var s_start_lat = document.getElementById("s_start_lat").value;
    var s_start_long = document.getElementById("s_start_long").value;
    var finish = document.getElementById("s_finish_place").value;
    var s_finish_lat = document.getElementById("s_finish_lat").value;
    var s_finish_long = document.getElementById("s_finish_long").value;
    var s_start_date = document.getElementById("s_start_date").value;
    var s_finish_date = document.getElementById("s_finish_date").value;
    var s_link = document.getElementById("s_link").value;
    var s_start_up = document.getElementById("s_start_up").value;
    var s_finish_up = document.getElementById("s_finish_up").value;

    /**
     * building GeoJSON with formdata
     * @type {{type: string, geometry: {type: string, coordinates: [*]}, properties: {name, category}}}
     */
    stage_GeoJSON = {

        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates":    [[s_start_lat, s_start_long],
                [s_finish_lat, s_finish_long]]
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
    logger.info(stage_GeoJSON);
    logger.info("was built");

    addNewStageLayer(stage_GeoJSON);

    /**
     * Builds Markers for the stage_GeoJSON and places it on the map in a new Layer
     */
    function addNewStageLayer() {

        var newLayer = L.geoJSON(stage_GeoJSON).addTo(map);


        layerControl.addOverlay(newLayer, stage_GeoJSON.properties.name);

    }
}

