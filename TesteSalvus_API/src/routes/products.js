const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getProducts);
router.get('/products/promocoes', productsController.getDiscountedProducts);
router.get('/products/destaque', productsController.getRandomDiscountedProduct);
router.get('/products/em-breve', productsController.getUpcomingProducts);
router.get('/products/:category', productsController.getProductsByCategory);
router.get('/product/:id', productsController.getProductById);

module.exports = router;
