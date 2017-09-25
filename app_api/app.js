var mongoose = require("mongoose");
var Feature = mongoose.model("Feature");
var Stage = mongoose.model("Stage");

module.exports = {
    saveFeature: function (req, res) {

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

        var stage = new Stage;

        stage.type = req.body.type;
        stage.geometry = req.body.geometry;
        stage.properties.name = req.body.properties.name;
        stage.properties.start = req.body.properties.start;
        stage.properties.finish = req.body.properties.finish;
        stage.properties.start_date = req.body.properties.start_date;
        stage.properties.finish_date = req.body.properties.finish_date;
        stage.properties.link = req.body.properties.link;
        stage.properties.start_pic = req.body.properties.start_pic;
        stage.properties.finish_pic = req.body.properties.finish_pic;

        console.log(req);

        console.log(stage);

        stage.save(function (err) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log("saved");
                res.status(200).send(stage);
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

