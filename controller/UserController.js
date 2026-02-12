const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const {StatusCodes} = require('http-status-codes');

dotenv.config();

// 회원가입
const join = (req, res)=>{
    // console.log(req);
    const {email, password, name, contact} = req.body;
    // console.log(email, password, name, contact);

    // 비밀번호 암호화
    const salt = crypto.randomBytes(8).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 8, 'sha512').toString('base64');

    const sql = "INSERT INTO users(email, name, password, contact, salt)  VALUES (?, ?, ?, ?, ?)";
    const data = [email, name, hashPassword, contact, salt];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);

            return res.status(StatusCodes.BAD_REQUEST).json(err);
        } ;
        
        if (result.affectedRows) {
            return res.status(StatusCodes.CREATED).json(result);
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        };
    })
};

// 로그인
const login = (req, res) => {
    const {email, password} = req.body;

    const sql = "SELECT name, email, salt, password FROM users WHERE email = ?"
    const values = [email]
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        };

        // console.log(result);
        const userInfo = result[0]
        if (userInfo && userInfo.password == crypto.pbkdf2Sync(password, userInfo.salt, 10000, 8, 'sha512').toString('base64')){
            
            const token = jwt.sign(
                {
                    name: userInfo.name,
                    email: userInfo.email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '10m',
                    issuer: 'aeri'
                }
            );

            res.cookie("token", token, {httpOnly: true});

            return res.status(StatusCodes.OK).json({
                msg: `${userInfo.name}님, 어서오세요!`
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: "아이디 또는 비밀번호를 다시 확인해주세요."
            })
        }
    })
};

// 비밀번호 초기화 (요청)
const passwordResetRequest  = (req, res) => {
    const {email} = req.body;

    const sql = "SELECT name, email FROM users WHERE email = ?";
    const values = [email];
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        };

        const userInfo = result[0]
        if (userInfo){
            return res.status(StatusCodes.OK).json({
                msg: `${userInfo.name}님, 새로운 비밀번호를 입력해주세요.`,
                email: userInfo.email
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                msg: "존재하지 않는 사용자입니다."
            })
        }
    })
};

// 비밀번호 초기화
const passwordReset  = (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password)

    // 비밀번호 암호화
    const salt = crypto.randomBytes(8).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 8, 'sha512').toString('base64');

    const sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
    const values = [hashPassword, salt, email];
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        };
        console.log(result);
        
        if (result.affectedRows){
            return res.status(StatusCodes.OK).json({
                msg: "비밀번호 변경을 완료했습니다. 다시 로그인해주세요."
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
    })
};

module.exports = {join, login, passwordResetRequest, passwordReset};
