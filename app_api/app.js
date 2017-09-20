var mongoose = require("mongoose");
var Feature = mongoose.model("Feature");
var Stage = mongoose.model("Stage");

/**
 * Dieser Teil funktioniert nicht:
 * POST http://localhost:3000/api/saveFeature net::ERR_EMPTY_RESPONSE
 * XHR failed loading: POST "http://localhost:3000/api/saveFeature".
 * @param req
 * @param res
 */
module.exports.saveFeature = function(req, res){

    console.log("Made it to exports.saveFeature");
    var feature = new Feature;

    feature.type = req.body.type;
    feature.properties = req.body.properties;
    feature.geometry = req.body.geometry;


    feature.save(function(err){
        console.log("saved");
        console.log(feature);
        return res.status(200);
    })
};

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
};