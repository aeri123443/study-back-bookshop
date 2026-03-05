// const conn = require('../mariadb');
const mariadb = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes');

//결제하기
const orderItems = async (req, res) => {

    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dateStrings: true
    });

    let {cartItemIds, delivery, totalPrice, totalQuantity, userId, mainBookTitle } = req.body;
    totalPrice = parseInt(totalPrice);
    totalQuantity = parseInt(totalQuantity);
    userId = parseInt(userId);

    let sql, values;
    let deliveryId, orderId;

    // 카트 아이템 정보 가져오기

    sql = `SELECT * from cartItems WHERE id in (?)`;
    let products = await conn.query(sql, [cartItemIds]);
    console.log(products);

    // 배송 정보 담기
    sql = 'INSERT INTO delivery (receiver, address, contact) VALUES (?, ?, ?)';
    values = [delivery.receiver, delivery.address, delivery.contact]

    let [results] = await conn.execute(sql, values);
    console.log(results)

    deliveryId = results.insertId;

    console.log(deliveryId)

    // 주문 정보 입력
    sql = `INSERT INTO orders (user_id, delivery_id, main_book, total_quantity, total_price) 
            VALUES (?, ?, ?, ?, ?);`;
    values = [userId, deliveryId, mainBookTitle, totalQuantity, totalPrice];
    console.log(values);

    [results] = await conn.execute(sql, values);
    console.log(results);
    orderId = results.insertId;

    // 주문 상세 정보 입력
    let orderedProducts = []
    products[0].forEach(product => {
        orderedProducts.push([product.product_id, orderId, product.quantity])
    });
    console.log(orderedProducts);

    sql = `INSERT INTO orderedProduct (product_id, order_id, quantity) 
            VALUES ?`;
    
    values = [orderedProducts];
    [results] = await conn.query(sql, values);
    console.log(results)

    let result = await deleteCartItems(conn, cartItemIds); 

    return res.status(StatusCodes.OK).json(result);

};

// 사용자가 구매 완료한 장바구니 삭제
const deleteCartItems = async (conn, cartItemIds) => {
    sql = `DELETE FROM cartItems WHERE id IN (?)`
    values = cartItemIds // [1, 2, 3...]

    let result = await conn.query(sql, [values]);

    return result
};

// 주문 내역 조회
const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dateStrings: true
    });
    const {userId} = req.body;

    const sql = `SELECT created_at,address,receiver,contact,main_book,total_price,total_quantity 
                FROM orders 
                LEFT JOIN delivery ON delivery.id = orders.delivery_id
                WHERE user_id=?`;
    const values = [userId];

    const [rows, fields] = await conn.query(sql, values);
    console.log(rows)
    return res.status(StatusCodes.OK).json(rows)
};

// 주문 상세 조회
const getOrderDetails = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dateStrings: true
    });
    // const {userId} = req.body;
    const {orderId} = req.params;

    const sql = `SELECT products.product_id, title, author, price, quantity, img
                FROM orderedProduct 
                LEFT JOIN products
                ON products.product_id = orderedProduct.product_id
                WHERE order_id=?`;
    const values = [orderId];

    const [rows, fields] = await conn.query(sql, values);
    console.log(rows)
    return res.status(StatusCodes.OK).json(rows)    
}
module.exports = {orderItems, getOrders, getOrderDetails};
