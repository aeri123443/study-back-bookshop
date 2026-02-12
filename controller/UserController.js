const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {StatusCodes} = require('http-status-codes');

dotenv.config();

// 회원가입
const join = (req, res)=>{
    // console.log(req);
    const {email, password, name, contact} = req.body;
    console.log(email, password, name, contact);

    const sql = "INSERT INTO users(email, name, password, contact)  VALUES (?, ?, ?, ?)";
    const data = [email, name, password, contact];
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

    const sql = "SELECT name, email, password FROM users WHERE email = ?"
    const data = [email]
    conn.query(sql, data, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        };

        // console.log(result);
        const userInfo = result[0]
        if (userInfo && userInfo.password == password){
            
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

module.exports = {join, login};
