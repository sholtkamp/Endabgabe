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
        // var extension = getExtension(fileText);
        // logger.info("Files extension: " + extension);
        // var right_type = isJSON(extension);
        //
        // if (right_type == true) {

            logger.info("File is a .JSON file");
            fileData = JSON.parse(fileText);
            group = L.geoJSON(fileData).addTo(map);
            map.fitBounds(group.getBounds());
        // }
        //
        // else {
        //     logger.info("File is NOT a .JSON file")
        // }
    };

    reader.readAsText(file);
});

// function getExtension(filename) {
//     var parts = filename.split('.');
//     return parts[parts.length - 1];
// }
//
// function isJSON(filename) {
//     var ext = getExtension(filename);
//     switch (ext.toLowerCase()) {
//         case 'application/json':
//             return true;
//     }
//     return false;
// }

// https://stackoverflow.com/questions/7977084/check-file-type-when-form-submit