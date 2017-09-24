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

        //Tries to add uploaded file to the map
        //if it is not a valid GeoJSON an error is thrown
        try {
            fileData = JSON.parse(fileText);
            group = L.geoJSON(fileData).addTo(map);
            map.fitBounds(group.getBounds());
            logger.info("File was a GeoJSON file");
        }
        catch(err) {
            logger.info("File is NOT a GeoJSON file");
            window.alert("Please choose a GeoJSON for upload");
        }
    };
    reader.readAsText(file);
});