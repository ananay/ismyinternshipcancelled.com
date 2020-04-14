var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fetch', function(req, res, next) {
  res.send({'operation': 'fetch', 'success': false});
});

module.exports = router;
