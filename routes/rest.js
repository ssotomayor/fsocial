var express = require('express'),
  router = express.Router(),
  config = require('../config'),
  restful = require('../restful'),
  https = require('https'),
  options = {
    host: config.DATA_HOST,
    headers: {
      'Content-Type': 'application/json'
    }
  };

/**
 * Publications
 */
router.get('/get/publishing', function (req, res, next) {
  options.method = 'GET';
  options.path = config.PUBLISH_URL_PARAMS;
  restful.getJSON(options, function (statusCode, obj) {
    res.send(obj);
  });
});


router.post('/update/publishing', function (req, res, next) {
  var data = req.body;
  console.log(req.body);
  options.method = 'PUT';
  options.path = config.PUBLISH_URL_PARAMS;
  restful.updateJSON(options, data, function (statusCode, obj) {
    res.send(obj);
  });
});

router.get('/delete/publishing', function (req, res, next) {
  var data = req;
  options.method = 'DELETE';
  options.path = config.PUBLISH_URL_PARAMS;
  restful.updateJSON(options, data, function (statusCode, obj) {
    res.send(obj);
  });
});

/**
 * Data
 */
router.get('/get/data', function (req, res, next) {
  options.method = 'GET';
  options.path = config.DATA_URL_PARAMS;
  restful.getJSON(options, function (statusCode, obj) {
    res.send(obj);
  });
});

router.get('/update/data', function (req, res, next) {
  var data = req;
  options.method = 'PUT';
  options.path = config.DATA_URL_PARAMS;
  restful.updateJSON(options, data, function (statusCode, obj) {
    res.send(obj);
  });
});

router.get('/delete/data', function (req, res, next) {
  var data = req;
  options.method = 'DELETE';
  options.path = config.DATA_URL_PARAMS;
  restful.updateJSON(options, data, function (statusCode, obj) {
    res.send(obj);
  });
});


module.exports = router;