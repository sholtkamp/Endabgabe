var retrieveFeature = function () {
    var name = document.getElementById("featureName").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log(data);
        }
    })};

var retrieveStage = function () {
    var name = document.getElementById("featureName").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log(data);
        }
    })};


// Permalink stub
var getThisFeature = function (nameOfFeature) {
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + nameOfFeature,
        success: function(data){
            console.log(data);
            ///Hier dann zoomen
        }
    })};
