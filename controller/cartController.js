// const express = require('express');
const conn = require('../mariadb');
const {StatusCodes} =require('http-status-codes');
// 장바구니 담기
const addCartItem = (req, res) => {
    let {productId, quantity, userId} = req.body;
    productId = parseInt(productId);
    quantity = parseInt(quantity);
    userId = parseInt(userId);

    const sql = 'INSERT INTO cartItems (product_id, quantity, user_id) VALUES (?, ?, ?)';
    const values = [productId, quantity, userId];
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
        }

        console.log(result);

        if (result.affectedRows){
            return res.status(StatusCodes.CREATED).end();
        } else {
            return res.status(StatusCodes.OK).json({
                msg: "데이터가 추가되지 않았습니다."
            });
        };
    });
};

// 장바구니 조회
const showCartItems = (req, res) => {
    const userId = parseInt(req.body.userId);
    const selectedItems = req.body.selectedItems;

    let sql, values;
    // 장바구니에서 선택한 상품 목록 조회
    if (userId && selectedItems[0]) {
        sql = `SELECT id, cartItems.product_id, title, summary, price, quantity, img 
                FROM BookShop.cartItems 
                LEFT JOIN products ON products.product_id=cartItems.product_id 
                WHERE user_id = ? AND cartItems.id IN (?)`;
        values = [userId, selectedItems];
    } 
    
    // 유저의 장바구니 전체 조회
    else if (userId) {
        sql = `SELECT id, cartItems.product_id, title, summary, price, quantity, img 
                FROM cartItems 
                LEFT JOIN products ON cartItems.product_id = products.product_id 
                WHERE user_id = ?`;
        values = [userId];
    }

    conn.query(sql, values, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        };

        console.log(result);

        if(result[0]){
            return res.status(StatusCodes.OK).json(result);
        } else {
            return res.status(StatusCodes.OK).json({
                msg: '조회되는 데이터가 없습니다.'
            });
        };
    });
};

// 장바구니 제거
const removeCartItem = (req, res) => {
    const cartId = parseInt(req.params.id);
    const userId = parseInt(req.body.user_id);

    const sql = `DELETE FROM cartItems WHERE product_id = ? and user_id = ?`;
    const values = [cartId, userId]
    conn.query(sql, values, (err, result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }

        console.log(result);

        if (result.affectedRows) {
            return res.status(StatusCodes.OK).end()
        } else {
            return res.status(StatusCodes.OK).json({
                msg: '삭제된 목록이 없습니다.'
            });
        }
    })
};

module.exports = {addCartItem, showCartItems, removeCartItem};