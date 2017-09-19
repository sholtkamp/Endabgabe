/**
 * Function used to upload and show external GeoJSON files
 * taken from exercises
 */
document.getElementById("GeoJSON_input").addEventListener("change", function (evt) {
    var file = evt.target.files[0], // Read first file for this example.
        reader = new FileReader();

    reader.onload = function (e) {
        var fileText = e.target.result,
            fileData = JSON.parse(fileText),
            group = L.geoJSON(fileData).addTo(map);

        map.fitBounds(group.getBounds());
    };

    reader.readAsText(file);
});