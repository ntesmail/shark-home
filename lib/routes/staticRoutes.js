var express = require('express');
var router = express.Router();

// head html
router.use('/static/head.html', function (req, res, next) {
    var q = req.query;
    var v = q.v || 'shark';
    res.render('static/head', {v: v});
});

// foot html
router.use('/static/foot.html', function (req, res, next) {
    var q = req.query;
    var v = q.v || 'shark';
    res.render('static/foot', {v: v});
});

module.exports = router;