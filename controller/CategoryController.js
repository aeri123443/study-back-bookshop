const express = require('express');
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

// 전체 카테고리 조회
const allCategories = (req,res) => {
    const sql = "SELECT * FROM categories"

    conn.query(sql, (err,result)=>{
        if (err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        };

        console.log(result);
        if (result[0]) {
            return res.status(StatusCodes.OK).json(result);
        } else {
            return res.status(StatusCodes.OK).json({
                msg: '카테고리가 존재하지 않습니다.'
            });
        };
        
    });

};

module.exports = {allCategories};
