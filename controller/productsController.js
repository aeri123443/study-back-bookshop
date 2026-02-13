const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

// 도서 전체 조회
const allProducts = (req, res) => {
    const {category_id} = req.query;
    // console.log(category_id)
    
    // 카테고리 별 조회
    if (category_id) {
        const sql = "SELECT * FROM products WHERE category_id = ?";
        const values = [category_id]

        conn.query(sql, values, (err, result)=>{
            if (err){
                console.log(err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
            }

            console.log(result);

            if (result[0]) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    msg: `해당 카테고리의 도서가 존재하지 않습니다.`
                });
            }
        });
    }
    // 조건 없이 전체 조회
    else {
        const sql = "SELECT * FROM products";
        conn.query(sql, (err, result)=>{
            if (err){
                console.log(err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
            }

            console.log(result);

            if (result) {
                res.status(StatusCodes.OK).json(result);
            } else {
                res.status(StatusCodes.OK).json({
                    msg: "조회되는 도서 목록이 없습니다."
                });
            }
        });
    };
};

// 도서 개별 조회
const productDetail = (req, res) => {
    let {productId} = req.params;
    // console.log(productId);

    const sql = "SELECT * FROM products WHERE id = ?";
    const values = [productId]
    conn.query(sql, values, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        console.log(result);

        if (result[0]) {
            res.status(StatusCodes.OK).json(result[0]);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                msg: "조회되는 도서 목록이 없습니다."
            });
        }
    });
};

module.exports = {allProducts, productDetail};
