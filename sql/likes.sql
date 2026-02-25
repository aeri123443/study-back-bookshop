-- 좋아요 데이터 삽입
INSERT INTO likes (user_id, product_id) VALUES (2, 2);
INSERT INTO likes (user_id, product_id) VALUES (4, 4);
INSERT INTO likes (user_id, product_id) VALUES (3, 4);
INSERT INTO likes (user_id, product_id) VALUES (5, 5);
INSERT INTO likes (user_id, product_id) VALUES (5, 8);

INSERT INTO likes (user_id, product_id) VALUES (1, 1);
INSERT INTO likes (user_id, product_id) VALUES (1, 3);
INSERT INTO likes (user_id, product_id) VALUES (1, 7);
INSERT INTO likes (user_id, product_id) VALUES (2, 5);
INSERT INTO likes (user_id, product_id) VALUES (2, 9);

INSERT INTO likes (user_id, product_id) VALUES (3, 1);
INSERT INTO likes (user_id, product_id) VALUES (3, 6);
INSERT INTO likes (user_id, product_id) VALUES (3, 10);
INSERT INTO likes (user_id, product_id) VALUES (4, 2);
INSERT INTO likes (user_id, product_id) VALUES (4, 6);

INSERT INTO likes (user_id, product_id) VALUES (4, 9);
INSERT INTO likes (user_id, product_id) VALUES (5, 1);
INSERT INTO likes (user_id, product_id) VALUES (5, 12);
INSERT INTO likes (user_id, product_id) VALUES (7, 3);
INSERT INTO likes (user_id, product_id) VALUES (7, 4);

INSERT INTO likes (user_id, product_id) VALUES (7, 10);
INSERT INTO likes (user_id, product_id) VALUES (8, 2);
INSERT INTO likes (user_id, product_id) VALUES (8, 5);
INSERT INTO likes (user_id, product_id) VALUES (8, 11);
INSERT INTO likes (user_id, product_id) VALUES (9, 1);

INSERT INTO likes (user_id, product_id) VALUES (9, 6);
INSERT INTO likes (user_id, product_id) VALUES (9, 8);
INSERT INTO likes (user_id, product_id) VALUES (2, 12);
INSERT INTO likes (user_id, product_id) VALUES (3, 15);
INSERT INTO likes (user_id, product_id) VALUES (1, 20);

INSERT INTO likes (user_id, product_id) VALUES (1, 4);
INSERT INTO likes (user_id, product_id) VALUES (2, 4);
INSERT INTO likes (user_id, product_id) VALUES (8, 4);
INSERT INTO likes (user_id, product_id) VALUES (9, 4);

INSERT INTO likes (user_id, product_id) VALUES (1, 6);
INSERT INTO likes (user_id, product_id) VALUES (2, 6);
INSERT INTO likes (user_id, product_id) VALUES (5, 6);
INSERT INTO likes (user_id, product_id) VALUES (7, 6);

INSERT INTO likes (user_id, product_id) VALUES (4, 8);
INSERT INTO likes (user_id, product_id) VALUES (1, 8);

INSERT INTO likes (user_id, product_id) VALUES (5, 9);
INSERT INTO likes (user_id, product_id) VALUES (8, 9);

INSERT INTO likes (user_id, product_id) VALUES (1, 12);
INSERT INTO likes (user_id, product_id) VALUES (4, 12);
INSERT INTO likes (user_id, product_id) VALUES (7, 12);

INSERT INTO likes (user_id, product_id) VALUES (2, 15);
INSERT INTO likes (user_id, product_id) VALUES (8, 15);
INSERT INTO likes (user_id, product_id) VALUES (9, 15);

INSERT INTO likes (user_id, product_id) VALUES (3, 20);
INSERT INTO likes (user_id, product_id) VALUES (4, 20);
INSERT INTO likes (user_id, product_id) VALUES (7, 20);

INSERT INTO likes (user_id, product_id) VALUES (1, 25);
INSERT INTO likes (user_id, product_id) VALUES (2, 25);
INSERT INTO likes (user_id, product_id) VALUES (3, 25);
INSERT INTO likes (user_id, product_id) VALUES (8, 25);

INSERT INTO likes (user_id, product_id) VALUES (4, 30);
INSERT INTO likes (user_id, product_id) VALUES (5, 30);
INSERT INTO likes (user_id, product_id) VALUES (7, 30);
INSERT INTO likes (user_id, product_id) VALUES (9, 30);

-- 좋아요 데이터 삭제
DELETE FROM likes WHERE user_id=1 AND product_id = 2

-- 제품의 좋아요 수를 카운트
SELECT count(*) FROM likes WHERE product_id = 25
SELECT *,
(SELECT count(*) FROM likes WHERE product_id = products.id) AS likes
FROM products

-- 내가 이 제품을 좋아요 표시 했는지 확인
SELECT EXISTS (SELECT * FROM likes WHERE user_id=1 AND product_id=2)

SELECT *,
    (SELECT count(*) FROM likes WHERE likes.product_id = products.id) AS likes,
    (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND likes.product_id = ?)) AS is_liked
FROM products
LEFT JOIN categories ON categories.category_id = products.category_id 
WHERE products.id = ?
