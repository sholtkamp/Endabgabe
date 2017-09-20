var mongoose = require("mongoose");
var Feature = mongoose.model("Feature");
var Stage = mongoose.model("Stage");

module.exports.saveFeature = function(req, res){
    var feature = new Feature;
    console.log(feature.geometry);
    console.log("________________")
    console.log(req.body);
    feature.type = req.body.type;
    feature.properties = req.body.properties;
    feature.geometry = req.body.geometry;
    console.log("LOG FEATURE")
    console.log(feature.type);
    console.log(feature.geometry);
    console.log(feature.properties);

    feature.save(function(err){
        console.log("saved");
        console.log(feature);
        return res.status(200);
    })
}

module.exports.retrieveFeature = function(req, res){
    console.log(req.params.name)
    Feature.findById(req.params.name, function(err, feature){
        if(err){
            console.log('ERROR')
            res.status(404).json("feature not found");
        }
        else{
            console.log(feature)
            res.status(200).json(feature);
        }
    })
}