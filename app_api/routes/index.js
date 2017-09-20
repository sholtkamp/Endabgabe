var express = require('express');
var router = express.Router();

var app = require('../app');

// collection of http commands
router.post('/saveFeature', app.saveFeature);
router.get('/retrieveFeature/:name', app.retrieveFeature);


module.exports = router;