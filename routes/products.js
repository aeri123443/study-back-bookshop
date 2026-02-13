const express = require('express');
const {allProducts, productDetail} = require('../controller/productsController');
const router = express.Router();
router.use(express.json());

router.get('/', allProducts);
router.get('/:productId', productDetail);

module.exports = router;