const express = require('express');
const router = express.Router();
router.use(express.json());

// 장바구니 담기
router.post('/', (req, res)=>{

});

// 장바구니 조회
router.get('/', (req, res)=>{

});

// 장바구니 제거
router.delete('/:id', (req, res)=>{

});

// 장바구니 선택 한 상품 목록 조회
// router.get('/', (req, res)=>{

// });

module.exports = router;