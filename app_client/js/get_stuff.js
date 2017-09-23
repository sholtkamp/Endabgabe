var retrieveFeature = function () {
    var name = document.getElementById("nameFeature").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log(data);
        }
    })};

//neu
var retrieveStage = function () {
    var name = document.getElementById("nameFeature").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log(data);
        }
    })};

//neu ende