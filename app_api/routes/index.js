var express = require('express');
var router = express.Router();

var app = require('../app');

// collection of http commands
router.post('/saveFeature', app.saveFeature);
router.get('/retrieveFeature/:name', app.retrieveFeature);

//neu//
router.post('/saveStage', app.saveStage);
router.get('/retrieveStage', app.retrieveStage);
//neu ende//

module.exports = router;