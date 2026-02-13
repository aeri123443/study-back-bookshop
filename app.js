const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.listen(process.env.PORT);

const userRouter = require('./routes/users.js');
const productRouter = require('./routes/products.js');
const categoryRouter = require('./routes/categories.js')
const cartRouter = require('./routes/carts.js');
const likeRouter = require('./routes/likes.js');
const orderRouter = require('./routes/orders.js');

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/cart", cartRouter);
app.use("/likes", likeRouter);
app.use("/orders", orderRouter);
