var mongoose = require("mongoose");
var Feature = mongoose.model("Feature");
var Stage = mongoose.model("Stage");

module.exports = {
    saveFeature: function (req, res) {

        console.log("Made it to app.js/saveFeature");
        var feature = new Feature;

        feature.type = req.body.type;
        feature.geometry = req.body.geometry;
        feature.properties.category = req.body.properties.category;
        feature.properties.attributes.name = req.body.properties.attributes.name;
        feature.properties.attributes.price = req.body.properties.attributes.price;
        feature.properties.attributes.capacity = req.body.properties.attributes.capacity;

        console.log(req);

        console.log(feature);

        feature.save(function (err) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("saved");
                console.log(feature);
                res.status(200).send(feature);
            }
        })
    },

    retrieveFeature: function (req, res) {
        console.log(req.params.name)
        Feature.find({ 'properties.attributes.name' : req.params.name }, function (err, feature) {
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

    saveStage: function (req, res) {

        logger.info("Made it to app.js/saveStage");
        var stage = new Stage;

        stage.type = req.body.type;
        stage.geometry = req.body.geometry;
        stage.properties = req.body.properties;

        console.log(req);

        console.log(stage);

        stage.save(function (err) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("saved");
                console.log(stage);
                return res.status(200);
            }
        })
    },

    retrieveStage: function (req, res) {
        console.log(req.params.name)
        Stage.find({ 'properties.attributes.name' : req.params.name}, function (err, stage) {
            if (err) {
                console.log('ERROR')
                res.status(404).json("stage not found");
            }
            else {
                console.log(stage)
                res.status(200).json(stage);
            }
        })
    }
};

