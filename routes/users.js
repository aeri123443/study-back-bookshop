const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {body, validationResult} = require('express-validator');
const {join, login, passwordResetRequest, passwordReset} = require('../controller/UserController');

router.use(express.json());

const validate = (req, res, next) => {
   const err = validationResult(req);

   if (err.isEmpty()){
        return next();
   } else {
        res.status(400).json(err);
   }
};

router.post('/join', join);
router.post('/login', login);
router.post('/reset', passwordResetRequest)
router.put('/reset', passwordReset)

module.exports = router;
