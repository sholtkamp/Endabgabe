var mongoose = require("mongoose");

var featureSchema = new mongoose.Schema({

    "type": {
        type: String,
        required: true,
        enum: ["Feature"],
        default: "Feature"
    },

    geometry: {
        "type": {
            type: String,
            required: true,
            enum: ["Point"],
            default: "Point"
        },
        "coordinates": {type: [Number]}
    },

    properties: {
        type: [mongoose.Schema.Types.Mixed]
    }
});

var stageSchema = new mongoose.Schema({

    "type": {
        type: String,
        required: true
    },
    "geometry": [{
        "type": String,
        "coordinates": [mongoose.Schema.Types.Mixed]
    }],
    "properties": [{
        "name": String,
        "start_date": Date,
        "finish_date": Date,
        "link": String,
        "start_pic": {
            data: Buffer,
            contentType: String},
        "finish_pic": {
            data: Buffer,
            contentType: String},

    }]
});

mongoose.model('Feature',featureSchema);
mongoose.model('Stage',stageSchema);


