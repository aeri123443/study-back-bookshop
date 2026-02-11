const express = require('express');
const router = express.Router();
router.use(express.json());

// 결제하기
router.post('/', (req, res)=>{

});

// 주문 내역 조회
router.get('/', (req, res)=>{

});

// 주문 상세 조회
router.get('/:orderId', (req, res)=>{

});

module.exports = router;