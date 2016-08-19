var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/principal', function(req, res, next) {
  res.render('principal');
});

module.exports = router;
