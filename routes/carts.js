const express = require('express');
const { addCartItem, showCartItems, removeCartItem } = require('../controller/cartController');
const router = express.Router();
router.use(express.json());

// 장바구니 담기
router.post('/', addCartItem);

// 장바구니 조회
// 장바구니에서 선택한 상품 목록 조회
router.get('/', showCartItems);

// 장바구니 제거
router.delete('/:id', removeCartItem);

module.exports = router;
