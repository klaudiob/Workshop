var express = require('express');
var router = express.Router();
const fs = require('fs');
const CatalogDB = require('../DB/catalogDB');

const catalog = new CatalogDB();
catalog.seed();

const addDelay = function (req, res, next) {
  setTimeout(() => {
    next();
  }, 2000);
};

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* get list of products in catalog */
router.get('/products', function(req, res) {
  const products = catalog.getAll();
  const response = {
    success: true,
    data: products
  };
  res.send(response);
});

/* create product in catalog */
router.post('/products', function(req, res) {
  const product = req.body;
  const newProduct = catalog.insert(product);
  const response = {
    success: true,
    data: newProduct
  };
  res.send(response);
});

router.get('/products/nameLength',function(req, res) {
  const productNameLength= catalog.maxLength();
  const response = {
    success: true,
    data: productNameLength
  };
  res.send(response);
});

router.get('/products/count',function(req, res) {
  const productsLength= catalog.countProducts();
  const response = {
    success: true,
    data: productsLength
  };
  res.send(response);
});

/* get specific product in catalog */
router.get('/products/:id', addDelay, function(req, res) {
  const id = req.params.id;
  const product = catalog.get(id);
  const response = {
    success: true,
    data: product
  };
  res.send(response);
});

/** get products of the same category */
router.get('/categoriesProducts/:item',function(req, res) {
  const item = req.params.item;
  const categoriesProducts = catalog.getCategoryProducts(item);
  const response = {
    success: true,
    data: categoriesProducts
  };
  res.send(response);
});


/* delete product in catalog */
router.delete('/products/:id', function(req, res) {
  const id = req.params.id;
  const deleted = catalog.remove(id);
  const response = {
    success: deleted
  };
  res.send(response);
});

/* update product in catalog */
router.put('/products/:id', function(req, res) {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = catalog.update(id, product);
  const response = {
    success: Boolean(updatedProduct),
    data: updatedProduct
  };
  res.send(response);
});

/* get list of categories */
router.get('/categories', function(req, res) {
  fs.readFile('./categories.json', (err, data) => {
    if (err) {
      console.warn(err);
      res.send({success: false});
    }
    const categories = JSON.parse(data);
    const response = {
      success: true,
      data: categories
    };
    res.send(response);
  });
});

/* get list of images */
router.get('/images', function(req, res) {
  fs.readdir('./public/images/products', (err, files) => {
    if (err) {
      console.warn(err);
      res.send({success: false});
    }
    const response = {
      success: true,
      data: files
    };
    res.send(response);
  });
});

// catch 404 and forward to error handler
router.use(function(req, res) {
  const response = {
    success: false,
    message: 'api not found'
  };
  res.status(404).send(response);
});

module.exports = router;

