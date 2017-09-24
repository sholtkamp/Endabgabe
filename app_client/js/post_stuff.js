saveFeature = function (feature) {
    console.log("Got this Feature: ");
    console.log(feature);
    console.log("Work in progress: saveFeature");
    $.ajax({
        method: 'POST',
        data: feature,
        //contentType: "application/json", causes 400 Bad Response Error
        //dataType: "application/json", causes 400 Bad Response Error
        url: '/api/saveFeature',
        success: function (res) {
            console.log("saved feature");
            console.log(feature);
            console.log(res);
        },
        error: function () {
            console.log("failed to save feature")
        }
    });
};

saveStage = function(stage){
    console.log("Got this Stage: ");
    console.log(stage);
    console.log("Work in progress: saveStage");
    console.log(typeof stage);

    $.ajax({
        method: 'POST',
        data: stage,
        // contentType: 'json',
        // dataType: 'json',
        url: '/api/saveStage',
        success: function(){
            console.log("saved stage");
            console.log(stage);
            console.log(res);
        },
        error: function () {
            console.log("failed to save stage")
        }
    });
};
