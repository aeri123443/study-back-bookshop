const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, validationResult} = require('express-validator');
const {join, login} = require('../controller/UserController');

router.use(express.json());

const validate = (req, res, next) => {
   const err = validationResult(req);

   if (err.isEmpty()){
        return next();
   } else {
        res.status(400).json(err);
   }
};

// 회원가입
router.post('/join', 
    // [
    //     body('email').isEmpty().isEmail().withMessage('이메일 확인 필요'),
    //     body('password').isEmpty().isString().withMessage('비밀번호 확인 필요'),
    //     body('name').isEmpty().isString().withMessage('이름 확인 필요'),
    //     body('contact').isString().withMessage('전화번호 확인 필요'),
    //     validate
    // ],
    join
    )

// 로그인
router.post('/login', login);

// 비밀번호 초기화 (요청)
router
    .route('/reset')

    // 초기화 요청
    .post((req, res)=>{
    
    })

    // 수정
    .get((req, res)=>{
        
    })
// 
module.exports = router;