var mongoose = require("mongoose");
var Feature = mongoose.model("Feature");
var Stage = mongoose.model("Stage");

module.exports = {
    saveFeature: function (req, res) {

        console.log("Made it to app.js/saveFeature");
        var feature = new Feature;

        feature.type = req.body.type;
        feature.properties = req.body.properties;
        feature.geometry = req.body.geometry;

        console.log(feature);

        feature.save(function (err) {
            if (err) {
                console.log("ERROR:");
                console.log(err);
                res.message("Error encountered: " + err);
                res.status(400).send();
            }
            console.log("saved");
            console.log(feature);
            res.status(200).send(feature);
        })
    },

    retrieveFeature: function (req, res) {
        console.log(req.params.name)
        Feature.findById(req.params.name, function (err, feature) {
            if (err) {
                console.log('ERROR')
                res.status(404).json("feature not found");
            }
            else {
                console.log(feature)
                res.status(200).json(feature);
            }
        })
    },

//neu

    saveStage: function (req, res) {

        logger.info("Made it to app.js/saveStage");
        var feature = new Feature;

        feature.type = req.body.type;
        feature.properties = req.body.properties;
        feature.geometry = req.body.geometry;


        feature.save(function (err) {
            console.log("saved");
            console.log(feature);
            return res.status(200);
        })
    },

    retrieveStage: function (req, res) {
        console.log(req.params.name)
        Feature.findById(req.params.name, function (err, feature) {
            if (err) {
                console.log('ERROR')
                res.status(404).json("feature not found");
            }
            else {
                console.log(feature)
                res.status(200).json(feature);
            }
        })
    }
};

//neu ende