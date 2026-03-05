const express = require('express');
const {orderItems, getOrders, getOrderDetails} = require('../controller/orderController');
const router = express.Router();
router.use(express.json());

// 결제하기
router.post('/', orderItems);

// 주문 내역 조회
router.get('/', getOrders);

// 주문 상세 조회
router.get('/:orderId', getOrderDetails);

module.exports = router;
