var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});

/* GET listing page. */
router.get('/catalog', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/listing.html'));
});

/* GET product creation page */
router.get('/new-product', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/new-product.html'));
});

/* GET product details page. */
router.get('/product', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/product.html'));
});

module.exports = router;
