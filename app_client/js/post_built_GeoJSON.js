saveFeature = function (feature) {
    console.log("Got this Feature: ");
    console.log(feature);
    console.log("Work in progress: saveFeature");
    $.ajax({
        method: 'POST',
        data: feature,
        dataType: 'json',
        contentType: 'application/json',
        url: './api/saveFeature',  //<------ Fehler: Internal Server Error 500
        success: function () {
            console.log("saved feature");
            console.log(feature);
        },
        error: function () {
            console.log("failed to save feature")
        },
        timeout: 3000
    });
};

//neu//
saveStage = function(stage){
    console.log("Got this Stage: ");
    console.log(stage);
    console.log("Work in progress: saveStage");
    $.ajax({
        method: 'POST',
        data: stage,
        dataType: 'json',
        contentType: 'json',
        url: '/api/saveStage',
        success: function(){
            console.log("saved stage")
        },
        error: function () {
            console.log("failed to save stage")
        }
    });
};
//neu ende