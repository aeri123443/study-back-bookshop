const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

// 좋아요 추가
const addLike = (req, res) => {
    let {productId} = req.params;
    let {user_id} = req.body;
    user_id = parseInt(user_id);
    productId = parseInt(productId);

    const sql = `INSERT INTO likes(user_id, product_id) VALUES (?, ?)`;
    const values = [user_id, productId]
    
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        console.log(result);

        if (result.affectedRows){
            return res.status(StatusCodes.CREATED).json(result);
        } else {
            return res.status(StatusCodes.CREATED).json({
                msg: '삽입 실패! 다시 확인해주세요.'
            })
        };
    })
};

// 좋아요 삭제
const removeLike = (req, res) => {
    let {productId} = req.params;
    let {user_id} = req.body;
    productId = parseInt(productId);
    user_id = parseInt(user_id);

    const sql = `DELETE FROM likes WHERE user_id = ? AND product_id = ?`;
    const values = [user_id, productId]

    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        } 

        console.log(result);

        if (result.affectedRows){
            return res.status(StatusCodes.OK).end();
        } else {
            return res.status(StatusCodes.OK).json({
                msg: '삭제된 데이터가 없습니다.'
            });
        };
    });
}; 

module.exports = {addLike, removeLike};
