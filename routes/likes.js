const express = require('express');
const { addLike, removeLike } = require('../controller/LikesController');
const router = express.Router();
router.use(express.json());

// 좋아요 추가
router.post('/:productId', addLike);

// 좋아요 취소
router.delete('/:productId', removeLike);

module.exports = router;