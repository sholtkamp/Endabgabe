var mongoose = require("mongoose");

// Building Mongoose Schema for feature_GeoJSON
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
        "coordinates": {
            type: [Number]}
    },

    properties: {
        "category": {
            type: String,
            required: true,
        },
        "attributes": {

            "name": {
                type: String,
                required: true,
                unique: true,
            },

            "price": {
                type: Number,
                required: true

            },
            "capacity": {
                type: Number,
                required: true,
            }
        }
    }
});

//Building Mongoose Schema for stage_GeoJSON
var stageSchema = new mongoose.Schema({

    "type": {
        type: String,
        required: true
    },

    geometry: {
        "type": {
            type: String,
            required: true,
            enum: ["LineString"],
            default: "LineString"
        },
        "coordinates": {
                type: [[Number]]}
    },

    properties: {
        "name":{
            type: String,
            required: true,
        },
        "start": {
            type: String,
            required: true,
        },
        "finish": {
            type: String,
            required: true,
        },
        "start_date": {
            type: Number,
        },
        "finish_date": {
            type: Number,
        },
        "link": {
            type: String,
        },
        "start_pic": {
            type: String,
        },
        "finish_pic": {
            type: String,
        }
    }
});

mongoose.model('Feature',featureSchema);
mongoose.model('Stage',stageSchema);


