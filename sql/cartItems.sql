-- 장바구니 담기
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (3, 2, 1);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (1, 5, 4);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (5, 1, 1);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (7, 3, 1);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (10, 2, 1);

INSERT INTO cartItems (product_id, quantity, user_id) VALUES (12, 4, 1);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (2, 1, 2);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (8, 2, 2);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (15, 1, 2);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (18, 5, 2);

INSERT INTO cartItems (product_id, quantity, user_id) VALUES (4, 2, 3);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (9, 1, 3);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (14, 3, 3);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (20, 2, 3);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (6, 1, 4);

INSERT INTO cartItems (product_id, quantity, user_id) VALUES (11, 2, 4);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (16, 4, 4);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (13, 1, 5);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (17, 2, 5);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (21, 3, 5);

INSERT INTO cartItems (product_id, quantity, user_id) VALUES (25, 1, 5);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (19, 2, 7);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (22, 1, 7);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (27, 3, 7);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (23, 2, 8);

INSERT INTO cartItems (product_id, quantity, user_id) VALUES (26, 1, 8);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (29, 4, 8);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (24, 2, 9);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (30, 1, 9);
INSERT INTO cartItems (product_id, quantity, user_id) VALUES (28, 2, 2);

-- 장바구니 목록 조회
SELECT id, cartItems.product_id, title, summary, price, quantity, img 
FROM cartItems 
LEFT JOIN products ON cartItems.product_id = products.product_id 
WHERE user_id = 1

-- 장바구니 삭제
DELETE FROM cartItems WHERE product_id = 3 and user_id = 1

-- 선택된 장바구니 목록만 조회
SELECT * FROM cartItems WHERE user_id = 1 AND product_id IN (5, 10, 12)

SELECT id, cartItems.product_id, title, summary, price, quantity, img 
FROM BookShop.cartItems 
LEFT JOIN products ON products.product_id=cartItems.product_id 
WHERE user_id = 1 AND cartItems.id IN (3, 4, 6)
