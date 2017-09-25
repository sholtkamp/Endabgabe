var retrieveFeature = function () {
    var name = document.getElementById("ID_Name").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveFeature/' + name,
        success: function(data){
            console.log("Found Entry: ");
            console.log(data);
            L.marker([data[0].geometry.coordinates[0],
                      data[0].geometry.coordinates[1]]).bindPopup(name).addTo(map);
       }
    })};

var retrieveStage = function () {
    var name = document.getElementById("ID_Name").value;
    $.ajax({
        method: 'GET',
        url:'/api/retrieveStage/' + name,
        success: function(data){
            console.log("Found Entry: ");
            console.log(data);
        }
    })};


/** Permalink stub */
// var getAllFeatures = function (nameOfFeature) {
//     $.ajax({
//         method: 'GET',
//         url:'/api/retrieveFeature/' + nameOfFeature,
//         success: function(data){
//             console.log(data);
//             var link = "http://localhost:3000/api/retrieveFeature" + nameOfFeature
//             document.getElementById("link_div").append(link);
//         }
//     })};
//
// window.onload = getAllFeatures();