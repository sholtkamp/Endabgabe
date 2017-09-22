/**
 * Function used to upload and show external GeoJSON files
 * taken from exercises
 */
document.getElementById("GeoJSON_input").addEventListener("change", function (evt) {
    var file = evt.target.files[0], // Read first file for this example.
        reader = new FileReader();

    reader.onload = function (e) {
        logger.info("Upload started");
        var fileText = e.target.result;
        fileData = JSON.parse(fileText);

        try {
            group = L.geoJSON(fileData).addTo(map);
            map.fitBounds(group.getBounds());
            logger.info("Added your GeoJSON File to the map");
        }
        catch (err) {
            logger.warn("This is not a valid GeoJSON");
            window.alert("Please choose a valid GeoJSON for your Upload");
        }
    };

    reader.readAsText(file);
});
