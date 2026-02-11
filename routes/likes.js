const express = require('express');
const router = express.Router();
router.use(express.json());

// 좋아요 추가
router.post('/:productId', (req, res)=>{

});

// 좋아요 취소
router.delete('/:productId', (req, res)=>{

});

module.exports = router;