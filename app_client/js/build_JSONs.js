var feature_GeoJSON;
var stage_GeoJSON;

function build_JSON() {

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
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [lat, long]
        },
        properties: {
            name: name,
            category: cat,
            attributes:{
                [att1]: val1,
                [att2]: val2,
                [att3]: val3
            }
        }
    };

    var marker_feature = L.geoJSON(feature_GeoJSON).addTo(map);
    marker_feature.bindPopup(name + "<br><br>" + "Category: " + cat + "<br>" + att1 + ": " + val1 + "<br>" + att2 + ": " + val2 + "<br>" + att3 + ": " + val3).openPopup();
    map.fitBounds(marker_feature.getBounds());

    saveFeature(feature_GeoJSON);
}

function build_stage_JSON() {

    /**
     * Fetching form data
     */
    var s_name = document.getElementById("s_name").value;
    var s_start_lat = document.getElementById("s_start_lat").value;
    var s_start_long = document.getElementById("s_start_long").value;
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
            "type": "Line",
            "coordinates": [[s_start_lat, s_start_long],
                [s_finish_lat, s_finish_long]]

        },
        "properties": {
            "name": name,
            "start_date": s_start_date,
            "finish_date": s_finish_date,
            "link": s_link,
            "start_pic": s_start_up,
            "finish_pic": s_finish_up

        }
    };

    // Calculates Navigation between Start and Finish
    control.spliceWaypoints(0, 1,[s_start_lat, s_start_long]);
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, [s_finish_lat, s_finish_long]);

    // Add Markers to the ends of the Route
    var start_marker = L.marker([s_start_lat, s_start_long]);
    start_marker.addTo(map);
    start_marker.bindPopup("Start")
    var finish_marker = L.marker([s_finish_lat, s_finish_long]);
    finish_marker.addTo(map);
    finish_marker.bindPopup("Finish")

    var group = new L.featureGroup([start_marker, finish_marker]);
    map.fitBounds(group.getBounds());

    console.log(stage_GeoJSON);
}

saveFeature = function (feature) {
    console.log("Got this Feature: ");
    console.log(feature);
    console.log("Work in progress: saveFeature");
    $.ajax({
        method: 'POST',
        data: feature,
        url: '/api/saveFeature',
        success: function(){
            console.log("saved feature")
        },
        error: function () {
            console.log("failed to save feature")
        }
    });
};

var retrieveFeature = function () {
    var name = document.getElementById("nameFeature").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log(data);
        }
    })};