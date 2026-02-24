const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

// 도서 전체 조회
const allProducts = (req, res) => {
    let {category_id, recent, page, limit} = req.query;
    category_id = parseInt(category_id);
    page = parseInt(page);
    limit = parseInt(limit);

    // 도서 전체 조회
    let sql = "SELECT *, (SELECT count(*) FROM likes WHERE product_id = products.id) AS likes FROM products";
    let values = [];
    let noDataMessage = "조회되는 도서 목록이 없습니다.";
    
    // 카테고리 별 신간 도서 조회
    if (category_id && recent) {
        sql += " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW()";
        values.push(category_id);
    }

    // 카테고리 별 조회
    else if (category_id) {
        sql += " WHERE category_id = ?";
        values.push(category_id);
    }

    // 신간 조회
    else if (recent) {
        sql += " pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW()";
    }
    
    // 페이징
    if (page & limit){
        const offset = limit * (page-1);
        sql += " LIMIT ?, ?";
        values.push(offset, limit);
    }

    conn.query(sql, values, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        console.log(result);

        if (result[0]) {
            return res.status(StatusCodes.OK).json(result);
        } else {
            return res.status(StatusCodes.OK).json({
                msg: noDataMessage
            });
        }
    });
};

// 도서 개별 조회
const productDetail = (req, res) => {
    let {user_id} = req.body;
    let {productId} = req.params;

    const sql = `SELECT *,
                    (SELECT count(*) FROM likes WHERE likes.product_id = products.id) AS likes,
                    (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND likes.product_id = ?)) AS is_liked
                FROM products
                LEFT JOIN categories ON categories.category_id = products.category_id 
                WHERE products.id = ?`;
    const values = [user_id, productId, productId];

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
