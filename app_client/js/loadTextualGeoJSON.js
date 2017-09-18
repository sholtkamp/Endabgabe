// Textual GeoJSON Input, taken from Tolksdrof, Pagel Aufgabe 5
/**
 *@desc Reads the geojson
 */
function readGeoJSONFromTA() {
    return JSON.parse($('textarea#geojson-area')[0].value);
}

/**
 *@desc add and load the read GeoJSON on the map
 */
function loadGeoJSON() {
    var feat = readGeoJSONFromTA();
    var gLayer = L.geoJson(feat);
    gLayer.addTo(map);

}
