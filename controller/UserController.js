const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes');

const join = (req, res)=>{
    // console.log(req);
    const {email, password, name, contact} = req.body;
    console.log(email, password, name, contact);

    const sql = "INSERT INTO users(email, name, passord, contact)  VALUES (?, ?, ?, ?)";
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

module.exports = join;
